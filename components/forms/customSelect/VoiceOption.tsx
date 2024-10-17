import { components, OptionProps } from 'react-select';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/types/elevenlabs';

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
  props
) => {
  const { label, accent, description } = props.data;



  return (
    <components.Option {...props}>
      <div className="flex gap-3 md:gap-6 items-center">
        <span className="text-primary text-small md:text-large">{label}</span>
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
    </components.Option>
  );
};
