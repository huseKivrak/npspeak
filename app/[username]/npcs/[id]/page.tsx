import NPCCarousel from '@/components/NPCCarousel';
import {db} from '@/database/drizzle';
import {npcs} from '@/database/drizzle/schema';
import {getUserFromSession} from '@/utils/supabase/helpers';
import {redirect} from 'next/navigation';
import {eq} from 'drizzle-orm';

//copy of CampaignDetailPage for testing
export default async function NPCDetailPage({params}: {params: {id: string}}) {
	const user = await getUserFromSession();
	if (!user) redirect('/');

	const routeId = parseInt(params.id);
	const selectedNPC = await db.select().from(npcs).where(eq(npcs.id, routeId));
	console.log('npc details:', selectedNPC);

	if (!selectedNPC) {
		redirect('/npcs');
	}

	return (
		<>
			<NPCCarousel NPCs={selectedNPC} />
		</>
	);
}
