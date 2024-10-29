import { FormOptions } from '@/types/types';

export const DefaultDialogueTypes: FormOptions = [
  { label: 'greeting', value: 1 },
  { label: 'farewell', value: 2 },
  { label: 'story', value: 3 },
  { label: 'other', value: 4 },
  { label: 'question', value: 5 },
  { label: 'answer', value: 6 },
  { label: 'exclamation', value: 7 },
];

export const DeleteModalMessages: { [key: string]: string } = {
  npc_id:
    'Are you sure you want to delete this NPC and all of its dialogue? This action cannot be undone.',
  dialogue_id:
    'Are you sure you want to delete this dialogue and any audio it may have? This action cannot be undone.',
  campaign_id:
    'Are you sure you want to delete this campaign? This action cannot be undone.',
};

export interface DemoFile {
  file: string;
  iconName: string;
  iconStyle?: string;
  name: string;
  text: string;
}

export const MultilingualFiles: DemoFile[] = [
  {
    file: '/audio/english.mp3',
    iconName: 'IconUKFlag',
    name: 'english',
    text: 'Time heals all wounds.',
  },
  {
    file: '/audio/spanish.mp3',
    iconName: 'IconSpainFlag',
    name: 'spanish',
    text: 'El tiempo lo cura todo.',
  },
  {
    file: '/audio/turkish.mp3',
    iconName: 'IconTurkeyFlag',
    name: 'turkish',
    text: 'Zaman her şeyin ilacı.',
  },
];

export const ContextualAwarenessFiles: DemoFile[] = [
  {
    file: '/audio/lovelies.mp3',
    iconName: 'IconFaceKissWinkHeart',
    iconStyle: 'text-primary',
    name: 'pleasant',
    text: 'Hello my little lovelies!',
  },
  {
    file: '/audio/oops.mp3',
    iconName: 'IconFaceGrinSweat',
    iconStyle: 'text-success',
    name: 'cheeky',
    text: 'Oops, did I say hex? I meant... blessing!',
  },
  {
    file: '/audio/dare.mp3',
    iconName: 'IconFaceAngry',
    iconStyle: 'text-danger',
    name: 'angry',
    text: 'How DARE you!',
  },
];

export const ModelFiles: DemoFile[] = [
  {
    file: '/audio/carmen.mp3',
    iconName: 'IconHatWizard',
    iconStyle: 'text-primary',
    name: 'carmen',
    text: 'Perhaps a gluten-free potion would help?',
  },
  {
    file: '/audio/doktor.mp3',
    iconName: 'IconExperiment',
    iconStyle: 'text-success',
    name: 'doktor',
    text: 'With an intellect as marvelous as my own, hygiene is of no import.',
  },
  {
    file: '/audio/demon.mp3',
    iconName: 'IconEmoticonDevilOutline',
    iconStyle: 'text-danger',
    name: 'demon',
    text: "I don't 'just collect souls'.... I also collect Pokémon cards.",
  },
];

export const SupportedLanguages =
  'English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian, Russian, Hungarian, Norwegian, Vietnamese';
