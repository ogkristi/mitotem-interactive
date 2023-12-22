import { useState } from "react";
import { Red_Hat_Mono } from "next/font/google";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import {
	PaintBrushIcon,
	CursorArrowRaysIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const rhmono = Red_Hat_Mono({ subsets: ["latin"] });
const files = ["5000X.TIFF", "6000X.TIFF", "7000X.TIFF"];

function Heading({ name, isCollapsed, onClick }) {
	return (
		<div
			onClick={onClick}
			className="flex justify-between py-1 rounded-md border-solid border-2 border-sky-100 transition hover:border-sky-200 cursor-pointer text-slate-700 font-bold"
		>
			<span />
			<span className="">{name}</span>
			<ChevronRightIcon
				className={`self-center h-4 w-4 inline transition ${
					!isCollapsed && "rotate-90"
				}`}
			/>
		</div>
	);
}

function SideItem({ name, children }) {
	const [isCollapsed, setCollapsed] = useState(true);

	return (
		<div className="m-px">
			<Heading
				name={name}
				isCollapsed={isCollapsed}
				onClick={() => setCollapsed(!isCollapsed)}
			/>
			<div className={isCollapsed && "hidden"}>{children}</div>
		</div>
	);
}

function Workspace() {
	return (
		<ul className={`${rhmono.className} text-sm text-slate-700 tracking-tight`}>
			{files.map((f, index) => (
				<li
					key={index}
					className="flex justify-between px-1 border-solid border-b border-slate-200"
				>
					<span>{f}</span>
					<CheckIcon className="inline self-center w-3 h-3 text-green-600" />
				</li>
			))}
		</ul>
	);
}

function Tools() {
	const style =
		"h-6 w-6 p-[2px] cursor-pointer text-slate-600 transition hover:text-sky-600";

	return (
		<div className="flex justify-center p-1">
			<PaintBrushIcon className={style} />
			<CursorArrowRaysIcon className={style} />
			<MagnifyingGlassIcon className={style} />
		</div>
	);
}

function Output() {
	const headers = ["#", "C", "A", "P"];

	return (
		<table
			className={`${rhmono.className} w-full text-sm text-slate-700 tracking-tight`}
		>
			<tr className="border-b border-slate-300">
				{headers.map((h, i) => (
					<th className={`font-semibold ${!i && "w-8 "}`}>{h}</th>
				))}
			</tr>
		</table>
	);
}

export default function Sidebar() {
	return (
		<div className="flex flex-col">
			<SideItem name={"Workspace"}>
				<Workspace />
			</SideItem>
			<SideItem name={"Tools"}>
				<Tools />
			</SideItem>
			<SideItem name={"Output"}>
				<Output />
			</SideItem>
		</div>
	);
}
