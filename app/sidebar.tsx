"use client";
import { useState } from "react";
import { Red_Hat_Mono } from "next/font/google";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import {
	PaintBrushIcon,
	CursorArrowRaysIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Workspace from "@/app/workspace";
import { useKeyboardNavigation } from "@/app/hooks";

const rhmono = Red_Hat_Mono({ subsets: ["latin"] });

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
			onClick={onClick}
			className="flex justify-between py-1 rounded-md border-solid border-2 border-sky-100 transition hover:border-sky-200 cursor-pointer text-slate-700 font-bold"
		>
			<span />
			<span className="">{name}</span>
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
		<div
			className="mt-px"
			ref={sideItemRef}
			onKeyDown={handleKeyboardNavigation}
		>
			<Heading
				name={name}
				isCollapsed={isCollapsed}
				onClick={() => setCollapsed(!isCollapsed)}
			/>
			<div className={isCollapsed ? "hidden" : ""}>{children}</div>
		</div>
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
	const cols = {
		"#": { full: "count", style: "w-8" },
		c: { full: "centroid", style: "" },
		a: { full: "area", style: "" },
		p: { full: "perimeter", style: "" },
	};

	return (
		<table
			className={`${rhmono.className} w-full text-sm text-slate-700 tracking-tight`}
		>
			<thead className="capitalize">
				<tr className="border-b border-slate-300 [&>*]:font-medium">
					{Object.keys(cols).map((h) => (
						<th key={cols[h].full} className={cols[h].style}>
							<span className="group relative">
								{h}
								<span className="absolute invisible group-hover:visible top-[-1px] left-0 bg-slate-50">
									{cols[h].full}
								</span>
							</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	);
}

export default function Sidebar() {
	return (
		<div className="lg:h-full lg:w-1/5 flex flex-col">
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
