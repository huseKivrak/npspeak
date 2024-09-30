import { components, SingleValueProps } from 'react-select';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/types/elevenlabs';

interface VoiceSingleValueProps
  extends SingleValueProps<VoiceOptionProps, false> { }

export const VoiceSingleValue: React.FC<VoiceSingleValueProps> = (props) => {
  const { label, accent, description } = props.data;


  return (
    <components.SingleValue {...props}>
      <div className="flex gap-3 md:gap-6 items-center">
        <span className="font-semibold md:font-bold text-secondary text-small md:text-large">
          {label}
        </span>


        {accent && (
          <Chip variant="flat" color="secondary">
            {accent}
          </Chip>
        )}
        {description && (
          <Chip variant="flat" color="primary">
            {description}
          </Chip>
        )}
      </div>
    </components.SingleValue>
  );
};
