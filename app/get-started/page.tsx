import Slideshow from "@/components/Slideshow";
import { slides } from "@/config.slideshow";
import Link from "next/link";

export default function Page() {
	return (
		<main className="px-8 py-12">
			<section className="max-w-screen-xl mx-auto">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-extrabold tracking-tight">Get Started</h1>
					<Link href="/" className="btn btn-outline btn-primary btn-square" aria-label="Back to home">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
							<path d="M12 3.172 3.293 11.88a1 1 0 1 0 1.414 1.414L6 12.999V20a2 2 0 0 0 2 2h3v-6h2v6h3a2 2 0 0 0 2-2v-7l1.293 1.295a1 1 0 1 0 1.414-1.414L12 3.172Z"/>
						</svg>
					</Link>
				</div>
				<Slideshow slides={slides} />
			</section>
		</main>
	);
}


