'use client';

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
				<label
					key={option.value}
					className='label cursor-pointer justify-start'
				>
					<input
						type='radio'
						value={option.value}
						{...register(fieldName, {required: true})}
						className='radio radio-primary'
						onChange={() => handleRadioChange(option.value, option.label)}
						required
					/>
					<span className='label-text ml-4'>{option.label}</span>
				</label>
			))}
			<input type='hidden' value={selectedText} {...register('text')} />
		</div>
	);
};
