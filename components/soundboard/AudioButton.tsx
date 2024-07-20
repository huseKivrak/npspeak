import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import {
  FaCirclePlay,
  FaCircleStop,
  FaFileAudio,
  FaRegFileAudio,
} from 'react-icons/fa6';

export function AudioButton({ src }: { src: string }) {
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
    <>
      <Button
        variant="light"
        radius="none"
        size="lg"
        onClick={togglePlayback}
        endContent={isPlaying ? <FaCircleStop /> : <FaVolumeUp />}
      >
        <span className="font-light">Sample</span>
      </Button>
      <audio ref={audioRef} src={src} />
    </>
  );
}
