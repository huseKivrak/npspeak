'use server';

import {getUserInfo} from './auth';
import {ActionStatus} from '@/types/drizzle';

import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {v4 as uuidv4} from 'uuid';

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
	const {user} = await getUserInfo();
	if (!user) return {status: 'error', message: 'not authenticated'};

	const randomString = uuidv4();
	const s3FileName = `${user.id}/${randomString}.mp3`;

	const putCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Key: s3FileName,
		ContentType: 'audio/mpeg',
		Metadata: {
			user: user.id,
		},
	});

	try {
		const url = await getSignedUrl(s3, putCommand, {
			expiresIn: 900,
		});

		console.log('Presigned URL: ', url);
		return {status: 'success', message: url};
	} catch (error) {
		console.error('Error generating presigned upload URL: ', error);
		return {
			status: 'error',
			message: `Error generating presigned upload URL: ${error} `,
		};
	}
}

export async function uploadAudioToS3(
	audioBuffer: ArrayBuffer
): Promise<ActionStatus> {
	try {
		const {status, message} = await getPresignedUploadURL();

		const uploadResponse = await fetch(message, {
			method: 'PUT',
			headers: {
				'Content-Type': 'audio/mpeg',
			},
			body: Buffer.from(audioBuffer),
		});
		const s3Url = message.split('?')[0];
		const file_duration = audioBuffer.byteLength / 44100 / 2;

		return {
			status: 'success',
			message: 'uploaded to s3',
			data: {url: s3Url, duration: file_duration},
		};
	} catch (error) {
		console.error('Error uploading audio to S3: ', error);
		return {status: 'error', message: `Error uploading audio to S3: ${error}`};
	}
}

export async function getPresignedDownloadURL(
	fileName: string
): Promise<ActionStatus> {
	const {user} = await getUserInfo();
	if (!user) return {status: 'error', message: 'not authenticated'};

	const getCommand = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Key: fileName,
	});

	try {
		const url = await getSignedUrl(s3, getCommand, {
			expiresIn: 900,
		});
		console.log('Presigned Download URL: ', url);
		return {status: 'success', message: url};
	} catch (error) {
		console.error('Error generating presigned download URL: ', error);
		return {
			status: 'error',
			message: `Error generating presigned download URL: ${error} `,
		};
	}
}
