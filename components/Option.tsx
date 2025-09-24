import { GIT_FORMAT_OPTIONS, IFormatOption } from "@/lib/data";
import React, { memo, useMemo } from "react";

export const OptionsBox = memo(
	({ selectOption }: { selectOption: (option: IFormatOption) => void }) => {
		const options = useMemo(() => GIT_FORMAT_OPTIONS, []);
		return (
			<div className="flex flex-wrap gap-2">
				{options.map((opt) => {
					return (
						<button
							key={opt.uniqueId}
							onClick={() => selectOption(opt)}
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
	},
);

OptionsBox.displayName = "OptionsBox";
