import { FormOptions } from '@/types/drizzle';
import { IconBaseProps } from 'react-icons';
import {
  FaRegHandshake,
  FaBook,
  FaRegQuestionCircle,
  FaRegCheckCircle,
  FaExclamation,
  FaAsterisk,
  FaRegHandPeace,
} from 'react-icons/fa';
import { FaMars, FaVenus, FaMarsAndVenus } from 'react-icons/fa6';

interface IconProps {
  icon: React.ComponentType<IconBaseProps>;
  props: IconBaseProps;
}
export const GenderIconMap: { [key: string]: IconProps } = {
  male: {
    icon: FaMars,
    props: {
      size: 12,
      color: '#60a5fa',
    },
  },
  female: {
    icon: FaVenus,
    props: {
      size: 12,
      color: '#f472b6',
    },
  },
  default: {
    icon: FaMarsAndVenus,
    props: {
      size: 12,
      color: '#a78bfa',
    },
  },
};

export const DialogueIconMap: { [key: string]: IconProps } = {
  greeting: {
    icon: FaRegHandshake,
    props: {
      size: 20,
      color: '#f7d599',
    },
  },
  farewell: {
    icon: FaRegHandPeace,
    props: {
      size: 20,
      color: '#fd7e76',
    },
  },
  story: {
    icon: FaBook,
    props: {
      size: 20,
      color: '#56a787',
    },
  },
  question: {
    icon: FaRegQuestionCircle,
    props: {
      size: 20,
      color: '#99d7fe',
    },
  },
  answer: {
    icon: FaRegCheckCircle,
    props: {
      size: 20,
      color: '#019cfd',
    },
  },
  exclamation: {
    icon: FaExclamation,
    props: {
      size: 20,
      color: '#ea9700',
    },
  },
  other: {
    icon: FaAsterisk,
    props: {
      size: 20,
      color: '#efefef',
    },
  },
};

export const DefaultDialogueTypes: FormOptions = [
  { label: 'greeting', value: 1 },
  { label: 'farewell', value: 2 },
  { label: 'story', value: 3 },
  { label: 'other', value: 4 },
  { label: 'question', value: 5 },
  { label: 'answer', value: 6 },
  { label: 'exclamation', value: 7 },
];

export const AudioCardColors: { [key: string]: string } = {
  greeting: 'bg-primary',
  farewell: 'bg-danger',
  story: 'bg-secondary',
  question: 'bg-warning',
  answer: 'bg-primary',
  exclamation: 'bg-warning',
  other: 'bg-default',
};

export const AccentEmojiMap: { [key: string]: string } = {
  american: '🇺🇸',
  'british-essex': '🇬🇧',
  irish: '🇮🇪',
  australian: '🇦🇺',
  british: '🇬🇧',
  'english-swedish': '🇬🇧/🇸🇪',
  'american-swedish': '🇺🇸/🇸🇪',
  'american-irish': '🇺🇸/🇮🇪',
  jolly: '🎅🏼',
  'american-southern': '🇺🇸/🤠',
  'english-italian': '🇬🇧/🇮🇹',
};

export const DeleteModalMessages: { [key: string]: string } = {
  npc_id:
    'Are you sure you want to delete this NPC and all of its dialogue? This action cannot be undone.',
  dialogue_id:
    'Are you sure you want to delete this dialogue and any audio it may have? This action cannot be undone.',
  campaign_id:
    'Are you sure you want to delete this campaign? This action cannot be undone.',
};
