'use client';
import { useState } from 'react';
import { useForm, Controller, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNPCAction, updateNPCAction } from '@/actions/db/NPCs';
import { npcSchema } from '@/database/drizzle/validation';
import { CheckboxGroup, Checkbox, Textarea, Button } from '@nextui-org/react';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import ReactSelect from 'react-select';
import { VoiceOption } from './customSelect/VoiceOption';
import { VoiceSingleValue } from './customSelect/VoiceSingleValue';
import { PlusIcon } from '../icons';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorToast } from '@/components/ErrorToast';
import { FormOptions, UpdateNPC } from '@/types/drizzle';
import { FormInput } from './FormInput';
import { VoiceOptionProps } from '@/utils/helpers/formHelpers';

type Inputs = z.infer<typeof npcSchema>;

interface NPCFormProps {
  campaignOptions?: FormOptions;
  voiceOptions: VoiceOptionProps[];
  npcToUpdate?: UpdateNPC;
}

export const NPCForm = ({
  campaignOptions,
  voiceOptions,
  npcToUpdate,
}: NPCFormProps) => {
  const isEditing = Boolean(npcToUpdate);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [selectedVoiceURL, setSelectedVoiceURL] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<VoiceOptionProps[]>(voiceOptions);
  const {
    register,
    control,
    formState: { errors },
    setError,
    reset,
    getValues,
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(npcSchema),
    defaultValues: {
      ...npcToUpdate,
    },
  });

  const hasCampaigns = campaignOptions && campaignOptions.length > 0;

  const onSubmit = async (data: Inputs) => {
    console.log('Submitting');
    const form = document.getElementById('npc-form') as HTMLFormElement;
    const submitter = document.getElementById('npc-form-submit');
    const formData = new FormData(form, submitter); //? benefit of submitter?

    const response =
      isEditing && npcToUpdate
        ? await updateNPCAction(null, formData, npcToUpdate?.npc_id)
        : await createNPCAction(null, formData);

    //only handling errors; redirects if successful
    if (response.status === 'error') {
      if (response.errors) {
        response.errors.forEach((error) => {
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

  const onInvalid = (errors: any) => {
    console.log('field values:', getValues());
    console.log('errors:', errors);
  };

  return (
    <form
      id="npc-form"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      {errors.root?.serverError && (
        <ErrorToast text={errors.root.serverError.message!} />
      )}

      <FormInput
        isRequired
        {...register('npc_name')}
        name="npc_name"
        label="Name"
        defaultValue={npcToUpdate?.npc_name}
        placeholder="what are they called?"
        variant="bordered"
      />
      <ErrorMessage
        errors={errors}
        name="npc_name"
        render={({ message }) => <ErrorToast text={message} />}
      />
      <Textarea
        {...register('description')}
        name="description"
        label="Description (optional)"
        defaultValue={npcToUpdate?.description}
        placeholder="describe your NPC"
        variant="bordered"
        className=" text-2xl"
      />
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => <ErrorToast text={message} />}
      />
      <Controller
        name="voice_id"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, ref, onChange } }) => (
          <ReactSelect
            name={name}
            ref={ref}
            onChange={(value) => {
              onChange(value?.value);
              setSelectedVoiceURL(value?.sampleURL ?? '');
            }}
            components={{
              Option: VoiceOption,
              SingleValue: VoiceSingleValue,
            }}
            placeholder="Select a voice"
            isSearchable={false}
            options={filteredOptions}
            defaultValue={
              isEditing
                ? filteredOptions.find(
                    (option) => npcToUpdate?.voice_id === option.value
                  )
                : null
            }
          />
        )}
      />

      <div className="flex items-center my-4 gap-6">
        <span className="text-secondary font-semibold">Voice Preview:</span>
        <audio src={selectedVoiceURL ?? ''} controls autoPlay={autoplay} />
        <Checkbox
          isSelected={autoplay}
          onValueChange={setAutoplay}
          color="success"
          radius="full"
          size="lg"
        >
          Autoplay
        </Checkbox>
      </div>
      {hasCampaigns && (
        <Button
          onClick={() => setShowAddCampaign(!showAddCampaign)}
          variant="flat"
          color="primary"
          startContent={showAddCampaign ? '' : <PlusIcon />}
        >
          {showAddCampaign ? 'cancel' : 'campaign(s)'}
        </Button>
      )}
      {showAddCampaign && hasCampaigns && (
        <Controller
          name="campaign_ids"
          control={control}
          render={({ field: { ref } }) => (
            <CheckboxGroup
              label="campaigns"
              name="campaign_ids"
              orientation="horizontal"
              ref={ref}
            >
              {campaignOptions.map((option) => (
                <Checkbox
                  key={option.label}
                  value={option.value.toString()}
                  isSelected={npcToUpdate?.campaign_ids?.includes(option.value)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
      )}

      <SubmitButton
        id="npc-form-submit"
        pendingText={isEditing ? 'updating NPC...' : 'creating NPC...'}
        variant="flat"
        color="success"
        className="mt-2 font-bold text-large"
      >
        {isEditing ? 'update' : 'create'}
      </SubmitButton>
    </form>
  );
};
