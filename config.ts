import { ConfigProps } from "./types/config";

// DaisyUI v5 no longer exports themes directly, using fallback color
const themes = {
  light: {
    primary: "#ff6a2d", // couchsurfing-like orange
  },
  autumn: {
    primary: "#", // couchsurfing-like orange
  },
  dark: {
    primary: "#636363", // c
  },
};

const config = {
  // REQUIRED
  appName: "CPH-Couchsurfing",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Community-driven couchsurfing in Copenhagen. Meet locals, stay with hosts, and share experiences.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  
  // Hero section
  hero: {
    title: "Stay with a Local in Copenhagen",
    subtitle: "Cozy home, friendly vibes, and insider tips—right in the heart of the city.",
    backgroundImage: "/kaktus.jpg",
    videoId: "kRRoCKmsf2Y" // Replace with your actual YouTube video ID
  },
  domainName: "localhost", // update to your real domain when ready
  
  // Host section
  host: {
    houseName: 'Kaktus Towers',
    addressLine1: 'Dybbølsbro 3',
    addressLine2: 'Apartment 13.1',
    city: 'Copenhagen',
    postalCode: '1577',
    country: 'Denmark',
    intercom: '13.1',
    notes: 'Close to Dybbølsbro Station. Use intercom and take elevator to 13th floor.',
    phone: '+47 98605552',
    nearbyTransit: {
      trainStation: 'Dybbølsbro Station',
      buses: ['1A', '2A', '5A', '6A'],
      airportRoute: 'Metro M2 to Kongens Nytorg, then M4 to Havneholmen',
    },
    name: 'Oscar Dyremyhr',
    birthday: '1995-05-20',
    nationality: 'Norwegian',
    hobbies: ['Traveling', 'Walking', 'Skiing', 'Socializing', "Photography"],
    favorites: {
      food: 'Thai',
      country: 'Burma / Myanmar',
    },
    countriesLived: ['Norway', 'Thailand', 'USA', 'Denmark'],
    maxGuests: 2,
    photo: '/me.jpg',
    // Social media
    instagram: 'norsehorizon',
    whatsapp: '+47 98605552',
    couchsurfing: 'https://www.couchsurfing.com/people/oscar-dyremyhr-1',
    // Emergency contacts
    emergencyContacts: [
      {
        name: 'Oscar (Host)',
        number: '+47 98605552',
        description: 'Available 24/7 for emergencies'
      },
      {
        name: 'Emergency Services',
        number: '112',
        description: 'Police, Fire, Medical'
      }
    ],
  },
  // FAQ section
  faq: [
    {
      question: "What are check‑in and check‑out times?",
      answer: "Check‑in from 15:00 when possible; check‑out by 11:00. I can store bags if schedules don't align."
    },
    {
      question: "How do I get to your place?",
      answer: "Take the metro to Dybbølsbro Station (2 min walk). From airport: Metro M2 to Kongens Nytorg, then M4 to Havneholmen. Use intercom 13.1 and take elevator to 13th floor. Close to Dybbølsbro Station. Use intercom and take elevator to 13th floor."
    },
    {
      question: "Can I use the kitchen?",
      answer: "Yes — you're welcome to cook. Please clean as you go and be mindful during quiet hours."
    },
    {
      question: "What's the WiFi password?",
      answer: "The WiFi details are provided in the WiFi section above, or scan the QR code for instant connection."
    },
    {
      question: "What if I have an emergency?",
      answer: "Call me at +47 98605552 (available 24/7) or emergency services at 112. I'm here to help!"
    }
  ],
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Starter",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Perfect for small projects",
        // The price you want to display, the one user will be charged on Stripe.
        price: 99,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 149,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Advanced",
        description: "You need more power",
        price: 149,
        priceAnchor: 299,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
          { name: "1 year of updates" },
          { name: "24/7 support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `CPH-Couchsurfing <noreply@cph-couchsurfing.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `CPH-Couchsurfing Team <team@cph-couchsurfing.com>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@cph-couchsurfing.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "autumn",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
