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
