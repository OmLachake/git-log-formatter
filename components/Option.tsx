import { GIT_FORMAT_OPTIONS } from "@/lib/data";
import React, { memo, useCallback, useMemo } from "react";

export const OptionsBox = memo(({ selectOption }: { selectOption: (...args: any[]) => void }) => {
	const options = useMemo(() => GIT_FORMAT_OPTIONS, []);
	return (
		<div className="flex flex-wrap gap-2">
			{options.map((opt) => {
				const handleClick = useCallback(() => selectOption(opt), []);
				return (
					<button
						key={opt.uniqueId}
						onClick={handleClick}
						title={opt.description}
						className="bg-sky-600 hover:bg-sky-500 text-white font-mono 
                        text-sm px-3 py-1 rounded-md transition-colors focus:outline-none 
                        focus:ring-2 focus:ring-sky-400"
					>
						{opt.description}
					</button>
				);
			})}
		</div>
	);
});
