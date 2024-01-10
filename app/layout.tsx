import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Sidebar from "@/app/ui/sidebar";
import Workspace from "@/app/ui/workspace";
import Tools from "@/app/ui/tools";
import { getImages } from "@/app/actions";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Mitotem Interactive",
	description: "",
};

export default async function RootLayout(props: {
	children: React.ReactElement;
	output: React.ReactElement;
}) {
	const images = await getImages();

	return (
		<html lang="en">
			<body className={`w-screen h-screen bg-slate-100 ${open_sans.className}`}>
				<main className="flex flex-col lg:flex-row lg:justify-stretch h-full bg-white">
					<Sidebar
						workspace={<Workspace images={images} />}
						tools={<Tools />}
						output={props.output}
					/>
					{props.children}
				</main>
			</body>
		</html>
	);
}
