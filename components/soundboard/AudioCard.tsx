'use client';

//todo: skeletons for loading
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  Skeleton,
} from '@nextui-org/react';
import { cn } from '@/utils/helpers/clsxMerge';
import {
  PiPlayBold as PlayIcon,
  PiPauseBold as PauseIcon,
} from 'react-icons/pi';
import { DialogueIcon } from '../icons';
import { SoundboardDialogue } from '@/types/drizzle';
import { formatTimer } from '@/utils/helpers/formatHelpers';

export const AudioCard = ({
  dialogue,
  id,
}: {
  dialogue: SoundboardDialogue;
  id: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<null | number>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: { dialogue },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState >= 1) {
      if (audio.duration) setDuration(audio.duration);
    }

    const updateProgress = () => {
      const newProgress = (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress(newProgress);
      setCurrentTime(audio.currentTime);
    };

    const onLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
    };

    audio?.addEventListener('loadeddata', onLoadedData);
    audio?.addEventListener('timeupdate', updateProgress);
    audio?.addEventListener('ended', onEnded);

    return () => {
      audio?.removeEventListener('loadeddata', onLoadedData);
      audio?.removeEventListener('timeupdate', updateProgress);
      audio?.removeEventListener('ended', onEnded);
    };
  }, [dialogue.audio]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused || audio.ended) {
        audio.play();
        setIsPlaying(true);
        if (audio.ended) {
          audio.currentTime = 0;
          setProgress(0);
        }
        setIsCompleted(false);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [dialogue.audio]);

  const timeRemaining =
    duration !== null ? formatTimer(duration - currentTime) : '--:--';
  const isPaused = currentTime > 0 && !isPlaying;
  const cardStyles = {
    base: 'flex flex-col justify-center  w-[200px] h-[200px] transition-all ease-in-out duration-300',
    playing: ' scale-105',
    paused: ' scale-105 animate-pulse',
    completed: '',
  };

  const progressStyles = {
    base: 'max-w-md',
    track: 'drop-shadow-md border border-default',
    indicator: '',
    label: 'tracking-wider font-medium ',
    value: '',
  };

  const currentStyle = isPlaying
    ? cardStyles.playing
    : isCompleted
      ? cardStyles.completed
      : isPaused
        ? cardStyles.paused
        : '';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="z-0 list-none"
      onClick={togglePlayPause}
    >
      <Card
        className={cn(cardStyles.base, currentStyle)}
        shadow="lg"
        radius="sm"
      >
        <CardHeader className=" z-10 h-5 justify-end p-1 pb-0">
          <Tooltip
            content={dialogue.type}
            placement="top"
            classNames={{
              content: ['px-2 shadow-none', ' text-lg bg-transparent'],
            }}
          >
            <div className="m-2">
              <DialogueIcon dialogueType={dialogue.type!} size={30} />
            </div>
          </Tooltip>
        </CardHeader>

        <Image
          removeWrapper
          alt="card background"
          className="absolute z-0 w-full h-full object-cover p-2"
          src={isPlaying ? '/images/pause_icon.svg' : '/images/play_icon.svg'}
        />

        <CardBody className="z-10 px-1 overflow-hidden items-center justify-center max-h-24">
          <p className="text-center text-balance text-lg ">{dialogue.text}</p>
        </CardBody>

        <CardFooter className="z-10 bottom-0 gap-1 px-1 my-1">
          <audio ref={audioRef} src={dialogue.audio} preload="auto" />
          <Button
            isIconOnly
            aria-label="play/pause"
            className=" h-6 my-1"
            size="sm"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Progress
            size="lg"
            aria-label="Audio progress"
            value={progress}
            classNames={progressStyles}
          />
          <Chip variant="light">
            <p className="text-secondary">{timeRemaining}</p>
          </Chip>
        </CardFooter>
      </Card>
    </div>
  );
};
