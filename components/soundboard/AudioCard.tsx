'use client';
import {useState, useEffect, useRef} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Progress,
	Button,
	Tooltip,
	Image,
	Chip,
} from '@nextui-org/react';

import {PiPlayBold as PlayIcon, PiPauseBold as PauseIcon} from 'react-icons/pi';
import {DialogueIcon} from '../icons';
import {SoundboardDialogue} from '@/types/drizzle';

export const AudioCard = ({
	dialogue,
	id,
}: {
	dialogue: SoundboardDialogue;
	id: number;
}) => {
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const audioRef = useRef<HTMLAudioElement>(null);

	const {attributes, listeners, setNodeRef, transform, transition} =
		useSortable({id, data: {dialogue}});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	useEffect(() => {
		const audio = audioRef.current;

		const updateProgress = () => {
			if (audio) {
				const value = (audio.currentTime / audio.duration) * 100 || 0;
				setProgress(value);
				setCurrentTime(audio.currentTime);
			}
		};

		const updateDuration = () => {
			if (audio && audio.duration) {
				setDuration(audio.duration);
			}
		};
		audio?.addEventListener('timeupdate', updateProgress);
		audio?.addEventListener('durationchange', updateDuration);

		return () => {
			audio?.removeEventListener('timeupdate', updateProgress);
			audio?.removeEventListener('durationchange', updateDuration);
		};
	}, []);

	const togglePlayPause = () => {
		const audio = audioRef.current;
		if (audio) {
			const isPaused = audio.paused;
			if (isPaused) {
				audio.play();
				setIsPlaying(true);
			} else {
				audio.pause();
				setIsPlaying(false);
			}
		}
	};

	const formatTimer = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};
	const timeRemaining = formatTimer(duration - currentTime);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='z-0 list-none'
			onClick={isReady ? togglePlayPause : () => {}}
		>
			<Card
				isFooterBlurred
				className=' flex flex-col border-none bg-default-100/50 w-[150px] h-[150px] aspect-square'
				shadow='sm'
			>
				<CardHeader className=' z-10 justify-end p-1'>
					<Tooltip
						content={dialogue.type}
						radius='none'
						placement='top'
						classNames={{
							content: ['px-2 shadow-none', 'text-foreground  bg-transparent'],
						}}
					>
						<div>
							<DialogueIcon dialogueType={dialogue.type!} size={24} />
						</div>
					</Tooltip>
				</CardHeader>
				<Image
					removeWrapper
					alt='card background'
					className='absolute z-0 w-full h-full object-cover p-2'
					src={isPlaying ? '/images/pause_icon.svg' : '/images/play_icon.svg'}
				/>
				<CardBody className='z-10 py-0 px-2 overflow-hidden justify-start max-h-18 mb-1'>
					<p className='text-tiny font-semibold text-white'>{`${dialogue.text.slice(
						0,
						150
					)}`}</p>
				</CardBody>

				<CardFooter className='z-10 bottom-0 gap-1 h-8 px-1'>
					<audio
						ref={audioRef}
						src={dialogue.audio}
						preload='metadata'
						onCanPlayThrough={() => setIsReady(true)}
					/>
					<Button
						isIconOnly
						aria-label='play/pause'
						className='bg-secondary-200 h-6'
						size='sm'
					>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</Button>
					<Progress
						size='sm'
						aria-label='Audio progress'
						value={progress}
						classNames={{
							base: 'max-w-md',
							track: 'drop-shadow-md border border-default',
							indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
							label: 'tracking-wider font-medium text-default-600',
							value: 'text-foreground/60',
						}}
					/>
					<Chip variant='light' size='sm'>
						<p className='text-secondary-200 '>{timeRemaining}</p>
					</Chip>
				</CardFooter>
			</Card>
		</div>
	);
};
