'use client';

import { useForm, Controller, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNPCAction, updateNPCAction } from '@/actions/db/NPCs';
import {
  Textarea,
  Input,
  Select,
  SelectItem,
  Button,
  Chip,
} from '@nextui-org/react';
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
  const [ filteredVoices, setFilteredVoices ] =
    useState<VoiceOptionProps[]>(voiceOptions);

  const [ isSubmitting, setIsSubmitting ] = useState(false);

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
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('npc_name', data.npc_name);
    formData.append('description', data.description || '');
    formData.append('voice_id', data.voice_id);

    //! fix for NextUI multi-select bugs
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
    setIsSubmitting(false);
  };

  return (
    <div className='flex flex-col w-full gap-4'>
      <h1>create an NPC</h1>
      <p className='text-lg lg:text-3xl font-mono'>

      </p>

      <form
        id="npc-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Left Column */}
          <div className="flex flex-col w-full md:w-1/4 gap-6 ">

            <div className='w-full relative space-y-8'>
              <Input
                isRequired
                {...register('npc_name')}
                name="npc_name"
                label="name"
                defaultValue={npcToUpdate?.npc_name}
                className="w-full"
                placeholder=" "
                size="sm"
                isInvalid={!!errors.npc_name}
                errorMessage={
                  errors.npc_name?.message === 'Required'
                    ? 'your NPC needs a name!'
                    : errors.npc_name?.message
                }
                variant="flat"
                classNames={{
                  inputWrapper: 'h-[64px] font-mono',
                }}
              />
              <Textarea
                {...register('description')}
                name="description"
                label="description"
                defaultValue={npcToUpdate?.description}
                placeholder=" "
                className="w-full"
                size="sm"
                minRows={2}
                maxRows={4}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                classNames={{
                  innerWrapper: 'h-fit',
                  label: 'font-mono',
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
                      placeholder=" "
                      variant="bordered"
                      size="sm"
                      isMultiline={true}
                      onSelectionChange={(keys) => {
                        onChange(Array.from(keys).map(Number));
                      }}
                      isInvalid={!!errors.campaign_ids}
                      errorMessage={errors.campaign_ids?.message}
                      classNames={{
                        base: 'w-full',
                        label: 'font-mono',
                        innerWrapper: 'h-fit',
                        trigger: 'min-h-12 py-2',
                      }}
                      popoverProps={{
                        classNames: {},
                      }}
                      renderValue={(selected) => {
                        return (
                          <div className="flex flex-wrap gap-2">
                            {selected.map((item) => (
                              <Chip
                                key={item.key}
                                color="secondary"
                                size="sm"
                                variant="flat"
                                className="text-xs"
                              >
                                {item.textValue}
                              </Chip>
                            ))}
                          </div>
                        );
                      }}
                    >
                      {campaignOptions.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          textValue={item.label}
                          className="tracking-tighter"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              )}


              <Input
                isRequired
                isClearable
                readOnly
                onClear={() => {
                  setValue('voice_id', '');
                }}
                label="selected voice"
                size="lg"
                placeholder=' '
                defaultValue={getVoiceLabel(npcToUpdate?.voice_id)}
                value={getVoiceLabel(watchVoiceId)}
                isInvalid={!!errors.voice_id}
                isDisabled={!watchVoiceId}
                errorMessage={
                  errors.voice_id?.message === 'Required'
                    ? 'your NPC needs a voice!'
                    : errors.voice_id?.message
                }
                classNames={{
                  base: 'w-full opacity-100',
                  input: [
                    'group-data-[has-value=true]:text-warning',
                    'font-mono',
                    'font-semibold',
                    'lowercase',
                    'tracking-wider',
                  ],
                  label: 'font-mono text-foreground/60',
                }}

              />

              <Button
                type="submit"
                color="success"
                size="lg"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'creating...' : 'create!'}
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-full md:w-3/4 space-y-6">
            <VoiceFilter
              voices={voiceOptions}
              onFilterChange={setFilteredVoices}
            />

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
        </div>
      </form>
    </div>
  );
};
