export default function Output() {
	const cols = {
		"#": { full: "count", style: "w-8" },
		c: { full: "centroid", style: "" },
		a: { full: "area", style: "" },
		p: { full: "perimeter", style: "" },
	};

	return (
		<table className="w-full tracking-tight truncate">
			<thead className="capitalize">
				<tr className="border-b border-slate-300 [&>*]:font-medium">
					{Object.keys(cols).map((h) => (
						<th key={cols[h].full} className={cols[h].style}>
							<span className="group relative">
								{h}
								<span className="absolute invisible group-hover:visible left-0 bg-slate-50">
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
