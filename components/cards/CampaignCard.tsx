'use client';

import { Database, Tables, Enums } from '@/types/supabase';
import { useState } from 'react';

export default function CampaignCard({
  campaign,
  NPCs,
}: {
  campaign: Tables<'campaigns'>;
  NPCs: Tables<'npcs'>[];
}) {
  const [showNPCs, setShowNPCs] = useState(false);

  return (
    <div className='card w-72 bg-base-300 shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{campaign.campaign_name}</h2>
        {campaign.description && <p>{campaign.description}</p>}
        <div className='card-actions justify-end'>
          <button className='btn btn-primary' onClick={() => setShowNPCs(!showNPCs)}>
            NPCs
          </button>
        </div>
        <ul>
          {showNPCs &&
            NPCs.map((npc, index) => (
              <li key={index}>
                <h4>{npc.npc_name}</h4>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
