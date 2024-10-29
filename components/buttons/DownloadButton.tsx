import { DialogueRow } from '@/types/types';
import { Button, Tooltip } from '@nextui-org/react';
import { FaDownload } from 'react-icons/fa';

export function DownloadButton({ dialogue }: { dialogue: DialogueRow; }) {
  const handleDownload = () => {
    if (dialogue.audio) {
      window.open(dialogue.audio, '_blank');
    }
  };

  return (
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

  );
}
