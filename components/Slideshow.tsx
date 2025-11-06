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

    // Basic touch swipe support
    useEffect(() => {
        let startX = 0;
        let endX = 0;
        const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        };
        const onTouchEnd = () => {
            const delta = endX - startX;
            if (Math.abs(delta) > 40) {
                go(delta < 0 ? 1 : -1);
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            endX = e.touches[0].clientX;
        };
        const el = document.getElementById("slideshow-root");
        if (!el) return;
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", onTouchStart as any);
            el.removeEventListener("touchmove", onTouchMove as any);
            el.removeEventListener("touchend", onTouchEnd as any);
        };
    }, [total]);

	if (!total) return null;

    const progress = ((index + 1) / total) * 100;

    return (
        <div className="w-full max-w-6xl mx-auto" id="slideshow-root">
            <div className="card bg-base-100 shadow-xl border border-base-content/10 overflow-hidden">
                {/* Progress bar */}
                <div className="h-2 w-full bg-base-200">
                    <div
                        className="h-2 bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="card-body md:p-8 p-6">
					{/* Header with title and navigation */}
                    <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">{current.title}</h2>
                            {current.subtitle && (
                                <p className="text-base md:text-lg opacity-80">{current.subtitle}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
							<span className="badge badge-outline select-none">{index + 1} / {total}</span>
                            <button className="btn btn-sm btn-ghost" onClick={() => go(-1)} aria-label="Previous slide">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="m15 18-6-6 6-6"/>
                                </svg>
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={() => go(1)} aria-label="Next slide">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                            </button>
						</div>
					</div>

					{/* Two-column layout: Image on left, Content on right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
						{/* Left column: Image */}
                        {current.imageSrc && (
                            <div className="order-2 md:order-1">
                                <div className="relative w-full rounded-2xl overflow-hidden bg-base-200 aspect-[4/3] md:aspect-video ring-1 ring-base-content/10">
									<Image
										src={current.imageSrc}
										alt={current.title}
										fill
                                        className="object-cover"
										sizes="(min-width: 768px) 400px, 100vw"
									/>
								</div>
							</div>
						)}

						{/* Right column: Content (body, bullets, WiFi, CTA) */}
                        <div className={`order-1 md:order-2 ${current.imageSrc ? '' : 'md:col-span-2'}`}>
                            {current.body && <p className="text-base md:text-lg opacity-90 leading-relaxed mb-4">{current.body}</p>}

                            {current.bullets?.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{current.bullets.map((b, i) => (
                                        <div key={i} className="rounded-xl bg-base-200/80 border border-base-content/10 p-4 shadow-sm">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-6 h-6">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                                            <path d="m9 12 2 2 4-4"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="text-sm md:text-base leading-relaxed flex-1">{b}</p>
                                            </div>
                                        </div>
									))}
								</div>
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
                                <a href={current.ctaHref} target="_blank" className="btn btn-primary mt-6 btn-gradient w-full sm:w-auto">
									{current.ctaText}
								</a>
							) : null}
						</div>
					</div>

					{/* Navigation dots */}
                    <div className="mt-6 flex items-center justify-center gap-3">
						{slides.map((_, i) => (
							<button
								key={i}
                                className={`w-2.5 h-2.5 rounded-full ring-2 ${i === index ? "bg-primary ring-primary/30" : "bg-base-300 ring-base-200"}`}
								aria-label={`Go to slide ${i + 1}`}
								onClick={() => setIndex(i)}
							/>
						))}
					</div>
                    <p className="mt-2 text-center text-xs opacity-60">Tip: Use arrow keys or swipe</p>
				</div>
			</div>
		</div>
	);
};

export default Slideshow;


