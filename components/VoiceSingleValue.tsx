import {components, SingleValueProps} from 'react-select';
import {GenderIcon} from './icons/GenderIcon';
import {getAccentEmoji} from '@/utils/helpers/formHelpers';

import {VoiceOptionProps} from './VoiceOption';

interface VoiceSingleValueProps
	extends SingleValueProps<VoiceOptionProps, false> {}

export const VoiceSingleValue: React.FC<VoiceSingleValueProps> = (props) => {
	const {label, gender, accent, useCase, description} = props.data;

	const genderIcon = GenderIcon(gender);
	const accentEmoji = getAccentEmoji(accent);

	return (
		<components.SingleValue {...props}>
			<div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
				<span>{label}</span>
				{genderIcon}
				<span>{accentEmoji}</span>
				<div className='badge badge-sm badge-primary justify-start'>
					{useCase}
				</div>
				{description && (
					<div className='badge badge-sm badge-accent'>{description}</div>
				)}
			</div>
		</components.SingleValue>
	);
};
