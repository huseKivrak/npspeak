import { components, OptionProps } from 'react-select';
import { getAccentEmoji } from '@/utils/helpers/formatHelpers';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/types/elevenlabs';

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
  props
) => {
  const { label, accent, description, useCase } = props.data;

  const accentEmoji = getAccentEmoji(accent.toLowerCase());

  return (
    <components.Option {...props}>
      <div className="flex gap-3 md:gap-6 items-center">
        <span className="text-primary text-small md:text-large">{label}</span>
        <span className="hidden sm:flex text-large ">{accentEmoji}</span>
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
    </components.Option>
  );
};
