import { Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "Mitotem Interactive",
	description: "",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`w-screen h-screen bg-slate-100 ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}
