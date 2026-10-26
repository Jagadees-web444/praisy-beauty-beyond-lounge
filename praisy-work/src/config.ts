export const salonConfig = {
  // Customer-provided PRAISY WhatsApp contact: keep this as the single source of truth.
  // Use international format with country code (91) and digits only.
  // Leave blank only while testing: the booking flow opens WhatsApp's recipient picker.
  whatsappNumber: "916385380876",
  phoneDisplay: "+91 63853 80876",
  address: "",
  email: "",
  openingHours: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
};

export const cinematicAssets = {
  hero: {
    videoSrc: "/videos/praisy-hero.mp4" as string | null,
    mobileVideoSrc: "/videos/praisy-hero-mobile.mp4" as string | null,
    poster: "/images/hero-poster.jpg",
  },
  middle: {
    videoSrc: "/videos/praisy-middle.mp4" as string | null,
    mobileVideoSrc: "/videos/praisy-middle-mobile.mp4" as string | null,
    poster: "/images/middle-poster.jpg",
  },
  bottom: {
    videoSrc: "/videos/praisy-finale.mp4" as string | null,
    mobileVideoSrc: "/videos/praisy-finale-mobile.mp4" as string | null,
    poster: "/images/finale-poster.jpg",
  },
};
