import {DialogueIconMap} from '@/lib/constants';
export const DialogueIcon = ({dialogueType}: {dialogueType: string}) => {
	const {icon: DialogueIcon, props} =
		DialogueIconMap[dialogueType] || DialogueIconMap.other;
	return <DialogueIcon {...props} />;
};
