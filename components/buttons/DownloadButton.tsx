import { DialogueRow } from '@/types/drizzle';
import { Button, Tooltip } from '@nextui-org/react';
import { FaDownload } from 'react-icons/fa';

export function DownloadButton({ dialogue }: { dialogue: DialogueRow; }) {
  const handleDownload = () => {
    if (dialogue.audio) {
      const link = document.createElement('a');
      link.href = dialogue.audio;
      link.download = `${dialogue.type}_${dialogue.id}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Tooltip content="Download Audio">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          radius="full"
          onClick={handleDownload}
        >
          <FaDownload size={20} />
        </Button>
      </Tooltip>
    </>
  );
}
