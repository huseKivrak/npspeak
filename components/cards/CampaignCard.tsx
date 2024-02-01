import { Database, Tables, Enums } from '@/types/supabase';
import { campaigns } from '@/database/drizzle/schema';

export default function CampaignCard({ campaign }: { campaign: Tables<'campaigns'> }) {
  return (
    <div className='card w-72 bg-base-300 shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{campaign.campaign_name}</h2>
        {campaign.description && <p>{campaign.description}</p>}
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>NPCs</button>
        </div>
      </div>
    </div>
  );
}
