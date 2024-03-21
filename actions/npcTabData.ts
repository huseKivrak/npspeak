'use server';
import {getUserInfo} from './auth';
import {getPresignedDownloadURL} from './s3';
import {getAudioURLsforNPCDialogues} from '@/database/drizzle/queries';
import {ActionStatus, DetailedNPC} from '@/types/drizzle';
import {DetailedDialogue} from '@/types/drizzle';
import {getAllElevenLabsVoices, getElevenLabsVoiceInfo} from './elevenLabs';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {DefaultDialogueTypes} from '@/lib/constants';

//Overview Tab Data
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

	const _getNPCVoiceInfo = async (): Promise<ActionStatus> => {
		const voiceId = npc.voice_id;
		if (!voiceId) {
			return {
				status: 'error',
				message: 'No voice id found for NPC',
			};
		}

		const voiceInfoResponse = await getElevenLabsVoiceInfo(voiceId);
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

	const npcVoice = await _getNPCVoiceInfo();
	return npcVoice;
};

//Dialogue Tab Data
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
	const audioURLsResponse = await getAudioURLsforNPCDialogues(
		npc.id,
		npc.user_id
	);

	if (audioURLsResponse.status !== 'success') {
		return audioURLsResponse;
	}

	const allNPCDialogueAudioURLs: {id: number; audioURL: string}[] =
		audioURLsResponse.data;

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

	// create detailed dialogue objects with styles and audio urls
	const detailedDialogues: DetailedDialogue[] = npc.dialogues.map((d) => {
		const dialogueType = d.dialogue_type_id
			? DefaultDialogueTypes[d.dialogue_type_id]
			: 'other';
		const audioURL = presignedAudioURLs.find(({id}) => id === d.id) || null;
		const {id, text} = d;
		return {
			id,
			text,
			dialogueType,
			audioURL: audioURL?.url || null,
		};
	});

	return {
		status: 'success',
		message: 'Successfully fetched NPC dialogue data',
		data: detailedDialogues,
	};
};

export const createAllTabData = async (npc: DetailedNPC) => {
	const [overviewTab, dialogueTab, allVoices] = await Promise.all([
		getNPCOverviewTabData(npc),
		getNPCDialogueTabData(npc),
		getAllElevenLabsVoices(),
	]);

	const allTabData = {
		overviewTab,
		dialogueTab,
		allVoices,
	};
	console.log('All Tab Data:', allTabData);

	return allTabData;
};
