"use client";

import Sidebar from "@/app/sidebar";
import Canvas from "@/app/canvas";

export default function Home() {
	return (
		<main className="flex flex-col lg:flex-row bg-white h-full">
			<div className="lg:basis-1/6 lg:h-full">
				<Sidebar />
			</div>
			<div className="lg:basis-5/6 lg:h-full">
				<Canvas />
			</div>
		</main>
	);
}
