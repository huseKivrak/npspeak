'use client';
import {useFormState} from 'react-dom';
import {createCampaignAction} from '@/server-actions/drizzle';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import ErrorToast from '../ErrorToast';

export default function CampaignForm() {
	const [state, formAction] = useFormState(createCampaignAction, null);

	const getFieldError = (fieldName: string) => {
		return state?.zodError?.find((err) => err.path[0] === fieldName)?.message;
	};

	return (
		<div className='flex flex-col items-center'>
			<h1 className='my-8'>create a new campaign</h1>
			<form action={formAction} className='w-full max-w-xs flex flex-col gap-2'>
				<label htmlFor='campaign_name' className='form-control'>
					name (required)
				</label>
				<input
					type='text'
					name='campaign_name'
					placeholder="what's your campaign called?"
					className='input input-bordered input-primary mb-4'
					required
				/>
				{getFieldError('campaign_name') && (
					<ErrorToast message={getFieldError('campaign_name')} />
				)}
				<label htmlFor='description' className='form-control'>
					description
				</label>
				<textarea
					name='description'
					placeholder='describe your campaign'
					className='textarea textarea-primary w-full h-24'
				/>
				{getFieldError('description') && (
					<ErrorToast message={getFieldError('description')} />
				)}
				<label htmlFor='start_date' className='form-control'>
					start date
				</label>
				<input
					type='date'
					name='start_date'
					className='input input-bordered input-primary'
				/>
				{getFieldError('start_date') && (
					<ErrorToast message={getFieldError('start_date')} />
				)}
				<label htmlFor='end_date' className='form-control'>
					end date
				</label>
				<input
					type='date'
					name='end_date'
					className='input input-bordered input-primary'
				/>
				{getFieldError('end_date') && (
					<ErrorToast message={getFieldError('end_date')} />
				)}
				<SubmitButton text='submit' className={'flex mt-10'} />
			</form>
			{state?.message && (
				<div className='text-green-600'>
					<p>{state.message}</p>
					Campaign <strong>{state.message} </strong>
					created successfully!
				</div>
			)}
		</div>
	);
}
