'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  AccordionItem,
  Accordion,
} from '@nextui-org/react';

export function VoiceTipsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" variant="light" onPress={onOpen}>
        Additional Tips
      </Button>
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
        <ModalContent className="flex flex-col items-center">
          {(onClose) => (
            <>
              <ModalHeader>Voice Selection Tips</ModalHeader>
              <ModalBody className="text-medium">
                <div className="flex flex-col gap-4">
                  <h2 className="underline ">Accents</h2>
                  <p>
                    While accents only apply to <i>English</i> text, all voice
                    models are <b className="tracking-wider">multilingual</b>!{' '}
                  </p>

                  <p>
                    Dialogue written in one of the 29 supported languages will{' '}
                    <span className="font-semibold">
                      automatically generate audio with a native accent!
                    </span>
                  </p>
                  <Accordion
                    variant="light"
                    isCompact
                    itemClasses={{
                      base: 'py-0 w-fit',
                      heading: 'h-6',
                      title: 'text-small tracking-wide',
                      indicator: 'text-small',
                      content: 'text-xs font-mono',
                    }}
                  >
                    <AccordionItem
                      key="1"
                      aria-label="Supported Languages"
                      title="Supported Languages"
                      motionProps={{
                        variants: {
                          enter: {
                            y: 0,
                            opacity: 1,
                            height: 'auto',
                            transition: {
                              height: {
                                type: 'spring',
                                stiffness: 250,
                                damping: 30,
                                duration: 1,
                              },
                              opacity: {
                                easings: 'ease',
                                duration: 1,
                              },
                            },
                          },
                          exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: {
                                easings: 'ease',
                                duration: 0.25,
                              },
                              opacity: {
                                easings: 'ease',
                                duration: 0.3,
                              },
                            },
                          },
                        },
                      }}
                    >
                      <p>
                        Chinese, Korean, Dutch, Turkish, Swedish, Indonesian,
                        Filipino, Japanese, Ukrainian, Greek, Czech, Finnish,
                        Romanian, Russian, Danish, Bulgarian, Malay, Slovak,
                        Croatian, Classic Arabic, Tamil, English, Polish,
                        German, Spanish, French, Italian, Hindi and Portuguese
                      </p>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="underline">Age</h2>
                  <p></p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
