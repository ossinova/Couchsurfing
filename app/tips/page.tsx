import { slides } from "@/config.slideshow";
import Link from "next/link";

export default function TipsPage() {
	const thingsToDoSlide = slides.find((s) => s.id === "things-to-do");
	const tips = thingsToDoSlide?.bullets || [];
	const googleMapsUrl = thingsToDoSlide?.ctaHref;

	return (
		<main className="px-8 py-12 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Things to Do in Copenhagen</h1>
					<Link href="/" className="btn btn-outline btn-primary btn-square" aria-label="Back to home">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
							<path d="M12 3.172 3.293 11.88a1 1 0 1 0 1.414 1.414L6 12.999V20a2 2 0 0 0 2 2h3v-6h2v6h3a2 2 0 0 0 2-2v-7l1.293 1.295a1 1 0 1 0 1.414-1.414L12 3.172Z"/>
						</svg>
					</Link>
				</div>

				<p className="text-xl opacity-80 mb-8">Discover the best of Copenhagen with these curated recommendations.</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{tips.map((tip, idx) => (
						<div key={idx} className="card bg-base-100 shadow-xl border border-base-content/10 overflow-hidden">
							<div className="h-2 w-full bg-gradient-to-r from-primary to-primary/60" />
							<div className="card-body">
								<div className="flex items-start gap-3">
									<div className="badge badge-primary badge-outline shrink-0">{idx + 1}</div>
									<p className="text-lg font-medium leading-relaxed">{tip}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{googleMapsUrl && (
					<div className="text-center">
						<a
							href={googleMapsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-primary btn-lg inline-flex items-center gap-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
								<path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1.5 5c-.83 0-1.5.67-1.5 1.5S9.67 12 10.5 12s1.5-.67 1.5-1.5S11.33 9 10.5 9zm5.5 6H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"/>
							</svg>
							View My Curated Google Maps List
						</a>
					</div>
				)}
			</div>
		</main>
	);
}

