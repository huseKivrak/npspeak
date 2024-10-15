import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { FaCircleStop } from 'react-icons/fa6';

export function AudioButton({
  src,
  ...props
}: {
  src: string;
  [ key: string ]: any;
}) {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      const playbackAction = isPlaying ? audioRef.current.pause() : audioRef.current.play();

      if (!isPlaying) {
        (playbackAction as Promise<void>)
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Playback error:', error);
          });
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [ src ]);

  return (
    <Button
      isIconOnly={props.isIconOnly ?? true}
      variant={props.variant ?? 'light'}
      onClick={togglePlayback}
      className={props.className}
      radius={props.radius ?? 'full'}
      color={props.color ?? 'warning'}
      endContent={
        isPlaying ? <FaCircleStop size={28} /> : <FaVolumeUp size={28} />
      }
    >
      <audio ref={audioRef} src={src} />
    </Button>
  );
}
