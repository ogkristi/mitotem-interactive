import { Red_Hat_Mono } from "next/font/google";
const rhmono = Red_Hat_Mono({ subsets: ["latin"] });

export default function Output() {
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
