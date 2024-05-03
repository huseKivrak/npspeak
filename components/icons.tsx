import {DialogueIconMap, GenderIconMap} from '@/lib/constants';
import {IconSvgProps} from '@/types/types';

export const DialogueIcon = ({
	dialogueType,
	size = 24,
}: {
	dialogueType: string;
	size?: number;
}) => {
	const {icon: DialogueIcon, props} =
		DialogueIconMap[dialogueType] || DialogueIconMap.other;
	return <DialogueIcon {...props} size={size} />;
};

export const GenderIcon = (gender: string, size = 24) => {
	const {icon: GenderIcon, props} =
		GenderIconMap[gender] || GenderIconMap.default;
	return <GenderIcon {...props} size={size} />;
};

export const SendEmailIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xmlSpace='preserve'
		fill='none'
		stroke='currentColor'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='1'
		viewBox='0 0 32 32'
		width={width || size}
		height={size || height}
		{...props}
	>
		<path d='m11 12 10 6 10-6M4 12h7M1 16h11M4 20h7' className='st0' />
		<path
			d='M11 12v-1c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H15c-2.2 0-4-1.8-4-4v-1'
			className='st0'
		/>
	</svg>
);

export const ErrorIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width}
		height={size || height}
		viewBox='0 0 24 24'
		stroke-width='1.5'
		stroke='currentColor'
		fill='none'
		stroke-linecap='round'
		stroke-linejoin='round'
		{...props}
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
		<path d='M12 9v4' />
		<path d='M12 16v.01' />
	</svg>
);

export const PlusIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden='true'
		fill='none'
		focusable='false'
		height={size || height}
		role='presentation'
		viewBox='0 0 24 24'
		width={size || width}
		{...props}
	>
		<g
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		>
			<path d='M6 12h12' />
			<path d='M12 18V6' />
		</g>
	</svg>
);

export const DeleteIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden='true'
		fill='none'
		focusable='false'
		role='presentation'
		viewBox='0 0 20 20'
		height={size || height}
		width={size || width}
		{...props}
	>
		<path
			d='M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		/>
		<path
			d='M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		/>
		<path
			d='M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		/>
		<path
			d='M8.60834 13.75H11.3833'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		/>
		<path
			d='M7.91669 10.4167H12.0834'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
		/>
	</svg>
);

export const ScrollEmojiIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		viewBox='0 0 72 72'
		xmlns='http://www.w3.org/2000/svg'
		width={size || width}
		height={size || height}
		{...props}
	>
		<g id='color'>
			<rect
				x='15.0229'
				y='16.2834'
				width='41.9541'
				height='40.9771'
				fill='#F4AA41'
				stroke='none'
			/>
			<polyline
				fill='#E27022'
				stroke='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
				points='16,55.7479 11,55.9479 11,60.9896 61,60.9896 61,53.9479 56,54.1479'
			/>
			<polyline
				fill='#E27022'
				stroke='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
				points='56,16.2834 61,16.0834 61,11.0417 11,11.0417 11,18.0834 16,17.8834'
			/>
		</g>
		<g id='hair' />
		<g id='skin' />
		<g id='skin-shadow' />
		<g id='line'>
			<polyline
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
				points='16,55.7479 11,55.9479 11,60.9896 61,60.9896 61,53.9479 56,54.1479'
			/>
			<polyline
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
				points='56,16.2834 61,16.0834 61,11.0417 11,11.0417 11,18.0834 16,17.8834'
			/>
			<polyline
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
				points='56,16.2834 34.6258,17.1383 16,17.8834'
			/>
			<line
				x1='16'
				x2='56'
				y1='55.7479'
				y2='54.1479'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='16'
				x2='16'
				y1='22.0023'
				y2='50.0603'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='56'
				x2='56'
				y1='22.0023'
				y2='50.0603'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='20.8523'
				x2='31.8614'
				y1='24.9034'
				y2='24.9034'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='20.8523'
				x2='52.019'
				y1='30.1515'
				y2='30.1515'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='20.8523'
				x2='52.019'
				y1='35.3997'
				y2='35.3997'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='20.8523'
				x2='52.019'
				y1='40.6479'
				y2='40.6479'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
			<line
				x1='20.8523'
				x2='52.019'
				y1='45.896'
				y2='45.896'
				fill='none'
				stroke='#000000'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit='10'
				strokeWidth='2'
			/>
		</g>
	</svg>
);

export const MoonFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden='true'
		focusable='false'
		height={size || height}
		role='presentation'
		viewBox='0 0 24 24'
		width={size || width}
		{...props}
	>
		<path
			d='M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z'
			fill='currentColor'
		/>
	</svg>
);

export const SunFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden='true'
		focusable='false'
		height={size || height}
		role='presentation'
		viewBox='0 0 24 24'
		width={size || width}
		{...props}
	>
		<g fill='currentColor'>
			<path d='M19 12a7 7 0 11-7-7 7 7 0 017 7z' />
			<path d='M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z' />
		</g>
	</svg>
);

export const SearchIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden='true'
		fill='none'
		focusable='false'
		height={size || height}
		width={size || width}
		role='presentation'
		viewBox='0 0 24 24'
		{...props}
	>
		<path
			d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
		/>
		<path
			d='M22 22L20 20'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
		/>
	</svg>
);
