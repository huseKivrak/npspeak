import CampaignCard from '@/components/cards/CampaignCard';
import { db } from '@/database/drizzle';
import { campaigns } from '@/database/drizzle/schema';
import { getUserFromSession } from '@/utils/supabase/helpers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const user = await getUserFromSession();
  if (!user) redirect('/');


  const routeId = parseInt(params.id);
  const data = await db.select().from(campaigns).where(eq(campaigns.id, routeId));
  const campaignDetails = data[0];
  console.log('campaign:', campaignDetails);

  if (!campaignDetails) {
    redirect('/campaigns');
  }

  return (
    <>
      <CampaignCard campaign={campaignDetails} />
    </>
  );
}
