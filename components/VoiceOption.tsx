import {components, OptionProps} from 'react-select';
import {FaMars, FaVenus, FaMarsAndVenus} from 'react-icons/fa6';
import {getAccentEmoji} from '@/utils/helpers/formHelpers';
import {GenderIcon} from './icons/GenderIcon';

export interface VoiceOptionProps {
	label: string;
	value: string;
	gender: string;
	accent: string;
	useCase: string;
	description?: string;
}

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
	props
) => {
	const {label, gender, accent, description, useCase} = props.data;

	const genderIcon = GenderIcon({gender});
	const accentEmoji = getAccentEmoji(accent);

	return (
		<components.Option {...props}>
			<div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
				<span className=''>{label}</span>
				{genderIcon}
				<span>{accentEmoji}</span>
				<div className='badge badge-sm badge-primary justify-start'>
					{useCase}
				</div>
				{description && (
					<div className='badge badge-sm badge-accent'>{description}</div>
				)}
			</div>
		</components.Option>
	);
};
