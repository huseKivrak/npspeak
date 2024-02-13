import {getNPCsAction} from '@/server-actions/drizzle';
import NPCCard from '@/components/cards/NPCCard';

export default async function NPCsPage({params}: {params: {username: string}}) {
	const npcs = await getNPCsAction();
	const username = params.username;
	return (
		<div>
			<h1>{username}&apos;s npcs</h1>
			<ul>
				{npcs &&
					npcs.map((n) => (
						<li key={n.npc.id}>
							<NPCCard npcData={n} />
						</li>
					))}
			</ul>
		</div>
	);
}
