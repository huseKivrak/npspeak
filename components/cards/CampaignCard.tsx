'use client';

import { Tables } from '@/types/supabase';
import { useState } from 'react';
import NPCCarousel from '../NPCCarousel';

export default function CampaignCard({
  campaign,
  NPCs,
}: {
  campaign: Tables<'campaigns'>;
  NPCs?: Tables<'npcs'>[] | null;
}) {
  const [showNPCs, setShowNPCs] = useState(false);

  return (
    <div className='card w-72 bg-base-300 shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{campaign.campaign_name}</h2>
        {campaign.description && <p>{campaign.description}</p>}
        <div className='card-actions justify-start'>
          <button
            className='btn btn-ghost font-light text-xs tracking-widest'
            onClick={() => setShowNPCs(!showNPCs)}
          >
            see NPCs
          </button>
          {showNPCs && NPCs && <NPCCarousel NPCs={NPCs} />}
        </div>
      </div>
    </div>
  );
}
