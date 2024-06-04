import { components, OptionProps } from 'react-select'
import { getAccentEmoji } from '@/utils/helpers/formHelpers'
import { GenderIcon } from '@/components/icons'
import { Chip } from '@nextui-org/chip'
import { VoiceOptionProps } from '@/utils/helpers/formHelpers'

export const VoiceOption: React.FC<OptionProps<VoiceOptionProps, false>> = (
  props
) => {
  const { label, gender, accent, description, useCase } = props.data

  const genderIcon = GenderIcon(gender)
  const accentEmoji = getAccentEmoji(accent)

  return (
    <components.Option {...props}>
      <div className="flex gap-5 items-center">
        <span className="text-primary text-xl">{label}</span>
        {genderIcon}
        <span className="text-2xl">{accentEmoji}</span>
        {useCase && (
          <Chip color="primary" variant="flat">
            {useCase}
          </Chip>
        )}
        {description && (
          <Chip color="secondary" variant="flat">
            {description}
          </Chip>
        )}
      </div>
    </components.Option>
  )
}
