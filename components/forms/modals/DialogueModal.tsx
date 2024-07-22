'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogueAction } from '@/actions/db/dialogue';
import { dialogueSchema } from '@/database/drizzle/validation';
import { ErrorMessage } from '@hookform/error-message';

import { DefaultDialogueTypes } from '@/lib/constants';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import { PlusIcon } from '@/components/icons';

type Inputs = z.infer<typeof dialogueSchema>;
export function DialogueModal({
  npcId,
  className,
}: {
  npcId: number;
  className?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(dialogueSchema),
  });

  async function onSubmit(values: z.infer<typeof dialogueSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('npc_id', npcId.toString());
    formData.append('dialogue_type_id', values.dialogue_type_id.toString());
    formData.append('text', values.text);
    const response = await createDialogueAction(formData);
    if (response.status === 'success') {
      onClose();
    } else {
      console.log('error:', response.message);
    }
    setIsSubmitting(false);
    reset();
  }

  return (
    <div className={className}>
      <Button
        onClick={onOpen}
        variant="flat"
        color="success"
        size="sm"
        startContent={<PlusIcon />}
      >
        <span className="tracking-tight">add dialogue</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Dialogue</ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-3 w-full items-start"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input type="hidden" {...register('npc_id')} value={npcId} />
                  <Controller
                    name="dialogue_type_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Type"
                        variant="bordered"
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
                        variant="bordered"
                        isRequired
                      />
                    )}
                  />
                  <ErrorMessage errors={errors} name="text" />

                  <ModalFooter>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      color="success"
                      className="disabled:bg-success/20 disabled:text-opacity-20"
                    >
                      {isSubmitting ? 'adding dialogue...' : 'add dialogue'}
                    </Button>
                    <Button onClick={onClose} color="danger">
                      cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
