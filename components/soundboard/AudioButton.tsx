import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { FaCircleStop } from 'react-icons/fa6';

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
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onClick={togglePlayback}
      className="p-0 m-0"
    >
      {isPlaying ? <FaCircleStop /> : <FaVolumeUp />}
      <audio ref={audioRef} src={src} />
    </Button>
  );
}
