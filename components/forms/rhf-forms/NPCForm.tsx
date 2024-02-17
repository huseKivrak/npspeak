'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {createNPCAction} from '@/app/actions/NPCs';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import ErrorToast from '@/components/ErrorToast';
import {insertNPCSchema} from '@/database/drizzle/schema';
import {NPCState} from '@/app/actions/NPCs';

type Inputs = z.infer<typeof insertNPCSchema>;
export type NPCZodErrors = {
	formErrors?: string[];
	fieldErrors?: {
		npc_name?: string[];
		description?: string[];
	};
} | null;
export default function NPCForm() {
	const [state, formAction] = useFormState(createNPCAction, null);
	const [zodErrors, setZodErrors] = useState<NPCZodErrors>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm<Inputs>({
		resolver: zodResolver(insertNPCSchema),
	});

	const processForm = async (data: Inputs) => {
		const result = insertNPCSchema.safeParse(data);
		if (!result.success) {
			const errors = result.error.flatten();
			setZodErrors(errors);
		} else {
			const {npc_name, description} = result.data;
			const formData = {
				npc_name,
				description: description ? description : undefined, //todo: fix
			};
			await formAction(formData);
		}
	};

	useEffect(() => {
		if (state?.status === 'error') {
		}
	}, [state]);

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<div>
				<label htmlFor='npc_name'>NPC Name</label>
				<input
					{...register('npc_name', {required: 'NPC Name is required'})}
					type='text'
					id='npc_name'
					name='npc_name'
				/>
				{errors.npc_name && <span>{errors.npc_name.message}</span>}
			</div>
			<div>
				<label htmlFor='description'>Description</label>
				<textarea
					{...register('description')}
					id='description'
					name='description'
				/>
				{errors.description && <span>{errors.description.message}</span>}
			</div>
		</form>
	);
}
