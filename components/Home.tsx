import Image from "next/image";
import config from "@/config";

interface HomeSectionProps {
	className?: string;
}

const Home = ({ className = "" }: HomeSectionProps) => {
	const host = config.host;

	if (!host) return null;

    const displayPhone = (input?: string) => (input ? input.replace(/\s+/g, ' ').trim() : '');

    const addressLine = [
		host.addressLine1 || config.address?.street,
		host.addressLine2,
		(host.postalCode || config.address?.postalCode) && `${host.postalCode || config.address?.postalCode} ${host.city || config.address?.city}`,
		host.country || config.address?.country,
	]
		.filter(Boolean)
		.join(", ");

    const coords = config.address?.coordinates;
    const mapUrl = coords
        ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
        : (addressLine ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}` : undefined);

	return (
        <section className={`relative px-8 py-12 ${className} min-h-screen flex flex-col justify-center`} id="home">
			<div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 items-start w-full">
				<div className="flex flex-col text-left basis-full md:basis-1/4">
					<p className="inline-block font-semibold text-primary mb-4">Home</p>
				</div>
                <div className="basis-full md:basis-3/4 w-full">
                    <div className="card bg-base-100 shadow-xl border border-base-content/10 overflow-hidden w-full">
                        <div className="h-2 w-full bg-gradient-to-r from-primary to-primary/60" />
                        <div className="card-body">
                            {/* Header with round image, badges, and title (similar to Host) */}
                            <div className="flex items-center gap-6 mb-2">
                                <div className="relative w-28 h-28 rounded-full ring-4 ring-primary/30 outline outline-1 outline-primary/20 overflow-hidden shrink-0">
                                    <Image
                                        src={config.hero?.backgroundImage || "/app/opengraph-image.png"}
                                        alt="Home"
                                        fill
                                        className="object-cover"
                                        sizes="112px"
                                    />
                                </div>
                                <div className="leading-tight">
                                    <div className="inline-flex items-center gap-2 mb-2">
                                        <span className="badge badge-primary badge-outline">Home</span>
                                        {(host.city || config.address?.city) && (
                                            <span className="badge badge-ghost">{host.city || config.address?.city}</span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">{host.houseName || "Apartment"}</h3>
                                    <div className="mt-1 text-base opacity-90 space-y-0.5">
                                        {host.addressLine1 || config.address?.street ? (
                                            <p><span className="font-semibold">Address:</span> {host.addressLine1 || config.address?.street}</p>
                                        ) : null}
                                        {host.addressLine2 ? (
                                            <p><span className="font-semibold">Unit:</span> {host.addressLine2}</p>
                                        ) : null}
                                        {(host.postalCode || config.address?.postalCode) || (host.city || config.address?.city) ? (
                                            <p><span className="font-semibold">City:</span> {(host.postalCode || config.address?.postalCode) || ""} {(host.city || config.address?.city) || ""}</p>
                                        ) : null}
                                        {host.country || config.address?.country ? (
                                            <p><span className="font-semibold">Country:</span> {host.country || config.address?.country}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
								<div className="bg-base-200 rounded-box p-4">
									<p className="text-sm opacity-60 mb-1">Max guests</p>
									<p className="font-semibold">{host.maxGuests ?? 1}</p>
								</div>
								{host.nearbyTransit?.trainStation && (
									<div className="bg-base-200 rounded-box p-4">
										<p className="text-sm opacity-60 mb-1">Nearest station</p>
										<p className="font-semibold">{host.nearbyTransit.trainStation}</p>
									</div>
								)}
								{host.nearbyTransit?.buses?.length ? (
									<div className="bg-base-200 rounded-box p-4">
										<p className="text-sm opacity-60 mb-1">Buses</p>
										<p className="font-semibold">{host.nearbyTransit.buses.join(", ")}</p>
									</div>
								) : null}
							</div>

							{host.nearbyTransit?.airportRoute && (
								<div className="mt-6">
									<p className="font-semibold mb-2">From the airport</p>
									<p className="opacity-80">{host.nearbyTransit.airportRoute}</p>
								</div>
							)}

							{host.rules?.length ? (
								<div className="mt-6">
									<p className="font-semibold mb-2">House rules</p>
									<ul className="list-disc list-inside space-y-1 opacity-80">
										{host.rules.map((rule: string, idx: number) => (
											<li key={idx}>{rule}</li>
										))}
									</ul>
								</div>
							) : null}

                            {host.emergencyContacts?.length ? (
								<div className="mt-6">
									<p className="font-semibold mb-2">Emergency contacts</p>
									<ul className="space-y-1 opacity-80">
                                        {host.emergencyContacts.map((c, idx) => (
											<li key={idx}>
                                                <span className="font-semibold">{c.name}</span>: {displayPhone(c.number)}
												{c.description ? ` — ${c.description}` : ""}
											</li>
										))}
									</ul>
								</div>
							) : null}

                            {mapUrl && (
                                <div className="mt-6">
                                    <a href={mapUrl} target="_blank" className="btn btn-sm btn-outline btn-primary inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1.5 5c-.83 0-1.5.67-1.5 1.5S9.67 12 10.5 12s1.5-.67 1.5-1.5S11.33 9 10.5 9zm5.5 6H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                                        Open in Google Maps
                                    </a>
                                </div>
                            )}
						</div>
					</div>
                </div>
            </div>

            {/* Next section arrow */}
            <a
                href="#faq"
                aria-label="Scroll to FAQ"
                className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex flex-col items-center gap-1"
            >
                <span className="text-sm font-semibold text-primary">FAQ</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary animate-bounce">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06l3.72 3.72V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
            </a>
		</section>
	);
};

export default Home;


