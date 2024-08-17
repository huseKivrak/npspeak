'use client';

import { useForm, Controller, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNPCAction, updateNPCAction } from '@/actions/db/NPCs';
import { Textarea, Input, Select, SelectItem, Button } from '@nextui-org/react';
import { npcSchema } from '@/database/drizzle/validation';
import { FormOptions, UpdateNPC } from '@/types/drizzle';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { useState } from 'react';
import { VoiceGrid } from '../voices/VoiceGrid';
import { VoiceFilter } from '../voices/VoiceFilter';

type Inputs = z.infer<typeof npcSchema>;

interface NPCFormProps {
  campaignOptions: FormOptions;
  voiceOptions: VoiceOptionProps[];
  npcToUpdate?: UpdateNPC;
}

export const NPCForm = ({
  campaignOptions,
  voiceOptions,
  npcToUpdate,
}: NPCFormProps) => {
  const [filteredVoices, setFilteredVoices] =
    useState<VoiceOptionProps[]>(voiceOptions);

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(npcSchema),
    defaultValues: {
      ...npcToUpdate,
    },
  });

  const watchVoiceId = watch('voice_id');
  const getVoiceLabel = (voiceId: string | undefined) => {
    if (!voiceId) return '';
    const selectedVoice = voiceOptions.find((v) => v.value === voiceId);
    return selectedVoice ? selectedVoice.label : '';
  };

  const isEditing = !!npcToUpdate;
  const hasCampaigns = campaignOptions && campaignOptions.length > 0;

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append('npc_name', data.npc_name);
    formData.append('description', data.description || '');
    formData.append('voice_id', data.voice_id);
    console.log('FORM DATA', formData);

    if (data.campaign_ids) {
      data.campaign_ids.forEach((id) =>
        formData.append('campaign_ids', id.toString())
      );
    }

    const response =
      isEditing && npcToUpdate
        ? await updateNPCAction(formData, npcToUpdate?.npc_id)
        : await createNPCAction(formData);

    //only handling errors; redirects if successful
    if (response.status === 'error') {
      console.log('ERROR:', response.errors);
      if (response.errors) {
        response.errors.forEach((error) => {
          console.log('error', error);
          setError(error.path as FieldPath<Inputs>, {
            message: error.message,
          });
        });
      } else {
        //non-validation server errors
        setError('root.serverError', {
          type: 'serverError',
          message: response.message,
        });
      }
    }
  };

  return (
    <form
      id="npc-form"
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap gap-4">
        <Input
          isRequired
          {...register('npc_name')}
          name="npc_name"
          label="name"
          defaultValue={npcToUpdate?.npc_name}
          className="max-w-[250px]"
          placeholder=" "
          size="sm"
          isInvalid={!!errors.npc_name}
          errorMessage={errors.npc_name?.message}
          variant="flat"
          classNames={{
            inputWrapper: 'h-[64px] font-mono',
            label: 'text-md',
          }}
        />
        <Textarea
          {...register('description')}
          name="description"
          label="description"
          defaultValue={npcToUpdate?.description}
          placeholder=" "
          className="max-w-[250px]"
          size="sm"
          minRows={1}
          maxRows={3}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          classNames={{
            innerWrapper: 'h-fit',
            label: 'font-mono text-md',
          }}
        />
        <Input
          isClearable
          readOnly
          onClear={() => {
            setValue('voice_id', '');
          }}
          label="voice"
          defaultValue={getVoiceLabel(npcToUpdate?.voice_id)}
          value={getVoiceLabel(watchVoiceId)}
          className="max-w-[250px]"
          isInvalid={!!errors.voice_id}
          errorMessage={errors.voice_id?.message}
          classNames={{
            input: 'text-foreground-500',
            label: 'font-mono text-md text-default-600',
          }}
        />

        {hasCampaigns && (
          <Controller
            name="campaign_ids"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Select
                {...field}
                selectionMode="multiple"
                label="add to campaign(s)"
                color="secondary"
                variant="flat"
                className="max-w-[250px]"
                size="sm"
                onSelectionChange={(keys) => {
                  onChange(Array.from(keys).map(Number));
                }}
                isInvalid={!!errors.campaign_ids}
                errorMessage={errors.campaign_ids?.message}
                classNames={{
                  label: 'font-mono text-sm',
                }}
              >
                {campaignOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        )}
      </div>

      <div className="space-y-4">
        <VoiceFilter voices={voiceOptions} onFilterChange={setFilteredVoices} />

        <Controller
          name="voice_id"
          control={control}
          render={({ field }) => (
            <VoiceGrid
              {...field}
              voices={filteredVoices}
              onSelectVoice={(selectedVoiceId) => {
                field.onChange(selectedVoiceId);
              }}
              selectedVoiceId={field.value}
            />
          )}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
