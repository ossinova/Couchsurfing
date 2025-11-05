import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

const Footer = () => {
  const socials = [
    config.host?.instagram && { href: `https://instagram.com/${config.host.instagram}`, label: "Instagram", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/><circle cx="17.5" cy="6.5" r="1.5"/><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/></svg>
    )},
    config.host?.whatsapp && { href: `https://wa.me/${(config.host.whatsapp || '').replace(/\D/g, '')}`, label: "WhatsApp", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.58 0 .3 5.28.3 11.76c0 2.07.54 4.07 1.56 5.85L0 24l6.6-1.71a11.4 11.4 0 005.46 1.41h.01c6.48 0 11.76-5.28 11.76-11.76a11.7 11.7 0 00-3.31-8.46zM12.07 21.3h-.01a9.6 9.6 0 01-4.9-1.34l-.35-.21-3.92 1.02 1.05-3.83-.23-.39a9.55 9.55 0 01-1.46-5.09c0-5.29 4.31-9.6 9.6-9.6 2.57 0 4.98 1 6.79 2.8a9.6 9.6 0 012.81 6.8c0 5.29-4.31 9.6-9.6 9.6zm5.55-7.24c-.3-.15-1.77-.88-2.05-.98-.28-.11-.49-.15-.7.15-.2.3-.8.98-.98 1.18-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.73-1.64-2.03-.17-.3-.02-.47.13-.62.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.5-.7-.5-.18 0-.38-.02-.58-.02-.2 0-.53.08-.8.38-.27.3-1.06 1.03-1.06 2.51s1.09 2.9 1.25 3.1c.15.2 2.15 3.29 5.22 4.6.73.32 1.3.5 1.74.64.73.23 1.39.2 1.92.12.59-.09 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>
    )},
    config.host?.couchsurfing && { href: config.host.couchsurfing, label: "Couchsurfing", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10a10 10 0 100-20zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1.5 5c-.83 0-1.5.67-1.5 1.5S9.67 12 10.5 12s1.5-.67 1.5-1.5S11.33 9 10.5 9zm5.5 6H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
    )}
  ].filter(Boolean) as { href: string; label: string; icon: JSX.Element }[];

  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt={`${config.appName} logo`} priority={true} className="w-6 h-6" width={24} height={24} />
            <strong className="font-extrabold tracking-tight text-base">{config.appName}</strong>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="#host" className="link link-hover">About Host</Link>
            <Link href="#home" className="link link-hover">About Home</Link>
            <Link href="#faq" className="link link-hover">FAQ</Link>
            <Link href="/get-started" className="link link-hover">Get Started</Link>
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" aria-label={s.label} className="btn btn-sm btn-outline btn-primary btn-square text-primary">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center md:text-left text-xs opacity-70">
          <p>© {new Date().getFullYear()} {config.appName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
