import {components, SingleValueProps} from 'react-select';
import {GenderIcon} from '@/components/icons';
import {getAccentEmoji} from '@/utils/helpers/formHelpers';
import {VoiceOptionProps} from './VoiceOption';
import {Chip} from '@nextui-org/chip';

interface VoiceSingleValueProps
	extends SingleValueProps<VoiceOptionProps, false> {}

export const VoiceSingleValue: React.FC<VoiceSingleValueProps> = (props) => {
	const {label, gender, accent, useCase, description} = props.data;

	const genderIcon = GenderIcon(gender);
	const accentEmoji = getAccentEmoji(accent);

	return (
		<components.SingleValue {...props}>
			<div className='flex gap-5 items-center'>
				<span className='font-bold text-secondary text-xl'>{label}</span>
				{genderIcon}
				<span className='text-2xl'>{accentEmoji}</span>
				{useCase && (
					<Chip color='primary' variant='flat'>
						{useCase}
					</Chip>
				)}
				{description && (
					<Chip color='secondary' variant='flat'>
						{description}
					</Chip>
				)}
			</div>
		</components.SingleValue>
	);
};
