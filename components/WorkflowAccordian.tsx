'use client';
import {Accordion, AccordionItem} from '@nextui-org/accordion';
import {
	PiMicrophoneBold,
	PiNotePencilBold,
	PiAddressBookBold,
} from 'react-icons/pi';
export const WorkflowAccordian = () => {
	const itemClasses = {
		base: 'py-4 w-full',
		title: 'tracking-widest text-xl',
		trigger: 'px-2 py-2 rounded-sm h-18 flex items-center',
		indicator: 'text-3xl',
		content: 'px-2 text-large text-start',
	};

	return (
		<div className='flex flex-col items-start'>
			<h2 className='text-2xl sm:text-4xl text-foreground'>
				Character audio in 3 easy steps
			</h2>

			<Accordion
				keepContentMounted
				selectionMode='multiple'
				variant='splitted'
				className='p-2 flex flex-col gap-2 w-full max-w-lg'
				itemClasses={itemClasses}
			>
				<AccordionItem
					key='1'
					aria-label='Create NPC'
					title='1. Create NPC'
					startContent={
						<PiAddressBookBold size={24} className='text-primary' />
					}
					className='!bg-warning tracking-widest'
				>
					<ul className='gap-y-8'>
						<li>
							<strong>Hassle-free setup</strong>: Leave the details for your
							character sheet
						</li>
						<li>
							<strong>Voice selection</strong>: Find the perfect voice from 50+
							unique models
						</li>
					</ul>
				</AccordionItem>
				<AccordionItem
					key='2'
					aria-label='Add Dialogue'
					title='2. Add Dialogue'
					startContent={<PiNotePencilBold size={24} className='text-primary' />}
					className='!bg-warning'
				>
					<p>Just select the dialogue type and add your text. Simple.</p>
				</AccordionItem>

				<AccordionItem
					key='3'
					aria-label='Generate Audio'
					title='3. Generate Audio'
					startContent={<PiMicrophoneBold size={24} className='text-primary' />}
					className='!bg-warning'
				></AccordionItem>
			</Accordion>
		</div>
	);
};
