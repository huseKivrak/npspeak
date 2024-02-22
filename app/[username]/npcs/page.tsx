import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import NPCCard from '@/components/cards/NPCCard';

export default async function NPCsPage({params}: {params: {username: string}}) {
	const npcs = await getNPCsWithRelatedData();
	const username = params.username;
	return (
		<div>
			<h1>{username}&apos;s npcs</h1>
			<ul>
				{npcs &&
					npcs.map((n) => (
						<li key={n.id}>
							<NPCCard npc={n} />
						</li>
					))}
			</ul>
		</div>
	);
}
