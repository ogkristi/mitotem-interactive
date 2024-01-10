"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Red_Hat_Mono } from "next/font/google";

const rhmono = Red_Hat_Mono({ subsets: ["latin"] });

interface Image {
	name: string;
	processed: boolean;
}

export default function Workspace({ images }: { images: Image[] }) {
	const params = useParams();
	const active = params.img;

	return (
		<ul id="workspace" className={`${rhmono.className} text-sm text-slate-700`}>
			{images.map(({ name, processed }) => (
				<Link
					key={name}
					href={name === active ? "/" : `/${name}`}
					className={name === active ? "active" : undefined}
				>
					<li
						className={`flex justify-between px-1 border-solid border-b border-slate-200 hover:bg-slate-100 hover:cursor-pointer ${
							name === active ? "bg-slate-100" : ""
						}`}
					>
						<span className="truncate">{name}</span>
						{processed && (
							<CheckIcon className="inline self-center w-3 h-3 text-green-600" />
						)}
					</li>
				</Link>
			))}
		</ul>
	);
}
