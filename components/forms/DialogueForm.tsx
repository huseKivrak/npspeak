'use client'
import { useEffect } from 'react'
import { useForm, Controller, FieldPath } from 'react-hook-form'
import { useFormState } from 'react-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDialogueAction } from '@/actions/db/dialogue'
import { dialogueSchema } from '@/database/drizzle/validation'
import { SubmitButton } from '@/components/buttons/SubmitButton'
import { ActionStatus } from '@/types/drizzle'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorToast } from '@/components/ErrorToast'
import { DefaultDialogueTypes } from '@/lib/constants'
import { Select, SelectItem, Textarea } from '@nextui-org/react'

type Inputs = z.infer<typeof dialogueSchema>
export const DialogueForm = ({ npcId }: { npcId: number }) => {
  const [state, formAction] = useFormState<ActionStatus, FormData>(
    createDialogueAction,
    {
      status: 'idle',
      message: '',
    }
  )

  const {
    register,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(dialogueSchema),
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
    if (state.status === 'success') {
      reset()
    }
  }, [state, setError, reset])

  return (
    <form className="flex flex-col gap-1 w-4/5 max-w-xs items-start">
      <input type="hidden" {...register('npc_id')} value={npcId} />
      <Controller
        name="dialogue_type_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Dialogue Type"
            className="max-w-xs mt-4"
            variant="bordered"
            labelPlacement="outside"
            isRequired
            {...register('dialogue_type_id')}
            items={DefaultDialogueTypes}
          >
            {(item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        )}
      />
      <ErrorMessage errors={errors} name="dialogue_type_id" />

      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Text"
            className="max-w-xs mt-4"
            variant="bordered"
            labelPlacement="outside"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} name="text" />

      <SubmitButton
        variant="flat"
        color="success"
        formAction={formAction}
        pendingText="adding dialogue..."
      >
        add dialogue
      </SubmitButton>
      {state?.status === 'error' && <ErrorToast text={state.message} />}
    </form>
  )
}
