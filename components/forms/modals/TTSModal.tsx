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
import { useFormState } from 'react-dom';
import ttsHandler from '@/actions/ttsHandler';
import { PiMicrophoneBold } from 'react-icons/pi';
import { SubmitButton } from '../../buttons/SubmitButton';

//todo: refactor
export function TTSModal({
  dialogueId,
  text,
  voiceId,
  npcId,
}: {
  dialogueId: number;
  text: string;
  voiceId: string;
  npcId: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const [ state, formAction ] = useFormState(ttsHandler, {
    status: 'idle',
    message: '',
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Create Audio">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          radius="full"
          color="success"
          onPress={onOpen}
          aria-label="Create Dialogue Audio"
        >
          <PiMicrophoneBold size={24} />
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
                Create Dialogue Audio
              </ModalHeader>
              <ModalBody>Create audio for this dialogue?</ModalBody>
              <ModalFooter>
                <form>
                  <input type="hidden" name="dialogue_id" value={dialogueId} />
                  <input type="hidden" name="text" value={text} />
                  <input type="hidden" name="npc_id" value={npcId} />
                  <input type="hidden" name="voice_id" value={voiceId} />

                  <Button color="success" variant="light" onPress={onClose}>
                    Close
                  </Button>

                  <SubmitButton
                    formAction={formAction}
                    pendingText="Creating Audio..."
                    className="bg-success disabled:bg-success/20 disabled:text-opacity-20"
                  >
                    Create!
                  </SubmitButton>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
