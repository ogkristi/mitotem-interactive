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
			className="flex justify-between py-2 transition hover:text-sky-500 cursor-pointer"
		>
			<span className="capitalize ml-6">{name}</span>
			<ChevronRightIcon
				className={`self-center h-4 w-4 mr-1 inline transition ${
					isCollapsed ? "" : "rotate-90"
				}`}
			/>
		</div>
	);
}

function SideItem({
	name,
	children,
}: {
	name: string;
	children: React.ReactElement;
}) {
	const [sideItemRef, handleKeyboardNavigation] = useKeyboardNavigation();
	const [isCollapsed, setCollapsed] = useState<boolean>(true);

	return (
		<div ref={sideItemRef} onKeyDown={handleKeyboardNavigation}>
			<Heading
				name={name}
				isCollapsed={isCollapsed}
				onClick={() => setCollapsed(!isCollapsed)}
			/>
			<div className={`font-normal ${isCollapsed ? "hidden" : ""}`}>
				{children}
			</div>
		</div>
	);
}

export default function Sidebar(props: {
	workspace: React.ReactElement;
	tools: React.ReactElement;
	output: React.ReactElement;
}) {
	return (
		<div className="lg:h-full lg:w-1/5 lg:border-r lg:border-slate-200 flex flex-col text-sm">
			<SideItem name={"workspace"}>{props.workspace}</SideItem>
			<SideItem name={"tools"}>{props.tools}</SideItem>
			<SideItem name={"output"}>{props.output}</SideItem>
		</div>
	);
}
