'use server';
import {getUserInfo} from './auth';
import {createNPCStats, createStyledDialogue} from '../utils/formatHelpers';
import {getPresignedDownloadURL} from './s3';
import {getAudioURLsforNPCDialogues} from '@/database/drizzle/queries';
import {ActionStatus, DetailedNPC} from '@/types/drizzle';
import {StyledDialogueWithAudioURL} from '@/types/drizzle';
import {getAllElevenLabsVoices, getElevenLabsVoiceInfo} from './elevenLabs';
import {ElevenLabsVoice} from '@/types/elevenlabs';
export const getNPCDialogueTabData = async (
	npc: DetailedNPC
): Promise<ActionStatus> => {
	const {user} = await getUserInfo();
	if (!user) {
		return {
			status: 'error',
			message: 'Unauthenticated',
		};
	}
	if (npc.user_id !== user.id) {
		return {
			status: 'error',
			message: 'Unauthorized access to this NPC',
		};
	}

	// gets the url associated with each dialogue audio from database
	const allNPCDialogueAudioURLs = await getAudioURLsforNPCDialogues(
		npc.id,
		npc.user_id
	);

	// fetches the presigned urls for all audio files from s3
	const presignedAudioURLs = await Promise.all(
		allNPCDialogueAudioURLs.map(async (d) => {
			try {
				const fileKey = d.audioURL;
				if (!fileKey) return {id: d.id, url: null};

				const response = await getPresignedDownloadURL(fileKey);
				if (response.status === 'success') {
					return {id: d.id, url: response.data};
				} else {
					return {id: d.id, url: null};
				}
			} catch (error) {
				console.error(error);
				return {id: d.id, url: null};
			}
		})
	);

	// create render-ready dialogue object with styles and audio urls
	const styledDialoguesWithAudioURLs: StyledDialogueWithAudioURL[] =
		npc.dialogues.map((d) => {
			const styledDialogue = createStyledDialogue(d);
			const audioURL = presignedAudioURLs.find(({id}) => id === d.id) || null;
			return {
				...styledDialogue,
				audioURL: audioURL?.url || null,
			};
		});

	return {
		status: 'success',
		message: 'Successfully fetched NPC dialogue data',
		data: styledDialoguesWithAudioURLs,
	};
};

export const getNPCOverviewTabData = async (
	npc: DetailedNPC
): Promise<ActionStatus> => {
	const {user} = await getUserInfo();
	if (!user) {
		return {
			status: 'error',
			message: 'Unauthenticated',
		};
	}
	if (npc.user_id !== user.id) {
		return {
			status: 'error',
			message: 'Unauthorized access to this NPC',
		};
	}

	const _getNPCVoiceInfo = async (
		npcVoiceId: string
	): Promise<ActionStatus> => {
		const voiceInfoResponse = await getElevenLabsVoiceInfo(npcVoiceId);
		if (voiceInfoResponse.status === 'success') {
			const voiceInfo: ElevenLabsVoice = voiceInfoResponse.data;
			console.log('Voice INFO:', voiceInfo);
			return {
				status: 'success',
				message: 'Successfully fetched voice info for NPC',
				data: voiceInfo,
			};
		} else {
			console.error('Error fetching voice info for NPC:', voiceInfoResponse);
			return {
				status: 'error',
				message: voiceInfoResponse.message,
			};
		}
	};

	const npcVoiceInfo = npc.voice_id
		? await _getNPCVoiceInfo(npc.voice_id)
		: {
				status: 'error',
				message: 'NPC does not have a voice',
		  };

	const npcStats = createNPCStats(npc);

	return {
		status: 'success',
		message: 'Successfully fetched NPC overview data',
		data: {
			voiceInfo: npcVoiceInfo,
			stats: npcStats,
		},
	};
};
