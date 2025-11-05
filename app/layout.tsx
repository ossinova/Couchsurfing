import { ReactNode } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={font.className}
			suppressHydrationWarning
		>
			<body>
				<Script
					id="theme-init"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const stored = localStorage.getItem('theme');
									let theme = '';
									if (stored && ['', 'light', 'dark'].includes(stored)) {
										theme = stored;
									}
									
									if (theme === '') {
										// System mode: detect system preference
										const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
										document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
									} else {
										document.documentElement.setAttribute('data-theme', theme);
									}
								} catch (e) {}
							})();
						`,
					}}
				/>
				{/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
