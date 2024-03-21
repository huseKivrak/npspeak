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
			size: 16,
			color: '#60a5fa',
		},
	},
	female: {
		icon: FaVenus,
		props: {
			size: 16,
			color: '#f472b6',
		},
	},
	default: {
		icon: FaMarsAndVenus,
		props: {
			size: 16,
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

export const DefaultDialogueTypes: {[key: number]: string} = {
	1: 'greeting',
	2: 'farewell',
	3: 'story',
	4: 'other',
	5: 'question',
	6: 'answer',
	7: 'exclamation',
};

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
