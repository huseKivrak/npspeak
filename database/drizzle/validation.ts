import {z} from 'zod';
import {zfd} from 'zod-form-data';

//Auth
export const loginSchema = zfd.formData({
	username: zfd.text(z.string()),
	password: zfd.text(z.string()),
});

export const signupSchema = zfd
	.formData({
		email: zfd.text(z.string().email()),
		username: zfd.text(
			z.string().min(4, 'Username must be at least 4 characters long')
		),
		password: zfd.text(
			z.string().min(7, 'Password must be at least 7 characters long')
		),
		confirm_password: zfd.text(
			z.string().min(7, 'Password must be at least 7 characters long')
		),
	})
	.superRefine((data, ctx) => {
		const {password, confirm_password} = data;
		if (password !== confirm_password) {
			ctx.addIssue({
				code: 'custom',
				path: ['password', 'confirm_password'],
				message: 'Passwords do not match',
			});
		}
	});

//Campaigns
export const campaignSchema = zfd
	.formData({
		campaign_name: zfd.text(
			z
				.string()
				.min(3, 'Name must be at least 3 characters long')
				.max(50, 'Name must be at most 50 characters long')
		),
		description: zfd.text(
			z
				.string()
				.min(5, 'Description must be at least 5 characters long')
				.max(255, 'Description must be at most 255 characters long')
				.optional()
		),
		npc_ids: zfd.repeatableOfType(zfd.numeric().optional()),
		start_date: zfd.text(z.string().optional()),
		end_date: zfd.text(z.string().optional()),
	})
	.superRefine((data, ctx) => {
		const {start_date, end_date} = data;
		if (start_date) {
			const startDate = new Date(start_date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			if (startDate < today) {
				ctx.addIssue({
					code: 'invalid_date',
					path: ['start_date'],
					message: 'Start date must be today or later',
				});
			}
		}
		if (end_date && start_date) {
			const startDate = new Date(start_date);
			const endDate = new Date(end_date);
			if (endDate < startDate) {
				ctx.addIssue({
					code: 'invalid_date',
					path: ['end_date'],
					message: 'End date must be the same or later than the start date',
				});
			}
		}
	});

export const deleteCampaignSchema = zfd.formData({
	campaign_id: zfd.numeric(),
});

//NPCs
export const npcSchema = zfd.formData({
	npc_name: zfd.text(
		z
			.string()
			.min(2, 'Name must be at least 2 characters long')
			.max(50, 'Name must be at most 50 characters long')
	),
	description: zfd.text(
		z
			.string()
			.min(2, 'Description must be at least 2 characters long')
			.max(255, 'Description must be at most 255 characters long')
			.optional()
	),
	campaign_ids: zfd.repeatableOfType(zfd.numeric().optional()),
});

export const deleteNPCSchema = zfd.formData({
	npc_id: zfd.numeric(),
});

//Dialogues
export const dialogueSchema = zfd.formData({
	npc_id: zfd.numeric(),
	dialogue_type_id: zfd.numeric(),
	text: zfd.text(
		z
			.string()
			.min(2, 'Dialogue must be at least 2 characters long')
			.max(255, 'Dialogue must be at most 255 characters long')
	),
	tts_audio_id: zfd.numeric().optional(),
});

//TTS
export const ttsAudioSchema = zfd.formData({
	voice_id: zfd.text(z.string()),
	source_text: zfd.text(z.string()),
	file_url: zfd.text(z.string()),
	duration_seconds: zfd.numeric(),
});

export const ttsHandlerSchema = zfd.formData({
	text: zfd.text(z.string()),
	voice_id: zfd.text(z.string()),
	npc_id: zfd.numeric(),
	dialogue_id: zfd.numeric(),
});
