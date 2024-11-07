'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
import { ServerAction } from '@/types/types';
import { useFormState } from 'react-dom';
import { DeleteModalMessages } from '@/lib/constants';
import { IconDelete } from '../../../lib/icons';
import { SubmitButton } from '../../buttons/SubmitButton';

export function DeleteModal({
  id,
  idName,
  serverAction,
  isDisabled,
}: {
  id: number;
  idName: 'npc_id' | 'dialogue_id' | 'campaign_id';
  serverAction: ServerAction;
  isDisabled?: boolean;
}) {
  const [ state, formAction ] = useFormState(serverAction, {
    status: 'idle',
    message: '',
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const modalMessage = DeleteModalMessages[ idName ];
  const title =
    idName === 'npc_id'
      ? 'NPC'
      : idName === 'dialogue_id'
        ? 'Dialogue'
        : 'Campaign';
  const modalTitle = `Delete ${title}?`;
  return (
    <>
      <Tooltip content="Delete">
        <Button
          isIconOnly
          isDisabled={isDisabled}
          variant="light"
          size="lg"
          radius="full"
          color="danger"
          onPress={onOpen}
          aria-label={`Delete ${title}`}
        >
          <IconDelete />
        </Button>
      </Tooltip>
      <Modal
        backdrop="opaque"
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
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{modalMessage}</ModalBody>
              <ModalFooter>
                <form>
                  <input type="hidden" name={idName} value={id} />
                  <SubmitButton
                    pendingText={`Deleting ${title}...`}
                    formAction={formAction}
                    color="danger"
                    className="disabled:bg-danger/20 disabled:text-opacity-20"
                  >
                    Delete
                  </SubmitButton>
                  <Button variant="light" onPress={onClose} className="ml-2">
                    Close
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
