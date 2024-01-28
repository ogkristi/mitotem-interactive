import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function Workspace({
	images,
	active,
	setActive,
}: {
	images: File[];
	active: number | null;
	setActive: Dispatch<SetStateAction<number | null>>;
}) {
	const processed = false;
	return (
		<ul>
			{images.map((f, i) => (
				<li
					tabIndex={0}
					key={f.name}
					className={`flex justify-between px-1 border-b border-slate-200 hover:bg-slate-100 hover:cursor-pointer ${
						i == active ? "active bg-slate-100" : ""
					}`}
					onClick={() => setActive(i == active ? null : i)}
				>
					<span className="truncate">{f.name}</span>
					{processed && (
						<CheckIcon className="inline self-center w-3 h-3 text-green-600" />
					)}
				</li>
			))}
		</ul>
	);
}
