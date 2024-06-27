'use client';
import { useState } from 'react';
import { useForm, Controller, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNPCAction, updateNPCAction } from '@/actions/db/NPCs';
import { npcSchema } from '@/database/drizzle/validation';
import {
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
  Input,
  Divider,
} from '@nextui-org/react';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import ReactSelect from 'react-select';
import { VoiceOption } from './customSelect/VoiceOption';
import { VoiceSingleValue } from './customSelect/VoiceSingleValue';
import { PlusIcon } from '../icons';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorToast } from '@/components/ErrorToast';
import { FormOptions, UpdateNPC } from '@/types/drizzle';
import { VoiceLabelFilter } from './customSelect/VoiceLabelFilter';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceTipsModal } from './modals/VoiceTipsModal';

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

  const [selectedVoiceURL, setSelectedVoiceURL] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);
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

  const handleFilteredOptions = (filteredOptions: VoiceOptionProps[]) => {
    setFilteredOptions(filteredOptions);
  };

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
    <div className="flex w-full">
      <form
        id="npc-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col gap-4 w-full border rounded-3xl p-4"
      >
        {errors.root?.serverError && (
          <ErrorToast text={errors.root.serverError.message!} />
        )}

        <Input
          isRequired
          {...register('npc_name')}
          name="npc_name"
          label="Name"
          defaultValue={npcToUpdate?.npc_name}
          placeholder="what are they called?"
          variant="bordered"
          labelPlacement="outside"
          className="w-full max-w-xl"
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
          labelPlacement="outside"
          minRows={3}
          className="w-full max-w-xl"
        />
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => <ErrorToast text={message} />}
        />

        {hasCampaigns && (
          <Controller
            name="campaign_ids"
            control={control}
            render={({ field: { ref } }) => (
              <CheckboxGroup
                name="campaign_ids"
                label="Add to Campaign(s)"
                orientation="vertical"
                radius="full"
                ref={ref}
              >
                {campaignOptions.map((option) => (
                  <Checkbox
                    key={option.label}
                    value={option.value.toString()}
                    isSelected={npcToUpdate?.campaign_ids?.includes(
                      option.value
                    )}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          />
        )}

        <Divider className="my-2" />

        <div className="flex w-full">
          <div className="flex flex-col w-1/3 gap-3 tracking-wider text-medium">
            <div className="flex  flex-col gap-2 text-large">
              <h3 className="underline underline-offset-4 font-semibold">
                Voice Selection:
              </h3>
              <p>Find the perfect voice for your character!</p>
            </div>
            <ul className="list-disc list-inside ">
              <li>
                Browse all voices below or use the filter to search by tag.
              </li>
              <li>Listen to some sample audio using the voice preview.</li>
            </ul>
            {/* <VoiceTipsModal /> */}
          </div>

          <div className="flex-1 w-2/3">
            <VoiceLabelFilter
              voiceOptions={voiceOptions}
              onFilterChange={handleFilteredOptions}
            />
            <div className="flex items-center justify-evenly space-x-2">
              <Controller
                name="voice_id"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, ref, onChange } }) => (
                  <ReactSelect
                    name={name}
                    aria-label="voice selection"
                    ref={ref}
                    onChange={(value) => {
                      onChange(value?.value);
                      setSelectedVoiceURL(value?.sampleURL ?? '');
                    }}
                    components={{
                      Option: VoiceOption,
                      SingleValue: VoiceSingleValue,
                    }}
                    placeholder={`Select from ${filteredOptions.length} voices`}
                    isSearchable={false}
                    options={filteredOptions}
                    defaultValue={null}
                    className="w-full max-w-lg"
                  />
                )}
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <p className="font-semibold text-medium">Voice Preview</p>
                </div>
                <div className="flex space-x-2">
                  <audio
                    src={selectedVoiceURL ?? ''}
                    controls
                    autoPlay={autoplay}
                  />
                  <Checkbox
                    isSelected={autoplay}
                    onValueChange={setAutoplay}
                    color="success"
                    radius="full"
                    size="lg"
                    className="z-0"
                  >
                    Autoplay
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-2" />

        <SubmitButton
          id="npc-form-submit"
          pendingText="creating NPC..."
          variant="flat"
          color="success"
          className="mt-2 font-bold text-large"
        >
          Create!
        </SubmitButton>
      </form>
    </div>
  );
};
