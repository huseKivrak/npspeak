import {components, OptionProps} from 'react-select';
import {FaMars, FaVenus, FaMarsAndVenus} from 'react-icons/fa6';
import {getAccentEmoji} from '@/utils/helpers/formHelpers';
import {GenderIcon} from '@/components/icons/GenderIcon';

export interface VoiceOptionProps {
	label: string;
	value: string;
	gender: string;
	accent: string;
	useCase?: string | null;
	description?: string;
}

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
	props
) => {
	const {label, gender, accent, description, useCase} = props.data;

	const genderIcon = GenderIcon(gender);
	const accentEmoji = getAccentEmoji(accent);

	return (
		<components.Option {...props}>
			<div className='flex gap-3 items-center'>
				<span className='text-primary'>{label}</span>
				{genderIcon}
				<span className='text-lg'>{accentEmoji}</span>
				{useCase && (
					<div className='badge badge-sm badge-primary justify-start'>
						{useCase}
					</div>
				)}
				{description && (
					<div className='badge badge-sm badge-accent'>{description}</div>
				)}
			</div>
		</components.Option>
	);
};
