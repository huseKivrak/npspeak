'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Divider } from '@nextui-org/react';
import {
  PiMicrophoneBold,
  PiNotePencilBold,
  PiAddressBookBold,
} from 'react-icons/pi';
export const WorkflowAccordian = () => {
  const itemClasses = {
    base: 'py-3 max-w-md sm:max-w-lg w-full',
    title:
      'text-3xl sm:text-4xl  tracking-wider sm:tracking-widest font-semibold',
    trigger: 'px-1 py-1 rounded-sm h-12 flex items-center',
    indicator: 'text-4xl ',
    content: 'sm:text-[20px] text-start pl-2 sm:pl-4 pr-0',
  };

  return (
    <div className="flex flex-col flex-grow gap-4">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
        Character audio in seconds
      </h2>

      <Accordion
        selectionMode="multiple"
        variant="splitted"
        className="py-2 px-0 flex flex-col gap-2 items-center w-full "
        itemClasses={itemClasses}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: 'auto',
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 500,
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
        <AccordionItem
          isCompact
          key="1"
          aria-label="Create NPC"
          title="1. Create NPC"
          startContent={
            <PiAddressBookBold size={36} color="#019cfd" className="mt-2" />
          }
          className=""
        >
          <ul className="flex flex-col gap-2">
            <li>
              <strong className="text-secondary underline">
                Hassle-free setup:
              </strong>{' '}
              Save the details for your character sheet
            </li>
            <li>
              <strong className="text-secondary underline">
                Voice Selection:
              </strong>{' '}
              Find the perfect voice from over 50 options
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          isCompact
          key="2"
          aria-label="Add Dialogue"
          title="2. Add Dialogue"
          startContent={
            <PiNotePencilBold size={36} color="#eeac33" className="mt-2" />
          }
          className=""
        ></AccordionItem>

        <AccordionItem
          isCompact
          key="3"
          aria-label="Generate Audio"
          title="3. Generate Audio"
          startContent={
            <PiMicrophoneBold size={36} color="#56a787" className="mt-2" />
          }
          className=""
        ></AccordionItem>
      </Accordion>
      <Divider className="my-4" />
    </div>
  );
};
