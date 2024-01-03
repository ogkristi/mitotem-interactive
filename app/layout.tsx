import Sidebar from "@/app/sidebar";
import type { Metadata } from 'next'
import { Open_Sans } from "next/font/google";
import "./globals.css";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Mitotem Interactive",
	description: "",
};

export default function RootLayout({ children }: { children: React.ReactElement }) {
	return (
		<html lang="en">
			<body className={`w-screen h-screen bg-slate-100 ${open_sans.className}`}>
				<main className="flex flex-col lg:flex-row lg:justify-stretch h-full bg-white">
					<Sidebar />
					{children}
				</main>
			</body>
		</html>
	);
}