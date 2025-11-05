export interface SlideItem {
	id: string;
	title: string;
	subtitle?: string;
	body?: string;
	bullets?: string[];
	ctaText?: string;
	ctaHref?: string;
	// Optional Wi‑Fi payload (renders QR automatically when provided)
	wifiSsid?: string;
	wifiPassword?: string;
	wifiAuthType?: "WPA" | "WEP" | "nopass";
	// Optional image for the slide (served from /public)
	imageSrc?: string;
}

export const slides: SlideItem[] = [
	{
		id: "welcome",
		title: "Welcome",
		subtitle: "Glad you're here!",
		body: "A quick intro to your stay and how to make the most of it.",
	},
	{
		id: "meeting-point",
		title: "Meeting point",
		imageSrc: "/meeting_point.jpg",
		bullets: [
			"Max Burger",
			"I will pick you up from the entrance",
		],
	},
	{
		id: "wifi",
		title: "WiFi",
		bullets: ["Scan the QR or use the details below"],
		wifiSsid: "NOKIA-4351",
		wifiPassword: "k7LrxabPBw",
		wifiAuthType: "WPA",
	},
	{
		id: "house-rules",
		title: "House Rules",
		bullets: [
			"No smoking indoors",
			"Quiet hours after 22:00",
			"Please clean up after yourself",
		],
	},
	{
		id: "things-to-do",
		title: "Things to do",
		bullets: [
			"Visit Tivoli Gardens",
            "Walk by Nyhavn and see the colorful houses",
			"Enjoy the streetfood at Reffen or Broens",
            "Indulge in a local delicacy like pastry, smørbrød or a hotdog",
            "Visit the local market at Torvehallerne",
            "See the Little Mermaid at the waterfront",
            "++++"
		],
		ctaText: "See my curated list of things to do",
		ctaHref: "https://maps.app.goo.gl/szvaLUr9ZTsHve416?g_st=i",
	},
];


