'use client';
import {useState, useEffect} from 'react';
import {useForm, FieldPath, Controller} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCampaignAction} from '@/actions/db/campaigns';
import {campaignSchema} from '@/database/drizzle/validation';
import {ActionStatus} from '@/types/drizzle';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ErrorMessage} from '@hookform/error-message';
import {ErrorToast} from '../ErrorToast';
import {FormOptions} from '@/types/drizzle';
import {
	CheckboxGroup,
	Checkbox,
	Input,
	Textarea,
	Button,
} from '@nextui-org/react';
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
		control,
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
		<div className='flex flex-col items-start mb-8'>
			<form className='flex flex-col w-full max-w-xs gap-2'>
				<Input
					{...register('campaign_name')}
					id='campaign_name'
					type='text'
					variant='bordered'
					name='campaign_name'
					placeholder='name your campaign'
				/>
				<ErrorMessage
					errors={errors}
					name='campaign_name'
					render={({message}) => <ErrorToast text={message} />}
				/>

				<Textarea
					{...register('description')}
					id='description'
					name='description'
					placeholder='describe your campaign'
					variant='bordered'
				/>
				<ErrorMessage
					errors={errors}
					name='description'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<Input
					{...register('start_date')}
					id='start_date'
					type='date'
					name='start_date'
					variant='bordered'
				/>
				<ErrorMessage
					errors={errors}
					name='start_date'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<Input
					{...register('end_date')}
					id='end_date'
					type='date'
					name='end_date'
					variant='bordered'
				/>
				<ErrorMessage
					errors={errors}
					name='end_date'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<Button
					onClick={() => setShowAddNpc(!showAddNpc)}
					variant='flat'
					color='secondary'
				>
					{showAddNpc ? 'cancel' : 'add NPC(s) to campaign'}
				</Button>
				{showAddNpc && npcOptions && npcOptions.length > 0 && (
					<Controller
						name='npc_ids'
						control={control}
						render={({field: {ref}}) => (
							<CheckboxGroup
								label='npcs'
								name='npc_ids'
								orientation='horizontal'
								ref={ref}
							>
								{npcOptions.map((option) => (
									<Checkbox key={option.label} value={option.value.toString()}>
										{option.label}
									</Checkbox>
								))}
							</CheckboxGroup>
						)}
					/>
				)}
				<SubmitButton
					formAction={formAction}
					pendingText='creating campaign...'
					variant='flat'
					color='success'
					className='mt-2 font-bold text-large'
				>
					create campaign!
				</SubmitButton>
			</form>
		</div>
	);
}
