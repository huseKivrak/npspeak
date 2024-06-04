'use client'
import { useState, useEffect } from 'react'
import { useForm, FieldPath, Controller } from 'react-hook-form'
import { useFormState } from 'react-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCampaignAction } from '@/actions/db/campaigns'
import { campaignSchema } from '@/database/drizzle/validation'
import { ActionStatus } from '@/types/drizzle'
import { SubmitButton } from '@/components/buttons/SubmitButton'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorToast } from '../ErrorToast'
import { PlusIcon } from '../icons'
import { FormOptions } from '@/types/drizzle'
import {
  CheckboxGroup,
  Checkbox,
  Input,
  Textarea,
  Button,
} from '@nextui-org/react'
import { FormInput } from './FormInput'

interface CampaignFormProps {
  npcOptions?: FormOptions
}

type Inputs = z.infer<typeof campaignSchema>
export default function CampaignForm({ npcOptions }: CampaignFormProps) {
  const [state, formAction] = useFormState<ActionStatus, FormData>(
    createCampaignAction,
    {
      status: 'idle',
      message: '',
    }
  )
  const [showAddNpc, setShowAddNpc] = useState(false)
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
  })

  useEffect(() => {
    if (state.status === 'idle') return
    if (state?.status === 'error') {
      console.log('errors:', state.errors)
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<Inputs>, {
          message: error.message,
        })
      })
    }
  }, [state, setError])

  const hasNPCs = npcOptions && npcOptions.length > 0

  return (
    <form className="flex flex-col w-full max-w-md gap-3">
      <FormInput
        isRequired
        {...register('campaign_name')}
        type="text"
        label="Name"
        variant="bordered"
        name="campaign_name"
        placeholder="name your campaign"
      />
      <ErrorMessage
        errors={errors}
        name="campaign_name"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <Textarea
        {...register('description')}
        name="description"
        label="Description (optional)"
        placeholder="describe your campaign"
        variant="bordered"
      />
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <FormInput
        {...register('start_date')}
        type="date"
        label="Start Date (optional)"
        name="start_date"
        variant="bordered"
        onChange={() => trigger('start_date')}
      />
      <ErrorMessage
        errors={errors}
        name="start_date"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <FormInput
        {...register('end_date')}
        type="date"
        label="End date (optional)"
        name="end_date"
        variant="bordered"
        onChange={() => trigger('end_date')}
      />
      <ErrorMessage
        errors={errors}
        name="end_date"
        render={({ message }) => <ErrorToast text={message} />}
      />

      {hasNPCs && (
        <Button
          onClick={() => setShowAddNpc(!showAddNpc)}
          variant="flat"
          color="secondary"
          startContent={showAddNpc ? '' : <PlusIcon />}
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
              label="npcs"
              name="npc_ids"
              orientation="horizontal"
              ref={ref}
              className="gap-1"
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
        size="sm"
        color="success"
        className="mt-2 font-bold text-large"
      >
        create
      </SubmitButton>
    </form>
  )
}
