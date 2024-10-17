import React from 'react';
import {
  IconUKFlag,
  IconSpainFlag,
  IconTurkeyFlag,
  IconFaceKissWinkHeart,
  IconFaceGrinSweat,
  IconFaceAngry,
  IconHatWizard,
  IconExperiment,
  IconEmoticonDevilOutline,
  IconSendEmail,
  IconError,
  IconPlus,
  IconDelete,
  IconScrollEmoji,
  IconSearch,
  IconMoonFilled,
  IconSunFilled,
  IconGlobe,
  IconWand,
  IconBrain,
  IconReset,
} from '@/lib/icons';

import {
  FaAsterisk,
  FaBook,
  FaExclamation,
  FaRegHandPeace,
  FaRegHandshake,
  FaRegCircleCheck,
  FaRegCircleQuestion,
} from 'react-icons/fa6';

export interface IconMapType {
  [key: string]: React.ElementType;
}

export const iconMap: IconMapType = {
  IconUKFlag,
  IconSpainFlag,
  IconTurkeyFlag,
  IconFaceKissWinkHeart,
  IconFaceGrinSweat,
  IconFaceAngry,
  IconHatWizard,
  IconExperiment,
  IconEmoticonDevilOutline,
  IconSendEmail,
  IconError,
  IconPlus,
  IconDelete,
  IconScrollEmoji,
  IconSearch,
  IconMoonFilled,
  IconSunFilled,
  IconGlobe,
  IconBrain,
  IconWand,
  IconReset,
  greeting: FaRegHandshake,
  farewell: FaRegHandPeace,
  story: FaBook,
  question: FaRegCircleQuestion,
  answer: FaRegCircleCheck,
  exclamation: FaExclamation,
  other: FaAsterisk,
};
