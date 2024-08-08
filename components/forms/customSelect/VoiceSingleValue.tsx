import { components, SingleValueProps } from 'react-select';
import { getAccentEmoji } from '@/utils/helpers/formHelpers';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/types/elevenlabs';

interface VoiceSingleValueProps
  extends SingleValueProps<VoiceOptionProps, false> {}

export const VoiceSingleValue: React.FC<VoiceSingleValueProps> = (props) => {
  const { label, accent, useCase, description } = props.data;

  const accentEmoji = getAccentEmoji(accent.toLowerCase());

  return (
    <components.SingleValue {...props}>
      <div className="flex gap-3 md:gap-6 items-center">
        <span className="font-semibold md:font-bold text-secondary text-small md:text-large">
          {label}
        </span>
        <span
          className="
        hidden sm:flex text-small md:text-large"
        >
          {accentEmoji}
        </span>

        {useCase && (
          <Chip variant="flat" color="secondary">
            {useCase}
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
