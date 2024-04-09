'use client';
import {Accordion, AccordionItem} from '@nextui-org/accordion';
import {
	PiMicrophoneBold,
	PiNotePencilBold,
	PiAddressBookBold,
} from 'react-icons/pi';
export const WorkflowAccordian = () => {
	return (
		<Accordion isCompact selectionMode='multiple' variant='splitted'>
			<AccordionItem
				key='1'
				aria-label='1. Create NPC'
				title='1. Create NPC'
				indicator={<PiAddressBookBold size={24} className='text-primary-400' />}
				className='!bg-primary-50 tracking-widest'
			>
				<ul className='flex flex-col jusitfy-start items-start'>
					<li>
						<strong>Hassle-free character creation</strong>: Save the details
						for your character sheet
					</li>
					<li>
						<strong>Select a voice</strong>: Find the perfect voice from 50+
						unique models
					</li>
				</ul>
			</AccordionItem>
			<AccordionItem
				key='2'
				aria-label='2. Add Dialogue'
				title='2. Add Dialogue'
				indicator={<PiNotePencilBold size={24} className='text-primary-600' />}
				className='!bg-primary-100 tracking-widest'
			>
				Just select a dialogue type and add your text. Simple.
			</AccordionItem>

			<AccordionItem
				key='3'
				aria-label='3. Generate Audio'
				title='3. Generate Audio'
				indicator={<PiMicrophoneBold size={24} className='text-primary-700' />}
				className='!bg-primary-200 tracking-widest'
			>
				<span style={{display: 'inline-flex', alignItems: 'center'}}>
					Click the "<PiMicrophoneBold size={18} className='text-success' />"
					next to each dialogue and hear your NPC come to life!
				</span>
			</AccordionItem>
		</Accordion>
	);
};
