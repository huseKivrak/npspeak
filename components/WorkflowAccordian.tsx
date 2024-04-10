'use client';
import {Accordion, AccordionItem} from '@nextui-org/accordion';
import {
	PiMicrophoneBold,
	PiNotePencilBold,
	PiAddressBookBold,
} from 'react-icons/pi';
export const WorkflowAccordian = () => {
	const itemClasses = {
		base: 'py-0 w-full ',
		title: 'font-normal text-medium',
		trigger: 'px-2 py-0 rounded-lg h-14 flex items-center',
		indicator: 'text-medium',
		content: 'text-small px-2 text-start',
	};

	return (
		<div>
			<h2 className='text-2xl my-4'>Character audio in 3 easy steps</h2>

			<Accordion
				keepContentMounted
				selectionMode='multiple'
				variant='splitted'
				className='p-1 flex flex-col gap-1 w-full'
				itemClasses={itemClasses}
			>
				<AccordionItem
					key='1'
					aria-label='Create NPC'
					title='Create NPC'
					startContent={
						<PiAddressBookBold size={24} className='text-primary-400' />
					}
					className='!bg-primary-50 tracking-widest'
				>
					<div className='flex flex-col'>
						<ul className='gap-y-8'>
							<li>
								<strong>Hassle-free setup</strong>: Leave the details for your
								character sheet
							</li>
							<li>
								<strong>Voice selection</strong>: Find the perfect voice from
								50+ unique models
							</li>
						</ul>
					</div>
				</AccordionItem>
				<AccordionItem
					key='2'
					aria-label='Add Dialogue'
					title='Add Dialogue'
					startContent={
						<PiNotePencilBold size={24} className='text-primary-600' />
					}
					className='!bg-primary-100 tracking-widest'
				>
					<div className=''>
						<p>Just select the dialogue type and add your text. Simple.</p>
					</div>
				</AccordionItem>

				<AccordionItem
					key='3'
					aria-label='Generate Audio'
					title='Generate Audio'
					startContent={
						<PiMicrophoneBold size={24} className='text-primary-700' />
					}
					className='!bg-primary-200 tracking-widest'
				>
					<div className=''>
						<span style={{display: 'inline-flex', alignItems: 'center'}}>
							Click the "<PiMicrophoneBold size={18} className='text-success' />
							" next to each dialogue and hear your NPC come to life!
						</span>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
