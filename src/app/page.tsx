import { Roboto } from "next/font/google";
const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100"],
	style: ["italic"],
	display: "swap",
});
export default function Home() {

	return (
		<main className="flex min-h-screen flex-col p-6">
			<div>

				<h1 className={roboto.className}>Home</h1>
			</div>
		</main>
	);
}

export function generateMetadata() {
	return {
		title: "Home",
		description: "Home page",
	};
}