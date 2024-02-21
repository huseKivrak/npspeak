'use client';
import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCampaignAction} from '@/actions/drizzle/campaigns';
import {campaignSchema} from '@/database/drizzle/validation';
import {State} from '@/types/drizzle';
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
	const [state, formAction] = useFormState<State, FormData>(
		createCampaignAction,
		null
	);

	const {
		register,
		formState: {errors},
		setError,
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(campaignSchema),
	});

	useEffect(() => {
		if (!state) return;
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
		<div className='flex flex-col items-center'>
			<form action={formAction} className='w-full max-w-xs flex flex-col gap-2'>
				<label htmlFor='campaign_name' className='form-control'>
					campaign name
				</label>
				<input
					{...register('campaign_name')}
					id='campaign_name'
					type='text'
					name='campaign_name'
					placeholder="what's your campaign called?"
					className='input input-bordered input-primary mb-4'
				/>
				<ErrorMessage
					errors={errors}
					name='campaign_name'
					render={({message}) => <ErrorToast message={message} />}
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
					render={({message}) => <ErrorToast message={message} />}
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
					render={({message}) => <ErrorToast message={message} />}
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
					render={({message}) => <ErrorToast message={message} />}
				/>
				<label htmlFor='npc_ids' className='form-control'>
					NPCs to include
				</label>
				{npcOptions && npcOptions.length > 0 && (
					<CheckboxSelections
						fieldName='npc_ids'
						options={npcOptions}
						register={register}
					/>
				)}
				<SubmitButton text='submit' className={'flex mt-10'} />
			</form>
		</div>
	);
}
