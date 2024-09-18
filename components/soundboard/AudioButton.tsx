import { cn } from '@/utils/helpers/clsxMerge';
import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { FaCircleStop } from 'react-icons/fa6';

export function AudioButton({
  src,
  className,
}: {
  src: string;
  label?: string;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={togglePlayback}
      className={cn('', className)}
      size="sm"
      radius="full"
      color="primary"
      endContent={
        isPlaying ? <FaCircleStop size={24} /> : <FaVolumeUp size={24} />
      }
    >
      <audio ref={audioRef} src={src} />
    </Button>
  );
}
