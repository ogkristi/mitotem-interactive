import { useState } from "react";
import { useKeyboardNavigation } from "../hooks";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

function Heading({
	name,
	isCollapsed,
	onClick,
}: {
	name: string;
	isCollapsed: boolean;
	onClick: React.MouseEventHandler;
}) {
	return (
		<div
			id={name + "-heading"}
			onClick={onClick}
			className="text-center p-2 transition hover:text-sky-500 cursor-pointer"
		>
			<span className="capitalize">{name}</span>
			<ChevronRightIcon
				className={`h-4 w-4 float-end transition ${
					isCollapsed ? "" : "rotate-90"
				}`}
			/>
		</div>
	);
}

export default function Panel({
	name,
	className,
	children,
}: {
	name: string;
	className: string;
	children: React.ReactElement;
}) {
	const [panelRef, handleKeyboardNavigation] = useKeyboardNavigation();
	const [isCollapsed, setCollapsed] = useState<boolean>(false);

	return (
		<div
			ref={panelRef}
			onKeyDown={handleKeyboardNavigation}
			id={name}
			className={`min-h-0 flex flex-col bg-white border border-slate-300 rounded shadow text-slate-700 ${className}`}
		>
			<Heading
				name={name}
				isCollapsed={isCollapsed}
				onClick={() => setCollapsed(!isCollapsed)}
			/>
			<div
				className={`overflow-auto font-normal ${isCollapsed ? "collapse" : ""}`}
			>
				{children}
			</div>
		</div>
	);
}
