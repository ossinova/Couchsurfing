"use client";

import { useEffect, useState, useRef } from "react";
import { themeChange } from "theme-change";

type Theme = "" | "light" | "dark";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>("");
	const themeRef = useRef<Theme>("");

	// Update ref when theme changes
	useEffect(() => {
		themeRef.current = theme;
	}, [theme]);

	useEffect(() => {
		// Initialize theme-change library (true = observe system preference)
		themeChange(true);
		
		// Get initial theme from localStorage
		const stored = localStorage.getItem("theme") as Theme | null;
		let initialTheme: Theme;
		
		if (stored && ["", "light", "dark"].includes(stored)) {
			initialTheme = stored;
		} else {
			// Default to system (empty string means follow system preference)
			initialTheme = "";
		}
		
		setTheme(initialTheme);
		themeRef.current = initialTheme;
		
		// Apply the theme
		if (typeof window !== "undefined") {
			const html = document.documentElement;
			if (initialTheme === "") {
				// System mode: detect system preference and apply it
				const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				html.setAttribute("data-theme", prefersDark ? "dark" : "light");
			} else {
				html.setAttribute("data-theme", initialTheme);
			}
		}
		
		// Listen for system theme changes when in system mode
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (themeRef.current === "") {
				// Only update if we're in system mode
				document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
			}
		};
		
		mediaQuery.addEventListener("change", handleSystemThemeChange);
		
		return () => {
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
		};
	}, []);

	const cycleTheme = () => {
		const themes: Theme[] = ["", "light", "dark"];
		const currentIndex = themes.indexOf(theme);
		// If theme not found, default to first theme (system)
		const safeIndex = currentIndex === -1 ? 0 : currentIndex;
		const nextIndex = (safeIndex + 1) % themes.length;
		const nextTheme = themes[nextIndex];
		
		// Update state
		setTheme(nextTheme);
		
		// Save to localStorage
		localStorage.setItem("theme", nextTheme);
		
		// Apply the theme
		const html = document.documentElement;
		if (nextTheme === "") {
			// System mode: detect system preference and apply it
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			html.setAttribute("data-theme", prefersDark ? "dark" : "light");
		} else {
			html.setAttribute("data-theme", nextTheme);
		}
		
		// Force a repaint to ensure CSS variables update
		void html.offsetHeight;
	};

	const getIcon = () => {
		if (theme === "dark") {
			// Moon icon for dark mode
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			);
		} else if (theme === "light") {
			// Sun icon for light mode
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
					<circle cx="12" cy="12" r="5"/>
					<line x1="12" y1="1" x2="12" y2="3"/>
					<line x1="12" y1="21" x2="12" y2="23"/>
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
					<line x1="1" y1="12" x2="3" y2="12"/>
					<line x1="21" y1="12" x2="23" y2="12"/>
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
				</svg>
			);
		} else {
			// Monitor/auto icon for system theme
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
					<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
					<line x1="8" y1="21" x2="16" y2="21"/>
					<line x1="12" y1="17" x2="12" y2="21"/>
				</svg>
			);
		}
	};

	return (
		<button
			onClick={cycleTheme}
			className="btn btn-outline btn-primary btn-square"
			aria-label={`Current theme: ${theme || "system"}. Click to cycle theme.`}
			title={`Theme: ${theme || "system"}`}
		>
			{getIcon()}
		</button>
	);
};

export default ThemeToggle;

