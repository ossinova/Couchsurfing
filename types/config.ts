export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "autumn"
  | "";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    videoId?: string; // YouTube video ID
  };
  faq?: {
    question: string;
    answer: string;
  }[];
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  host?: {
    // Person
    name: string;
    age?: number; // optional explicit age
    birthday?: string; // ISO date string for deriving age
    originCountry?: string;
    nationality?: string;
    photo?: string;
    email?: string;
    phone?: string;
    instagram?: string;
    whatsapp?: string;
    couchsurfing?: string;
    hobbies?: string[];
    favorites?: {
      food?: string;
      country?: string;
    };
    countriesLived?: string[];

    // Apartment / address
    houseName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    intercom?: string;
    notes?: string;
    nearbyTransit?: {
      trainStation?: string;
      buses?: string[];
      airportRoute?: string;
    };

    // Stay details
    maxGuests?: number;
    availabilityNote?: string;
    rules?: string[];
    languages?: string[];
    emergencyContacts?: Array<{
      name: string;
      number: string;
      description?: string;
    }>;
  };
  crisp: {
    id?: string;
    onlyShowOnRoutes?: string[];
  };
  stripe: {
    plans: {
      isFeatured?: boolean;
      priceId: string;
      name: string;
      description?: string;
      price: number;
      priceAnchor?: number;
      features: {
        name: string;
      }[];
    }[];
  };
  aws?: {
    bucket?: string;
    bucketUrl?: string;
    cdn?: string;
  };
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail?: string;
  };
  colors: {
    theme: Theme;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}
