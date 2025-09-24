import { GIT_COLORS, IFormatOption } from "@/lib/data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	DndContext,
	DragCancelEvent,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DragIcon, RemoveIcon } from "./Icons";
import { useCallback, useState, useMemo } from "react";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";

export const GIT_COLOR_MAP = Object.fromEntries(GIT_COLORS.map((c) => [c.value, c.tailwindColor]));

const tailWindColor = (color?: string) => GIT_COLOR_MAP[color as string] ?? "";

export function SimpleSortableItem({
	id,
	option,
	changeColor,
	remove,
	isOverlay,
	...props
}: {
	id: string;
	option: IFormatOption;
	changeColor?: (id: string, color: string) => void;
	remove?: (id: string) => void;
	isOverlay?: boolean;
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
	});

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		boxShadow: isOverlay ? "0px 10px 10px rgba(0,0,0,0.4)" : "none",
		opacity: isDragging ? 0 : 1,
		zIndex: isDragging ? 1 : "auto",
	};
	const colors = useMemo(() => GIT_COLORS, []);
	return (
		<div
			{...props}
			ref={setNodeRef}
			style={style}
			className={`flex items-center justify-between p-2 rounded-md border  cursor-grab bg-white `}
		>
			<div className="flex items-center gap-3">
				<Button
					{...attributes}
					{...listeners}
					onClick={() => {
						alert("clicked remove button");
						console.log("cliced remove");
					}}
					variant={"ghost"}
					className="cursor-pointer"
				>
					<DragIcon />
				</Button>
				<span className={`font-mono px-2 font-bold text-${tailWindColor(option.color)}`}>
					{option.name}
				</span>
				<span className={`text-sm text-gray-600`}>{option.description}</span>
			</div>
			<div className="flex items-center gap-2">
				{option.name !== " " && (
					<Select
						value={option.color}
						onValueChange={(value) => {
							changeColor?.(option.id, value);
						}}
						onOpenChange={() => {
							console.log("cliced select");
						}}
						defaultValue={option.color}
					>
						<SelectTrigger
							className={`w-[120px] 
                                text-${tailWindColor(option.color)} 
                                border-${tailWindColor(option.color)}
                                [&_svg]:!text-${tailWindColor(option.color)} [&_svg]:!opacity-100`}
						>
							<SelectValue placeholder="Select a Color" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Colors</SelectLabel>
								{colors.map((color) => (
									<SelectItem key={color.value} value={color.value}>
										{color.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
				<Button
					onClick={() => {
						remove?.(option.id);
					}}
					variant={"destructive"}
					className="cursor-pointer text-gray-600  hover:text-gray-700"
				>
					<RemoveIcon />
				</Button>
			</div>
		</div>
	);
}

const SortableFormat = ({
	selectedOptions,
	setSelectedOptions,
	remove,
	changeColor,
}: {
	selectedOptions: IFormatOption[];
	setSelectedOptions: (...items: any) => void;
	changeColor: (id: string, color: string) => void;
	remove: (id: string) => void;
}) => {
	const itemIds = useMemo(
		() => selectedOptions.map((i: IFormatOption) => i.id),
		[selectedOptions],
	);
	const [activeItem, setActiveItem] = useState<IFormatOption>();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const { active } = event;
			setActiveItem(() => selectedOptions.find((i) => i.id === active.id));
		},
		[selectedOptions],
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			if (over && active.id !== over.id) {
				setSelectedOptions((prev: IFormatOption[]) => {
					const oldIndex = prev.findIndex((i) => i.id === active.id);
					const newIndex = prev.findIndex((i) => i.id === over.id);
					return arrayMove(prev, oldIndex, newIndex);
				});
			}
			setActiveItem(undefined);
		},
		[setSelectedOptions],
	);

	const handleDragCancel = useCallback((_: DragCancelEvent) => {
		setActiveItem(undefined);
	}, []);

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			onDragCancel={handleDragCancel}
		>
			{selectedOptions.length > 0 ? (
				<div>
					<SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
						<div className="space-y-2">
							{selectedOptions.map((option: IFormatOption) => (
								<SimpleSortableItem
									key={option.id}
									id={option.id}
									option={option}
									remove={remove}
									changeColor={changeColor}
								/>
							))}
						</div>
					</SortableContext>

					<DragOverlay>
						{activeItem ? (
							<SimpleSortableItem id={activeItem.id} option={activeItem} isOverlay />
						) : null}
					</DragOverlay>
				</div>
			) : (
				<div className="text-center text-gray-500 py-8">
					<p>Your format is empty.</p>
					<p>Select specifiers from the panel on the left to begin.</p>
				</div>
			)}
		</DndContext>
	);
};

export default SortableFormat;
