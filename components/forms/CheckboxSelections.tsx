import {FormOptions} from '@/types/drizzle';
import {UseFormRegister} from 'react-hook-form';

interface CheckboxSelectionsProps {
	fieldName: 'npc_ids' | 'campaign_ids';
	options: FormOptions;
	register: UseFormRegister<any>;
}

export const CheckboxSelections = ({
	fieldName,
	options,
	register,
}: CheckboxSelectionsProps) => {
	return (
		<div className='form-control'>
			{options.map((option) => (
				<label key={option.value} className='label cursor-pointer'>
					<span className='label-text'>{option.label}</span>
					<input
						type='checkbox'
						value={option.value}
						//registers values based on fieldName prop
						{...register(fieldName)}
						className='checkbox'
					/>
				</label>
			))}
		</div>
	);
};
