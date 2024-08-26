import { CampaignWithNPCs } from '@/types/drizzle';
import { AccentEmojiMap } from '@/lib/constants';
import { Tables } from '@/types/supabase';

export const transformCampaignOptions = (
  campaigns: CampaignWithNPCs[] | Tables<'campaigns'>[]
) => {
  return campaigns.map((campaign) => ({
    value: campaign.id,
    label: campaign.campaign_name,
  }));
};

export const getAccentEmoji = (accent: string) =>
  AccentEmojiMap[accent.toLowerCase()] || accent.toLowerCase();

export const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};
