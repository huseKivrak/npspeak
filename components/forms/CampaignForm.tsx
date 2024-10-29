'use client';
import { useState, useEffect } from 'react';
import { useForm, FieldPath, Controller } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCampaignAction } from '@/actions/db/campaigns';
import { campaignSchema } from '@/database/drizzle/validation';
import { ActionStatus } from '@/types/types';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { IconPlus } from '../../lib/icons';
import { FormOptions } from '@/types/types';
import {
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
  Input,
} from '@nextui-org/react';

interface CampaignFormProps {
  npcOptions?: FormOptions;
}

type Inputs = z.infer<typeof campaignSchema>;
export default function CampaignForm({ npcOptions }: CampaignFormProps) {
  const [ state, formAction ] = useFormState<ActionStatus, FormData>(
    createCampaignAction,
    {
      status: 'idle',
      message: '',
    }
  );
  const [ showAddNpc, setShowAddNpc ] = useState(false);
  const {
    register,
    formState: { errors },
    setError,
    control,
    trigger,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(campaignSchema),
  });

  useEffect(() => {
    if (state.status === 'idle') return;
    if (state?.status === 'error') {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<Inputs>, {
          message: error.message,
        });
      });
    }
  }, [ state, setError ]);

  const hasNPCs = npcOptions && npcOptions.length > 0;

  return (
    <div className="flex flex-col gap-4 ">
      <h1>create campaign</h1>
      <form className="flex flex-col max-w-lg gap-4">
        <Input
          isRequired
          {...register('campaign_name')}
          type="text"
          label="name"
          variant="flat"
          size="lg"
          isInvalid={!!errors.campaign_name}
          errorMessage={errors.campaign_name && errors.campaign_name.message}
        />

        <Textarea
          {...register('description')}
          name="description"
          label="description (optional)"
          variant="flat"
          size="lg"
          isInvalid={!!errors.description}
          errorMessage={errors.description && errors.description.message}
        />

        <Input
          {...register('start_date')}
          type="date"
          label="Start Date (optional)"
          variant="flat"
          size="lg"
          isInvalid={!!errors.start_date}
          errorMessage={errors.start_date && errors.start_date.message}
          onChange={() => trigger('start_date')}
        />

        <Input
          {...register('end_date')}
          type="date"
          label="End date (optional)"
          variant="flat"
          size="lg"
          isInvalid={!!errors.end_date}
          errorMessage={errors.end_date && errors.end_date.message}
          onChange={() => trigger('end_date')}
        />
        {hasNPCs && (
          <Button
            onClick={() => setShowAddNpc(!showAddNpc)}
            variant="flat"
            color="secondary"
            aria-label="add NPCs to campaign"
            startContent={showAddNpc ? '' : <IconPlus />}
          >
            {showAddNpc ? 'cancel' : 'NPC(s)'}
          </Button>
        )}
        {showAddNpc && hasNPCs && (
          <Controller
            name="npc_ids"
            control={control}
            render={({ field: { ref } }) => (
              <CheckboxGroup
                aria-label="npc options"
                name="npc_ids"
                ref={ref}
                size="sm"
                classNames={{
                  base: 'w-full inline-flex m-0 p-0',
                  wrapper:
                    'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 tracking-wider',
                }}
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
          pendingText="creating campaign..."
          variant="flat"
          size="lg"
          color="success"
          className="mt-2 font-bold text-large"
        >
          create
        </SubmitButton>
      </form>
    </div>
  );
}
