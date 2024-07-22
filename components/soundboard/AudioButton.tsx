import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import {
  FaCirclePlay,
  FaCircleStop,
  FaFileAudio,
  FaRegFileAudio,
} from 'react-icons/fa6';

export function AudioButton({ src, label }: { src: string; label?: string }) {
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
    <div className="flex items-center justify-center">
      <Button
        isIconOnly
        variant="light"
        radius="full"
        size="lg"
        onClick={togglePlayback}
        endContent={isPlaying ? <FaCircleStop /> : <FaVolumeUp />}
      >
        {label && <span className="font-light">{label}</span>}
      </Button>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
