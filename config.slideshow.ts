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
		imageSrc: "/welcome.jpg",
		bullets: [
			"Feel free to make yourself at home — this is your space too!",
			"I'm usually around if you need anything — just ask!",
		],
	},
	{
		id: "meeting-point",
		title: "Meeting point",
		subtitle: "Where we'll meet",
		imageSrc: "/meeting_point.jpg",
		bullets: [
			"Max Burger, Dybbølsbro (street level)",
			"Message me when you arrive — I’ll come down",
			"If delayed, grab a coffee at the Riccos",
		],
	},
	{
		id: "wifi",
		title: "WiFi",
		subtitle: "Get connected - scan the QR code or connect manually",
		wifiSsid: "NOKIA-4351",
		wifiPassword: "k7LrxabPBw",
		wifiAuthType: "WPA",
	},
	{
		id: "house-rules",
		title: "House Rules",
		subtitle: "Please respect these guidelines",
		imageSrc: "/kaktus.jpg",
		bullets: [
			"No smoking indoors",
			"Shoes off at the entrance",
			"Quiet hours after 23:00",
			"Please clean up after yourself",
		],
	},
	{
		id: "things-to-do",
		title: "Things to do",
		subtitle: "Explore Copenhagen",
		bullets: [
			"Tivoli Gardens",
			"Nyhavn waterfront",
			"Street food: Reffen / Broens",
			"Pastry, smørrebrød, hotdogs",
			"Torvehallerne market",
			"The Little Mermaid",
		],
		ctaText: "See my curated list of things to do",
		ctaHref: "https://maps.app.goo.gl/szvaLUr9ZTsHve416?g_st=i",
	},
	{
		id: "essentials",
		title: "Local essentials",
		subtitle: "Useful to know",
		bullets: [
			"Nearest supermarket: Lidl or Føtex (5 min walk)",
			"Pharmacy: Apotek Vesterbro (10 min)",
			"Metro: Havneholmen Station",
			"Use DOT/Rejsekort for tickets",
		],
	},
    {
        id: "amenities",
        title: "Amenities",
        subtitle: "What's available in my building",
        bullets: [
            "Bike parking - I have a bike you can use",
            "Laundry machine and dryer",
            "Shared kitchen for bigger groups",
            "Social space with a TV and a ping pong table",
            "Working space with a desk and a chair",

        ],
    },
];


