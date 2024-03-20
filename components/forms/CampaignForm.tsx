'use client';
import {useState, useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCampaignAction} from '@/actions/db/campaigns';
import {campaignSchema} from '@/database/drizzle/validation';
import {ActionStatus} from '@/types/drizzle';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ErrorMessage} from '@hookform/error-message';
import ErrorToast from '../ErrorToast';
import {FormOptions} from '@/types/drizzle';
import {CheckboxSelections} from './CheckboxSelections';
interface CampaignFormProps {
	npcOptions?: FormOptions;
}

type Inputs = z.infer<typeof campaignSchema>;
export default function CampaignForm({npcOptions}: CampaignFormProps) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		createCampaignAction,
		{
			status: 'idle',
			message: '',
		}
	);
	const [showAddNpc, setShowAddNpc] = useState(false);
	const {
		register,
		formState: {errors},
		setError,
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(campaignSchema),
	});

	useEffect(() => {
		if (state.status === 'idle') return;
		if (state?.status === 'error') {
			console.log('errors:', state.errors);
			state.errors?.forEach((error) => {
				setError(error.path as FieldPath<Inputs>, {
					message: error.message,
				});
			});
		}
		if (state.status === 'success') {
			alert(state.message);
			reset();
		}
	}, [state, setError, reset]);

	return (
		<div className='flex flex-col'>
			<form action={formAction} className='w-full max-w-xs flex flex-col gap-2'>
				<label htmlFor='campaign_name' className='form-control'>
					campaign name
				</label>
				<input
					{...register('campaign_name')}
					id='campaign_name'
					type='text'
					name='campaign_name'
					placeholder='name your campaign'
					className='input input-bordered input-primary mb-4'
				/>
				<ErrorMessage
					errors={errors}
					name='campaign_name'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<label htmlFor='description' className='form-control'>
					description
				</label>
				<textarea
					{...register('description')}
					id='description'
					name='description'
					placeholder='describe your campaign'
					className='textarea textarea-primary w-full h-24'
				/>
				<ErrorMessage
					errors={errors}
					name='description'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<label htmlFor='start_date' className='form-control'>
					start date
				</label>
				<input
					{...register('start_date')}
					id='start_date'
					type='date'
					name='start_date'
					className='input input-bordered input-primary'
				/>
				<ErrorMessage
					errors={errors}
					name='start_date'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<label htmlFor='end_date' className='form-control'>
					end date
				</label>
				<input
					{...register('end_date')}
					id='end_date'
					type='date'
					name='end_date'
					className='input input-bordered input-primary'
				/>
				<ErrorMessage
					errors={errors}
					name='end_date'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<button
					type='button'
					className='btn btn-sm btn-secondary w-full mt-4'
					onClick={() => setShowAddNpc(!showAddNpc)}
				>
					{showAddNpc ? 'cancel' : 'add NPC(s) to campaign'}
				</button>
				{showAddNpc && npcOptions && npcOptions.length > 0 && (
					<>
						<label htmlFor='npc_ids' className='form-control'>
							Which NPC(s) are part of this campaign?
						</label>
						<CheckboxSelections
							fieldName='npc_ids'
							options={npcOptions}
							register={register}
						/>
					</>
				)}
				<SubmitButton text='submit' className={'flex mt-10'} />
			</form>
		</div>
	);
}
