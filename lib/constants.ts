import {DefaultDialogueStyles} from '@/types/drizzle';
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

interface GenderIcon {
	icon: React.ComponentType<IconBaseProps>;
	props: IconBaseProps;
}
export const GenderIconMap: {[key: string]: GenderIcon} = {
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

export const DefaultDialogueOptions: DefaultDialogueStyles[] = [
	{
		label: 'greeting',
		value: 1,
		icon: FaRegSmile,
		color: 'text-primary',
	},
	{
		label: 'farewell',
		value: 2,
		icon: FaRegSadCry,
		color: 'text-error',
	},
	{
		label: 'story',
		value: 3,
		icon: FaBook,
		color: 'text-info',
	},
	{
		label: 'other',
		value: 4,
		icon: FaQuestion,
		color: 'text-secondary',
	},
	{
		label: 'question',
		value: 5,
		icon: FaQuestion,
		color: 'text-warning',
	},
	{
		label: 'answer',
		value: 6,
		icon: FaRegCheckCircle,
		color: 'text-accent',
	},
	{
		label: 'exclamation',
		value: 7,
		icon: FaExclamation,
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
