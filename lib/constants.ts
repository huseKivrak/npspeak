import {FormOptions} from '@/types/drizzle';
import {IconBaseProps} from 'react-icons';
import {
	FaRegSmile,
	FaRegSadCry,
	FaBook,
	FaQuestion,
	FaRegCheckCircle,
	FaExclamation,
} from 'react-icons/fa';
import {FaMars, FaVenus, FaMarsAndVenus} from 'react-icons/fa6';

interface IconProps {
	icon: React.ComponentType<IconBaseProps>;
	props: IconBaseProps;
}
export const GenderIconMap: {[key: string]: IconProps} = {
	male: {
		icon: FaMars,
		props: {
			size: 12,
			color: '#60a5fa',
		},
	},
	female: {
		icon: FaVenus,
		props: {
			size: 12,
			color: '#f472b6',
		},
	},
	default: {
		icon: FaMarsAndVenus,
		props: {
			size: 12,
			color: '#a78bfa',
		},
	},
};

export const DialogueIconMap: {[key: string]: IconProps} = {
	greeting: {
		icon: FaRegSmile,
		props: {
			size: 20,
			color: '#60a5fa',
		},
	},
	farewell: {
		icon: FaRegSadCry,
		props: {
			size: 20,
			color: '#f472b6',
		},
	},
	story: {
		icon: FaBook,
		props: {
			size: 20,
			color: '#a78bfa',
		},
	},
	question: {
		icon: FaQuestion,
		props: {
			size: 20,
			color: '#f59e0b',
		},
	},
	answer: {
		icon: FaRegCheckCircle,
		props: {
			size: 20,
			color: '#16a34a',
		},
	},
	exclamation: {
		icon: FaExclamation,
		props: {
			size: 20,
			color: '#f59e0b',
		},
	},
	other: {
		icon: FaQuestion,
		props: {
			size: 20,
			color: '#a78bfa',
		},
	},
};

export const DefaultDialogueTypes: FormOptions = [
	{label: 'greeting', value: 1},
	{label: 'farewell', value: 2},
	{label: 'story', value: 3},
	{label: 'other', value: 4},
	{label: 'question', value: 5},
	{label: 'answer', value: 6},
	{label: 'exclamation', value: 7},
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
