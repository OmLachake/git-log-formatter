"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, {
	useState,
	useMemo,
	useCallback,
	useOptimistic,
	useRef,
	startTransition,
	useEffect,
} from "react";
import { OptionsBox } from "@/components/Option";
import { IFormatOption } from "@/lib/data";
import Area from "@/components/Area";
import SortableFormat from "@/components/Format";
import { CopyIcon } from "lucide-react";
import { CopyIconCustom } from "@/components/Icons";

// --- CONSTANTS: GIT FORMAT SPECIFIERS AND SAMPLE DATA ---

const SAMPLE_COMMIT_DATA = {
	"%H": "d8a2b7c4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
	"%h": "d8a2b7c",
	"%T": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
	"%t": "a1b2c3d",
	"%P": "b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2",
	"%p": "b1c2d3e",
	"%an": "Jane Doe",
	"%ae": "jane.doe@example.com",
	"%ad": "Mon May 27 14:30:00 2024 -0400",
	"%ar": "2 weeks ago",
	"%cn": "John Smith",
	"%ce": "john.smith@example.com",
	"%cd": "Mon May 27 14:35:00 2024 -0400",
	"%cr": "2 weeks ago",
	"%s": "feat: Implement drag-and-drop functionality",
	"%f": "feat-Implement-drag-and-drop-functionality",
	"%b": "Adds the ability for users to reorder items in the list.\nImplements HTML5 drag and drop API for a smooth user experience.",
	"%n": "\n",
	"%d": " (HEAD -> main, origin/main, tag: v1.0.0)",
	"%D": "HEAD -> main, tag: v1.0.0, origin/main",
};

export default function GitLogFormatterPage() {
	const [selectedOptions, setSelectedOptions] = useState<IFormatOption[]>([]);

	const handleAddOption = useCallback((option: IFormatOption) => {
		setSelectedOptions((prev) => [...prev, { ...option, id: Date.now(), color: "black" }]);
	}, []);

	const handleRemoveOption = useCallback((id: string) => {
		setSelectedOptions((prev) => prev.filter((opt) => opt.id !== id));
	}, []);
	const handleColorChange = useCallback((id: string, color: string) => {
		setSelectedOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, color } : opt)));
	}, []);

	const { gitCommand } = useMemo(() => {
		const format = selectedOptions
			.map((opt) => {
				if (opt.name === " ") return " ";
				if (opt.color && opt.color !== "normal") {
					return `%C(${opt.color})${opt.name}%C(reset)`;
				}
				return opt.name;
			})
			.join(" ");
		const command = `git log --pretty=format:'${format}'`;
		return { gitCommand: command };
	}, [selectedOptions]);

	const [copySuccess, setCopySuccess] = useState("");

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(gitCommand); // put your text/command
			setCopySuccess("Copied!");
			setTimeout(() => setCopySuccess(""), 2000); // reset after 2s
		} catch (err) {
			console.error("Failed to copy: ", err);
			setCopySuccess("Failed!");
		}
	};

	return (
		<div className="page text-gray-200 font-sans">
			<div className="content">
				<ResizablePanelGroup direction="horizontal" className="h-full">
					<ResizablePanel>
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel className="min-h-[200px]" defaultSize={50}>
								<Area title="1. Select Format Specifiers" className={""}>
									<ScrollArea>
										<OptionsBox
											selectOption={(opt) => {
												handleAddOption(opt);
											}}
										/>
									</ScrollArea>
								</Area>
							</ResizablePanel>
							<ResizableHandle data-orientation="vertical" />
							<ResizablePanel className="min-h-[200px]">
								<Area title="3. Generated Command" className={""}>
									<div className="bg-black rounded-md p-4 h-full flex flex-col relative">
										<code className="text-green-400 whitespace-pre-wrap break-all font-mono flex-grow">
											{gitCommand}
										</code>
										<button
											onClick={copyToClipboard}
											className="absolute right-3 top-3 bg-blue-500 hover:bg-blue-400
               text-white font-bold p-2 rounded-md text-sm
               transition-all duration-200 cursor-pointer"
										>
											{copySuccess || (
												<span className="flex items-center justify-center gap-2">
													<CopyIconCustom />
												</span>
											)}
										</button>
									</div>
								</Area>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>

					<ResizableHandle data-orientation="horizontal" />

					<ResizablePanel>
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel className="">
								<Area title="2. Order & Customize Format" className={""}>
									<SortableFormat
										selectedOptions={selectedOptions}
										setSelectedOptions={setSelectedOptions}
										remove={handleRemoveOption}
										changeColor={handleColorChange}
									/>
								</Area>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</div>
	);
}
