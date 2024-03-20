import {DefaultDialogueStyles} from '@/types/drizzle';
export const DefaultDialogueOptions: DefaultDialogueStyles[] = [
	{
		label: 'greeting',
		value: 1,
		iconName: 'FaRegSmile',
		color: 'text-primary',
	},
	{
		label: 'farewell',
		value: 2,
		iconName: 'FaRegSadCry',
		color: 'text-error',
	},
	{
		label: 'story',
		value: 3,
		iconName: 'FaBook',
		color: 'text-info',
	},
	{
		label: 'other',
		value: 4,
		iconName: 'FaQuestion',
		color: 'text-secondary',
	},
	{
		label: 'question',
		value: 5,
		iconName: 'FaQuestion',
		color: 'text-warning',
	},
	{
		label: 'answer',
		value: 6,
		iconName: 'FaRegCheckCircle',
		color: 'text-accent',
	},
	{
		label: 'exclamation',
		value: 7,
		iconName: 'FaExclamation',
		color: 'text-success',
	},
];

export const AccentEmojiMap: {[key: string]: string} = {
	american: '🇺🇸',
	'british-essex': '🇬🇧',
	irish: '🇮🇪',
	australian: '🇦🇺',
	british: '🇬🇧',
	'english-swedish': '🇬🇧/🇸🇪',
	'american-irish': '🇺🇸/🇮🇪',
	jolly: '🎅🏼',
	'american-southern': '🇺🇸/🤠',
	'english-italian': '🇬🇧/🇮🇹',
};

export const AgeColorMap: {[key: string]: string} = {
	young: '#86efac',
	'middle aged': '#16a34a',
	old: '#166534',
	default: '#14b8a6',
};

export const GenderColorMap: {[key: string]: string} = {
	male: '#60a5fa',
	female: '#f472b6',
	default: '#a78bfa',
};
