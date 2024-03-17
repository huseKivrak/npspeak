import {
	FaRegSmile,
	FaRegSadCry,
	FaBook,
	FaQuestion,
	FaRegCheckCircle,
	FaExclamation,
} from 'react-icons/fa';
import {DialogueOptions} from '@/types/drizzle';
export const DefaultDialogueOptions: DialogueOptions = [
	{label: 'greeting', value: 1, Icon: FaRegSmile, color: 'text-primary'},
	{label: 'farewell', value: 2, Icon: FaRegSadCry, color: 'text-error'},
	{label: 'story', value: 3, Icon: FaBook, color: 'text-info'},
	{label: 'other', value: 4, Icon: FaQuestion, color: 'text-secondary'},
	{label: 'question', value: 5, Icon: FaQuestion, color: 'text-warning'},
	{label: 'answer', value: 6, Icon: FaRegCheckCircle, color: 'text-accent'},
	{label: 'exclamation', value: 7, Icon: FaExclamation, color: 'text-success'},
];
