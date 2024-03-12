import {useState} from 'react';
import {FormOptions} from '@/types/drizzle';
import {UseFormRegister, UseFormSetValue} from 'react-hook-form';
interface RadioSelectionProps {
	fieldName: 'npc_ids' | 'campaign_ids' | 'dialogue_id';
	options: FormOptions;
	register: UseFormRegister<any>; //todo: fix any typing here
	setValue: UseFormSetValue<any>;
}

export const RadioSelections = ({
	fieldName,
	options,
	register,
	setValue,
}: RadioSelectionProps) => {
	const [selectedText, setSelectedText] = useState<string>('');

	const handleRadioChange = (value: number, label: string) => {
		setSelectedText(label);
		setValue('text', value);
	};

	return (
		<div className='form-control'>
			{options.map((option) => (
				<label key={option.value} className='label cursor-pointer'>
					<input
						type='radio'
						value={option.value}
						{...register(fieldName, {required: true})}
						className='radio'
						onChange={() => handleRadioChange(option.value, option.label)}
					/>
					<span className='label-text'>{option.label}</span>
				</label>
			))}
			<input type='hidden' value={selectedText} {...register('text')} />
		</div>
	);
};
