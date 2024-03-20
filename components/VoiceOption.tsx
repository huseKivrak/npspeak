import {components, OptionProps} from 'react-select';
import {FaMars, FaVenus, FaMarsAndVenus} from 'react-icons/fa6';
import {AccentEmojiMap, GenderColorMap} from '@/lib/constants';

interface VoiceOption {
	label: string;
	value: string;
	gender: string;
	age: string;
	accent: string;
	description: string;
	useCase: string;
}

export const VoiceOption: React.FC<OptionProps<VoiceOption, false>> = (
	props
) => {
	const {label, gender, accent, description, useCase} = props.data;

	//Gender Icon
	const genderIconProps = {
		size: 15,
		color: GenderColorMap[gender] || GenderColorMap.default,
	};
	const genderIcon =
		gender === 'male' ? (
			<FaMars {...genderIconProps} />
		) : gender === 'female' ? (
			<FaVenus {...genderIconProps} />
		) : (
			<FaMarsAndVenus {...genderIconProps} />
		);

	//Accent Emoji
	const accentEmoji = AccentEmojiMap[accent] || accent;
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
