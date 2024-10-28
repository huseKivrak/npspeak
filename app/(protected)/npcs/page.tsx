import { getAllDetailedNPCs } from '@/database/drizzle/queries';
import { NPCListTable } from '@/components/tables/NPCListTable';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function NPCsPage() {
  const { user } = await getUserProfile();
  if (!user) redirect('/login');

  const npcResponse = await getAllDetailedNPCs(user.id);
  const npcs = npcResponse.status === 'success' ? npcResponse.data : [];

  return (
    <div>
      <NPCListTable npcs={npcs} />
    </div>
  );
}
