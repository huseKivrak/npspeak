'use server';

import { getUserProfile } from './auth';
import { ActionStatus } from '@/types/types';
import { parseBuffer } from 'music-metadata';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 *  Generates presigned URLs for uploading/downloading to S3
 */

export async function getPresignedUploadURL(): Promise<ActionStatus> {
  const { user } = await getUserProfile();
  if (!user) return { status: 'error', message: 'not authenticated' };

  const fileName = `${uuid()}.mp3`;
  const s3FileKey = `${user.id}/${fileName}`;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: s3FileKey,
    ContentType: 'audio/mpeg',
    Metadata: {
      user: user.id,
    },
  });

  try {
    const presignedURL = await getSignedUrl(s3, putCommand, {
      expiresIn: 900,
    });

    return {
      status: 'success',
      data: { fileName, presignedURL },
    };
  } catch (error) {
    console.error('Error generating presigned upload URL: ', error);
    return {
      status: 'error',
      message: `Error generating presigned upload URL: ${error} `,
    };
  }
}

export async function uploadAudioToS3(
  audioBuffer: Buffer
): Promise<ActionStatus> {
  try {
    const response = await getPresignedUploadURL();
    if (response.status !== 'success') return response;
    const { fileName, presignedURL } = response.data;

    const uploadResponse = await fetch(presignedURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'audio/mpeg',
      },
      body: audioBuffer,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `S3 Error code: ${uploadResponse.status}; ${uploadResponse.statusText}`
      );
    }

    //calculate duration in seconds
    const metadata = await parseBuffer(new Uint8Array(audioBuffer));
    const duration = metadata.format.duration;
    return {
      status: 'success',
      message: 'uploaded to s3',
      data: { fileName, duration },
    };
  } catch (error) {
    console.error('Error uploading audio to S3: ', error);
    return {
      status: 'error',
      message: `Error uploading audio to S3: ${error}`,
    };
  }
}

export async function getPresignedDownloadURL(
  fileName: string
): Promise<ActionStatus> {
  const { user } = await getUserProfile();
  if (!user) return { status: 'error', message: 'not authenticated' };

  const s3FileKey = `${user.id}/${fileName}`;
  try {
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: s3FileKey,
    });

    const url = await getSignedUrl(s3, getCommand, {
      expiresIn: 900,
    });
    console.log('Presigned Download URL: ', url);
    return {
      status: 'success',
      message: `Retrieved presigned URL for ${fileName}`,
      data: url,
    };
  } catch (error) {
    console.error('Error generating presigned download URL: ', error);
    return {
      status: 'error',
      message: `Error generating presigned download URL: ${error} `,
    };
  }
}

export async function deleteAudioFromS3(
  fileName: string
): Promise<ActionStatus> {
  const { user } = await getUserProfile();
  if (!user) return { status: 'error', message: 'not authenticated' };

  //Generate the s3 file key using the user id
  const s3FileKey = `${user.id}/${fileName}`;

  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: s3FileKey,
  });

  try {
    const response = await s3.send(deleteCommand);
    console.log('Delete response: ', response);
    return {
      status: 'success',
      message: 'Audio deleted from S3',
      data: response,
    };
  } catch (error) {
    console.error('Error deleting audio from S3: ', error);
    return {
      status: 'error',
      message: `Error deleting audio from S3: ${error}`,
    };
  }
}
