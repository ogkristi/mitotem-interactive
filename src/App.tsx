import { useState, useEffect } from "react";
import Panel from "./components/panel";
import Canvas from "./components/canvas";
import Upload from "./components/upload";
import Workspace from "./components/workspace";
import Tools from "./components/tools";
import Output from "./components/output";
import { putImage, getWebp } from "./actions";

export interface Result {
	webp?: File;
	mask?: File;
	data?: string;
}

export default function App() {
	const [images, setImages] = useState<File[]>([]);
	const [results, setResults] = useState<Result[]>([]);
	const [active, setActive] = useState<number | null>(null);

	useEffect(() => {
		const extension = new Array(images.length - results.length).fill(null);
		setResults(results.concat(extension));
	}, [images]);

	useEffect(() => {
		const processIndex = async (index: number | null) => {
			if (index != null && index < images.length && !results[index]) {
				console.log(active);
				await putImage(images[index]);
				console.log("ohi");
				await getWebp(images[index]).then((webp) =>
					setResults(
						results.map((o, i) => (i == active ? { ...o, webp: webp } : o))
					)
				);
			}
		};
		processIndex(active);
	}, [active]);

	return (
		<div className="h-screen w-screen content-start grid lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,5fr)] lg:gap-1 lg:p-1">
			<main className="flex flex-col lg:gap-2 lg:order-last">
				<Panel name={"canvas"} className="">
					{active == null ? (
						<Upload images={images} setImages={setImages} />
					) : (
						<Canvas result={results[active]} />
					)}
				</Panel>
			</main>
			<aside className="flex flex-col lg:gap-1">
				<Panel name={"workspace"} className="">
					<Workspace images={images} active={active} setActive={setActive} />
				</Panel>
				<Panel name={"tools"} className="">
					<Tools />
				</Panel>
				<Panel name={"output"} className="">
					<Output />
				</Panel>
			</aside>
		</div>
	);
}
