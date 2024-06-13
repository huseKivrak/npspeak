import { components, OptionProps } from 'react-select';
import { getAccentEmoji } from '@/utils/helpers/formHelpers';
import { GenderIcon } from '@/components/icons';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/utils/helpers/formHelpers';

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
  props
) => {
  const { label, gender, accent, description, useCase, age } = props.data;

  const genderIcon = GenderIcon(gender);
  const accentEmoji = getAccentEmoji(accent);

  return (
    <components.Option {...props}>
      <div className="flex gap-3 items-center">
        <span className="text-primary text-xl">{label}</span>
        {genderIcon}
        <span className="text-2xl">{accentEmoji}</span>
        {age && <Chip variant="flat">{age}</Chip>}
        {useCase && <Chip variant="flat">{useCase}</Chip>}
        {description && <Chip variant="flat">{description}</Chip>}
      </div>
    </components.Option>
  );
};
