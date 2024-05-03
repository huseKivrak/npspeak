'use client';

import {useState} from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {AudioCard} from './AudioCard';
import {SoundboardDialogue} from '@/types/drizzle';
export const Soundboard = ({dialogues}: {dialogues: SoundboardDialogue[]}) => {
	const [items, setItems] = useState(dialogues);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const {active, over} = event;

		if (over && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map(
					(i) => i.audio && <AudioCard key={i.id} id={i.id} dialogue={i} />
				)}
			</SortableContext>
		</DndContext>
	);
};
