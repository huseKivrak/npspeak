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
} from '@nextui-org/react';
import { SoundboardDialogue } from '@/types/drizzle';
import { formatTimer, truncateText } from '@/utils/helpers/formatHelpers';
import { RenderIcon } from '@/utils/renderIcon';

export const AudioCard = ({
  dialogue,
  id,
}: {
  dialogue: SoundboardDialogue;
  id: number;
}) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ duration, setDuration ] = useState<null | number>(null);
  const [ currentTime, setCurrentTime ] = useState(0);

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
  }, [ dialogue.audio ]);

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
  }, [ dialogue.audio ]);

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setProgress(0);
    }
  };

  const timeRemaining =
    duration !== null ? formatTimer(duration - currentTime) : '--:--';
  const isPaused = currentTime > 0 && !isPlaying;

  const cardStyles = {
    base: 'flex flex-col justify-center w-full h-full md:w-[200px] h-[200px] transition-all ease-in-out duration-300',
    playing: '',
    paused: 'animate-[pulse_2s_ease-in-out_infinite] bg-default',
    completed: '',
  };

  const progressStyles = {
    base: 'w-full',
    track: '',
    indicator: "bg-gradient-to-r from-success-600 to-success-400",
    value: '',
  };

  const currentStyle = isPlaying
    ? cardStyles.playing
    : isCompleted
      ? cardStyles.completed
      : isPaused
        ? cardStyles.paused
        : '';

  const imageSrc = isPlaying ? '/images/pause_icon.svg' : '/images/play_icon.svg';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list-none cursor-pointer"
      onClick={togglePlayPause}
    >
      <audio ref={audioRef} src={dialogue.audio} preload="auto" />

      <Card
        className={`${cardStyles.base} ${currentStyle}`}
      >

        <Image
          removeWrapper
          src={imageSrc}
          alt="card background"
          className="absolute z-0 w-full h-full object-cover"
        />


        <CardHeader className="justify-end h-10 pb-0">
          <Tooltip
            content={dialogue.type}
            placement="top"
          >
            <RenderIcon iconName={dialogue.type!} size={32} isDialogue className='opacity-40 mt-2' />
          </Tooltip>
        </CardHeader>

        <CardBody className="pt-0 h-full justify-center ">
          {dialogue.text.length > 50 ?
            <Tooltip
              content={dialogue.text}
              classNames={
                {
                  base: 'max-w-xs',
                  content: 'text-tiny tracking-tight p-4'
                }
              }
            >
              <span className="italic tracking-tight text-tiny font-mono text-default-500">{truncateText(dialogue.text, 50)}</span>
            </Tooltip>
            :
            <span className="text-balance text-tiny font-mono text-default-500">{truncateText(dialogue.text, 75)}</span>
          }
        </CardBody>


        <CardFooter className="py-4 px-2 gap-1">
          <Button
            isIconOnly
            aria-label="reset audio"
            onClick={resetAudio}
            size='sm'
            radius='full'
            variant='light'
          >
            <RenderIcon iconName="IconReset" className='text-2xl' />
          </Button>

          <Progress
            size="lg"
            aria-label="Audio played..."
            value={progress}
            classNames={progressStyles}
          />

          <p className="font-mono">{timeRemaining}</p>

        </CardFooter>
      </Card>
    </div>
  );
};
