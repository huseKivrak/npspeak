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
	{label: 'greeting', value: 1, icon: FaRegSmile, color: '#00ff00'},
	{label: 'farewell', value: 2, icon: FaRegSadCry, color: '#ff0000'},
	{label: 'story', value: 3, icon: FaBook, color: '#0000ff'},
	{label: 'other', value: 4, icon: FaQuestion, color: '#ffff00'},
	{label: 'question', value: 5, icon: FaQuestion, color: '#ffa500'},
	{label: 'answer', value: 6, icon: FaRegCheckCircle, color: '#00ffff'},
	{label: 'exclamation', value: 7, icon: FaExclamation, color: '#ff00ff'},
];
