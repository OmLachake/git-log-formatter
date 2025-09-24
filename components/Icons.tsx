import { CopyIcon, GripVertical, X } from "lucide-react";
import { memo } from "react";

export const DragIcon = memo(() => {
	return <GripVertical size={200} strokeWidth={1.5} className="text-gray-500" />;
});

export const CopyIconCustom = memo(() => {
	return <CopyIcon size={20} strokeWidth={2.5} />;
});

export const RemoveIcon = memo(() => {
	return <X size={200} strokeWidth={1.5} />;
});

DragIcon.displayName = "DragIcon";
CopyIconCustom.displayName = "CopyIcon";
RemoveIcon.displayName = "RemoveIcon";
