import Image from "next/image";
import config from "@/config";

interface HostCardProps {
	className?: string;
}

const Host = ({ className = "" }: HostCardProps) => {
	const host = config.host;
	if (!host) return null;

    const computeAge = (): number | undefined => {
        if (host.age) return host.age;
        if (!host.birthday) return undefined;
        const dob = new Date(host.birthday);
        if (Number.isNaN(dob.getTime())) return undefined;
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const age = computeAge();
    const nationality = host.nationality || (host.originCountry === 'Norway' ? 'Norwegian' : host.originCountry);
    const cleanPhone = (input?: string) => (input ? input.replace(/\D/g, '') : '');
    const displayPhone = (input?: string) => (input ? input.replace(/\s+/g, ' ').trim() : '');

    return (
        <section className={`relative px-8 py-12 ${className} min-h-screen flex flex-col justify-center`} id="host">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 items-start w-full">
                <div className="flex flex-col text-left basis-full md:basis-1/4">
                    <p className="inline-block font-semibold text-primary mb-4">Host</p>
                </div>
                <div className="basis-full md:basis-3/4 w-full grid grid-cols-1 gap-8">
                    {/* About the Host */}
                    <div className="card bg-base-100 shadow-xl border border-base-content/10 overflow-hidden w-full">
                        <div className="h-2 w-full bg-gradient-to-r from-primary to-primary/60" />
                        <div className="card-body">
                            <div className="flex items-center gap-6">
                                <div className="relative w-28 h-28 rounded-full ring-4 ring-primary/30 outline outline-1 outline-primary/20 overflow-hidden shrink-0">
                                    <Image src={host.photo || "/me.jpg"} alt={host.name} fill className="object-cover" sizes="112px" />
                                </div>
                                <div className="leading-tight">
                                    <div className="inline-flex items-center gap-2 mb-2">
                                        <span className="badge badge-primary badge-outline">Host</span>
                                        {host.city || config.address?.city ? (
                                            <span className="badge badge-ghost">{host.city || config.address?.city}</span>
                                        ) : null}
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight">{host.name}</h2>
                                    {age ? (
                                        <p className="text-base opacity-90 mt-1">
                                            <span className="font-semibold">Age:</span> {age}
                                        </p>
                                    ) : null}
                                    {nationality ? (
                                        <p className="text-base opacity-90">
                                            <span className="font-semibold">Nationality:</span> {nationality}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                {host.languages?.length ? (
                                    <div className="bg-base-200 rounded-box p-4">
                                        <p className="text-sm opacity-60 mb-1">Languages</p>
                                        <p className="font-semibold">{host.languages.join(', ')}</p>
                                    </div>
                                ) : null}
                                {host.hobbies?.length ? (
                                    <div className="bg-base-200 rounded-box p-4">
                                        <p className="text-sm opacity-60 mb-1">Hobbies</p>
                                        <p className="font-semibold">{host.hobbies.join(', ')}</p>
                                    </div>
                                ) : null}
                                {(host.phone || host.whatsapp) ? (
                                    <div className="bg-base-200 rounded-box p-4">
                                        <p className="text-sm opacity-60 mb-1">Contact</p>
                                        <p className="font-semibold">{displayPhone(host.phone || host.whatsapp)}</p>
                                    </div>
                                ) : null}
                                {host.favorites?.food || host.favorites?.country ? (
                                    <div className="bg-base-200 rounded-box p-4">
                                        <p className="text-sm opacity-60 mb-1">Favorites</p>
                                        <p className="font-semibold">{[host.favorites?.food, host.favorites?.country].filter(Boolean).join(' • ')}</p>
                                    </div>
                                ) : null}
                            </div>

                            {host.countriesLived?.length ? (
                                <div className="mt-6">
                                    <p className="font-semibold mb-2">Countries lived</p>
                                    <p className="opacity-80">{host.countriesLived.join(', ')}</p>
                                </div>
                            ) : null}

                            {(host.instagram || host.whatsapp || host.couchsurfing) ? (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {host.instagram && (
                                        <a
                                            className="btn btn-sm btn-outline btn-primary inline-flex items-center gap-2"
                                            href={`https://instagram.com/${host.instagram}`}
                                            target="_blank"
                                        >
                                            {/* Instagram icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/>
                                                <circle cx="17.5" cy="6.5" r="1.5"/>
                                                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                                            </svg>
                                            Instagram
                                        </a>
                                    )}
                                    {host.whatsapp && (
                                        <a
                                            className="btn btn-sm btn-outline btn-primary inline-flex items-center gap-2"
                                            href={`https://wa.me/${cleanPhone(host.whatsapp)}`}
                                            target="_blank"
                                        >
                                            {/* WhatsApp icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                <path d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.58 0 .3 5.28.3 11.76c0 2.07.54 4.07 1.56 5.85L0 24l6.6-1.71a11.4 11.4 0 005.46 1.41h.01c6.48 0 11.76-5.28 11.76-11.76a11.7 11.7 0 00-3.31-8.46zM12.07 21.3h-.01a9.6 9.6 0 01-4.9-1.34l-.35-.21-3.92 1.02 1.05-3.83-.23-.39a9.55 9.55 0 01-1.46-5.09c0-5.29 4.31-9.6 9.6-9.6 2.57 0 4.98 1 6.79 2.8a9.6 9.6 0 012.81 6.8c0 5.29-4.31 9.6-9.6 9.6zm5.55-7.24c-.3-.15-1.77-.88-2.05-.98-.28-.11-.49-.15-.7.15-.2.3-.8.98-.98 1.18-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.73-1.64-2.03-.17-.3-.02-.47.13-.62.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.5-.7-.5-.18 0-.38-.02-.58-.02-.2 0-.53.08-.8.38-.27.3-1.06 1.03-1.06 2.51s1.09 2.9 1.25 3.1c.15.2 2.15 3.29 5.22 4.6.73.32 1.3.5 1.74.64.73.23 1.39.2 1.92.12.59-.09 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
                                            </svg>
                                            WhatsApp
                                        </a>
                                    )}
                                    {host.couchsurfing && (
                                        <a
                                            className="btn btn-sm btn-outline btn-primary inline-flex items-center gap-2"
                                            href={host.couchsurfing}
                                            target="_blank"
                                        >
                                            {/* Couchsurfing-like icon (link) */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10a10 10 0 100-20zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1.5 5c-.83 0-1.5.67-1.5 1.5S9.67 12 10.5 12s1.5-.67 1.5-1.5S11.33 9 10.5 9zm5.5 6H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"/>
                                            </svg>
                                            Couchsurfing
                                        </a>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Next section arrow */}
            <a
                href="#home"
                aria-label="Scroll to home"
                className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex flex-col items-center gap-1"
            >
                <span className="text-sm font-semibold text-primary">About Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary animate-bounce">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06l3.72 3.72V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
            </a>
        </section>
    );
};

export default Host;


