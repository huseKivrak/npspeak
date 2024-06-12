import { components, OptionProps } from 'react-select';
import { getAccentEmoji } from '@/utils/helpers/formHelpers';
import { GenderIcon } from '@/components/icons';
import { Chip } from '@nextui-org/chip';
import { VoiceOptionProps } from '@/utils/helpers/formHelpers';
import { Divider } from '@nextui-org/divider';
export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
  props
) => {
  const { label, gender, accent, description, useCase, age } = props.data;

  const genderIcon = GenderIcon(gender);
  const accentEmoji = getAccentEmoji(accent);

  return (
    <components.Option {...props}>
      <div className="flex gap-5 items-center">
        <span className="text-primary text-xl">{label}</span>
        {genderIcon}
        {age && <Chip variant="flat">{age}</Chip>}
        <span className="text-2xl">{accentEmoji}</span>
        {useCase && <Chip variant="flat">{useCase}</Chip>}
        {description && <Chip variant="flat">{description}</Chip>}
      </div>
    </components.Option>
  );
};
