import Link from 'next/link';

export default function Sidebar({children}: {children: React.ReactNode}) {
	return (
		<div className='drawer md:drawer-open'>
			<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col items-center justify-center px-8'>
				{children}
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-2'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<ul className='menu p-2 max-w-fit min-h-full bg-secondary text-base-content'>
					{/* Sidebar content here */}
					<li>
						<Link href='/npcs'>NPCs</Link>
					</li>
					<li>
						<Link href='/npcs/create'>Create NPC</Link>
					</li>
					<li>
						<Link href='/campaigns'>Campaigns</Link>
					</li>
					<li>
						<Link href='/campaigns/create'>Create Campaign</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
