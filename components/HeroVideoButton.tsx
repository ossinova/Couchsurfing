"use client";

import { useEffect, useState } from "react";

const HeroVideoButton = ({ videoId }: { videoId?: string }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	if (!videoId) {
		return null;
	}

	return (
		<>
			<button className="btn btn-primary btn-wide" onClick={() => setOpen(true)}>
				Watch video
			</button>
			{open && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
					onClick={(e) => {
						if (e.target === e.currentTarget) setOpen(false);
					}}
				>
					<div className="relative w-full max-w-3xl aspect-video bg-black rounded-box overflow-hidden">
						<button
							className="absolute top-3 right-3 btn btn-sm btn-circle"
							onClick={() => setOpen(false)}
							aria-label="Close video"
						>
							✕
						</button>
						<iframe
							className="w-full h-full"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default HeroVideoButton;


