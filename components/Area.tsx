import { ReactNode } from "react";

const Area = ({
	title,
	children,
	action,
	ActionElement,
	className = "",
}: {
	title: string;
	children: ReactNode;
	action?: boolean;
	ActionElement?: ReactNode;
	className: string;
}) => (
	<div className={` flex flex-col overflow-hidden h-full ${className}`}>
		<div>
			<h2 className="text-sm  text-gray-900  px-4 py-2 border-b flex-shrink-0">{title}</h2>
			{action && ActionElement}
		</div>
		<div className="p-4 overflow-auto h-full">{children}</div>
	</div>
);

export default Area;
