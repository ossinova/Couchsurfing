"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SlideItem } from "@/config.slideshow";

interface SlideshowProps {
	slides: SlideItem[];
}

const Slideshow = ({ slides }: SlideshowProps) => {
	const [index, setIndex] = useState(0);
	const total = slides.length;
	const current = slides[index];

	const go = (delta: number) => {
		setIndex((i) => (i + delta + total) % total);
	};

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") go(1);
			if (e.key === "ArrowLeft") go(-1);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [total]);

	if (!total) return null;

	return (
		<div className="w-full max-w-4xl mx-auto">

				<div className="card bg-base-100 shadow-xl border border-base-content/10 overflow-hidden">
				<div className="h-2 w-full bg-gradient-to-r from-primary to-primary/60" />
					<div className="card-body">
						<div className="flex items-start justify-between gap-4">
							<div className="space-y-2">
								<h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{current.title}</h2>
								{current.subtitle && (
									<p className="text-xl opacity-80">{current.subtitle}</p>
								)}
							</div>
							<div className="flex items-center gap-2">
								<span className="badge badge-outline select-none">{index + 1} / {total}</span>
								<button className="btn btn-sm btn-ghost" onClick={() => go(-1)} aria-label="Previous slide">
									Prev
								</button>
								<button className="btn btn-sm btn-primary" onClick={() => go(1)} aria-label="Next slide">
									Next
								</button>
							</div>
						</div>

					{current.body && <p className="mt-4 text-lg opacity-90 leading-relaxed">{current.body}</p>}

					{current.imageSrc && (
						<div className="mt-4">
							<div className="relative w-full rounded-box overflow-hidden bg-base-200 aspect-[4/3] md:aspect-video">
								<Image
									src={current.imageSrc}
									alt={current.title}
									fill
									className="object-contain"
									sizes="(min-width: 768px) 800px, 100vw"
								/>
							</div>
						</div>
					)}
					{current.bullets?.length ? (
						<ul className="mt-4 list-disc list-inside space-y-1 text-lg">
							{current.bullets.map((b, i) => (
								<li key={i}>{b}</li>
							))}
						</ul>
					) : null}

					{/* Wi‑Fi QR rendering when slide provides wifi data */}
					{current.wifiSsid && (
						<div className="mt-6 flex flex-col sm:flex-row items-start gap-6">
							<img
								alt="Wi‑Fi QR"
								className="rounded-box border border-base-content/10 w-40 h-40"
								src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`WIFI:T:${current.wifiAuthType || "WPA"};S:${current.wifiSsid};P:${current.wifiPassword || ""};;`)}`}
							/>
							<div className="space-y-1">
								<p><span className="font-semibold">Network:</span> {current.wifiSsid}</p>
								{current.wifiPassword ? (
									<p><span className="font-semibold">Password:</span> {current.wifiPassword}</p>
								) : null}
								<p className="text-xs opacity-70">Tip: Point your camera at the QR to connect.</p>
							</div>
						</div>
					)}

					{current.ctaText && current.ctaHref ? (
						<a href={current.ctaHref} target="_blank" className="btn btn-primary mt-6">
							{current.ctaText}
						</a>
					) : null}

					<div className="mt-6 flex items-center justify-center gap-2">
						{slides.map((_, i) => (
							<button
								key={i}
								className={`w-3 h-3 rounded-full ring-2 ${i === index ? "bg-primary ring-primary/30" : "bg-base-300 ring-base-200"}`}
								aria-label={`Go to slide ${i + 1}`}
								onClick={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Slideshow;


