import { robotoItalic } from "./lib/roboto-roboto";

export default function Home() {

	return (
		<main className="flex min-h-screen flex-col p-6">
			<div>

				<h1 className={robotoItalic.className}>Home</h1>
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