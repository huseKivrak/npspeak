import { CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

export function Sidebar({
  campaigns,
  npcs,
}: {
  campaigns: CampaignWithNPCs[];
  npcs: DetailedNPC[];
}) {
  return (
    <div>
      <Autocomplete label="Select an NPC" className="max-w-sm">
        {npcs.map((npc) => (
          <AutocompleteItem
            key={npc.npc_name}
            value={npc.npc_name}
            href={`/npcs/${npc.id}`}
          >
            {npc.npc_name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete label="Select an NPC" className="max-w-sm">
        {campaigns.map((campaign) => (
          <AutocompleteItem
            key={campaign.campaign_name}
            value={campaign.campaign_name}
            href={`/campaigns/${campaign.id}`}
          >
            {campaign.campaign_name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
