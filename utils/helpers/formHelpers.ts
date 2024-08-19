import { CampaignWithNPCs } from '@/types/drizzle';
import { AccentEmojiMap } from '@/lib/constants';

export const transformCampaignOptions = (campaigns: CampaignWithNPCs[]) => {
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
