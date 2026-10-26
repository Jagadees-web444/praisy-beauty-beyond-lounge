import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cinematicAssets, salonConfig } from "./config";

type ServiceCategory =
  | "Hair"
  | "Skin"
  | "Bridal"
  | "Makeup"
  | "Nails"
  | "Body Care"
  | "Spa";

type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  image: string;
};

type GalleryItem = {
  title: string;
  image: string;
};

const services: Service[] = [
  {
    id: "hair-styling",
    name: "Hair Styling",
    category: "Hair",
    description: "A considered finish for your everyday or occasion look.",
    image: "/images/hair-editorial.webp",
  },
  {
    id: "hair-design",
    name: "Haircut & Hair Design",
    category: "Hair",
    description: "Shape and detail, guided by the look you have in mind.",
    image: "/images/services/hair-design.webp",
  },
  {
    id: "hair-spa",
    name: "Hair Spa",
    category: "Spa",
    description: "A moment to pause, with hair-care rituals at the centre.",
    image: "/images/services/hair-spa.webp",
  },
  {
    id: "hair-treatments",
    name: "Hair Treatments",
    category: "Hair",
    description: "A focused care moment for the needs of your hair.",
    image: "/images/services/hair-treatments.webp",
  },
  {
    id: "hair-colouring",
    name: "Hair Colouring",
    category: "Hair",
    description: "Explore colour ideas and finishes that feel like you.",
    image: "/images/services/hair-colouring.webp",
  },
  {
    id: "facial-treatments",
    name: "Facial Treatments",
    category: "Skin",
    description: "A considered facial experience, tailored to your enquiry.",
    image: "/images/skin-editorial.webp",
  },
  {
    id: "advanced-skincare",
    name: "Advanced Skincare",
    category: "Skin",
    description: "Thoughtful skincare options for your personal routine.",
    image: "/images/services/advanced-skincare.webp",
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    category: "Bridal",
    description: "A beauty look to explore for your most meaningful day.",
    image: "/images/bridal-editorial.webp",
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    category: "Makeup",
    description: "Polished makeup ideas for celebrations and evenings out.",
    image: "/images/services/party-makeup.webp",
  },
  {
    id: "engagement-makeup",
    name: "Engagement Makeup",
    category: "Bridal",
    description: "A softly finished look for an occasion worth remembering.",
    image: "/images/services/engagement-makeup.webp",
  },
  {
    id: "manicure",
    name: "Manicure",
    category: "Nails",
    description: "A little time for considered nail and hand care.",
    image: "/images/nail-editorial.webp",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    category: "Nails",
    description: "A restorative foot-care moment with a polished finish.",
    image: "/images/services/pedicure.webp",
  },
  {
    id: "nail-art",
    name: "Nail Art",
    category: "Nails",
    description: "Subtle details or expressive designs, chosen by you.",
    image: "/images/services/nail-art.webp",
  },
  {
    id: "eyebrow-shaping",
    name: "Eyebrow Shaping",
    category: "Skin",
    description: "A refined brow shape, discussed around your preference.",
    image: "/images/services/eyebrow-shaping.webp",
  },
  {
    id: "threading",
    name: "Threading",
    category: "Skin",
    description: "A precise grooming option for your beauty routine.",
    image: "/images/services/threading.webp",
  },
  {
    id: "waxing",
    name: "Waxing",
    category: "Body Care",
    description: "Enquire about a body-care option suited to your needs.",
    image: "/images/services/waxing.webp",
  },
  {
    id: "body-care",
    name: "Body Care",
    category: "Body Care",
    description: "A thoughtful pause devoted to body-care essentials.",
    image: "/images/services/body-care.webp",
  },
  {
    id: "relaxation-spa",
    name: "Relaxation Spa Treatments",
    category: "Spa",
    description: "A calmer moment in a setting made for slowing down.",
    image: "/images/services/relaxation-spa.webp",
  },
  {
    id: "saree-draping",
    name: "Saree Draping",
    category: "Bridal",
    description: "A considered drape for celebrations and special occasions.",
    image: "/images/services/saree-draping.webp",
  },
  {
    id: "pre-bridal",
    name: "Pre-Bridal Beauty Packages",
    category: "Bridal",
    description: "Discuss a personalised beauty plan ahead of your day.",
    image: "/images/services/pre-bridal.webp",
  },
];

const featuredServiceIds = [
  "hair-styling",
  "hair-design",
  "facial-treatments",
  "bridal-makeup",
  "manicure",
  "relaxation-spa",
];

const featuredServices = services.filter((service) =>
  featuredServiceIds.includes(service.id),
);
const extendedServices = services.filter(
  (service) => !featuredServiceIds.includes(service.id),
);

const galleryItems: GalleryItem[] = [
  { title: "Orchid and serum", image: "/images/gallery/orchid-serum.webp" },
  { title: "Glossy hair detail", image: "/images/gallery/glossy-hair.webp" },
  { title: "The salon interior", image: "/images/gallery/salon-interior.webp" },
  { title: "Makeup palette and brushes", image: "/images/gallery/makeup-tools.webp" },
  { title: "Skincare textures", image: "/images/gallery/skincare.webp" },
  { title: "Bridal details", image: "/images/gallery/bridal-details.webp" },
  { title: "Nail artistry", image: "/images/gallery/nail-art.webp" },
  { title: "A quiet spa moment", image: "/images/gallery/quiet-spa.webp" },
];

const filters = [
  "All",
  "Hair",
  "Skin",
  "Bridal",
  "Makeup",
  "Nails",
  "Body Care",
  "Spa",
] as const;

const signatureTreatments = [
  {
    title: "Rejuvenating Facials",
    description: "A considered facial experience, shaped around your enquiry.",
    image: "/images/services/facial-treatments.webp",
  },
  {
    title: "Bridal Beauty",
    description: "Thoughtful details for a day that is uniquely yours.",
    image: "/images/services/bridal-makeup.webp",
  },
  {
    title: "Advanced Skincare",
    description: "Explore skincare options for your own beauty ritual.",
    image: "/images/services/advanced-skincare.webp",
  },
  {
    title: "Nail & Hand Care",
    description: "Careful finishing touches, from hands to fingertips.",
    image: "/images/services/manicure.webp",
  },
  {
    title: "Relaxation Treatments",
    description: "Space to slow down and settle into the moment.",
    image: "/images/services/relaxation-spa.webp",
  },
];

const approachPoints = [
  {
    title: "Personalised beauty",
    copy: "A conversation about the look, feel and details you have in mind.",
  },
  {
    title: "Thoughtful choices",
    copy: "Treatments and rituals to explore at your own pace.",
  },
  {
    title: "Attention to detail",
    copy: "The small finishing touches are part of the experience.",
  },
  {
    title: "Time to unwind",
    copy: "An atmosphere designed to make room for a little pause.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="whatsapp-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M20.1 11.8a8.1 8.1 0 0 1-11.9 7.1l-4.2 1.1 1.1-4.1a8.1 8.1 0 1 1 15-4.1Z" />
      <path d="M9.1 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.3-.1.5.5.9 1.2 1.6 2.1 2.1.2.1.3.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.5.5-1.2.7-1.9.6-1.1-.2-2.4-.8-3.8-2-1.1-.9-2-2.2-2.4-3.4-.3-.9 0-1.7.3-2.1.3-.3.6-.5.9-.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.1" />
      <circle cx="12" cy="12" r="4.1" />
      <circle className="social-icon-dot" cx="17.6" cy="6.7" r="1" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M14.2 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.4-.2-2.6-.2-2.7 0-4.5 1.6-4.5 4.6v2.2H7.5V13h2.9v8" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M21 7.2a2.7 2.7 0 0 0-1.9-1.9C17.4 4.8 12 4.8 12 4.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 7.2a28 28 0 0 0-.5 4.8 28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="menu-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

function useViewportActive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && entry.intersectionRatio >= 0.15),
      { threshold: [0, 0.15] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isActive };
}

function useMobileVideoSource() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const mobile = window.matchMedia("(max-width: 760px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const updatePosition = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!image.isConnected) return;
        if (mobile.matches || reduced.matches) {
          image.style.setProperty("--parallax-y", "0px");
          return;
        }
        const rect = image.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = Math.max(-16, Math.min(16, distance * -0.025));
        image.style.setProperty("--parallax-y", `${offset}px`);
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    mobile.addEventListener("change", updatePosition);
    reduced.addEventListener("change", updatePosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      mobile.removeEventListener("change", updatePosition);
      reduced.removeEventListener("change", updatePosition);
    };
  }, []);

  return (
    <img
      ref={imageRef}
      className="parallax-image"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

function Navigation({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];

  return (
    <header className={`site-header ${scrolled ? "is-solid" : ""}`}>
      <div className="nav-shell">
        <a className="nav-brand" href="#home" onClick={closeMenu} aria-label="PRAISY home">
          PRAISY
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button className="nav-book" type="button" onClick={onBook}>
          Book appointment <ArrowIcon />
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <nav
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            {label}
          </a>
        ))}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => { closeMenu(); onBook(); }}
        >
          Book appointment <ArrowIcon />
        </button>
      </nav>
    </header>
  );
}

function CinematicFilm({
  variant,
  id,
  labelledBy,
  eager = false,
  className = "",
  children,
}: {
  variant: "hero" | "middle" | "bottom";
  id: string;
  labelledBy: string;
  eager?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { ref: sectionRef, isActive: nearViewport } = useViewportActive<HTMLSectionElement>();
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileVideoSource();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const asset = cinematicAssets[variant];
  const videoSource = isMobile && asset.mobileVideoSrc ? asset.mobileVideoSrc : asset.videoSrc;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`cinematic-film cinematic-${variant} ${className}`}
      aria-labelledby={labelledBy}
      data-video-status={asset.videoSrc ? "configured" : "poster-fallback"}
    >
      <div className="film-media" aria-hidden="true">
        <img
          className="film-poster"
          src={asset.poster}
          alt=""
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
        {asset.videoSrc && nearViewport && !reducedMotion && !videoFailed && (
          <video
            className={`film-video ${videoReady ? "is-ready" : ""}`}
            autoPlay
            loop
            muted
            playsInline
            preload={eager && !isMobile ? "metadata" : "none"}
            poster={asset.poster}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src={videoSource ?? undefined} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="film-shade" aria-hidden="true" />
      <div className="film-content">{children}</div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </Reveal>
      <span className="heading-rule" aria-hidden="true" />
    </div>
  );
}

function ServiceCard({
  service,
  index,
  compact = false,
  onEnquire,
}: {
  service: Service;
  index: number;
  compact?: boolean;
  onEnquire: (name: string) => void;
}) {
  return (
    <Reveal className={`service-card ${compact ? "is-compact" : ""}`} delay={(index % 4) * 65}>
      <img
        src={service.image}
        alt={`${service.name} beauty editorial photograph`}
        className="service-card-image"
        loading={index < 3 ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="service-card-body">
        <p className="service-category">{service.category}</p>
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <button className="text-link" type="button" onClick={() => onEnquire(service.name)}>
          Enquire <ArrowIcon />
        </button>
      </div>
    </Reveal>
  );
}

function MainServices({ onBook }: { onBook: (name?: string) => void }) {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="content-shell">
        <div className="service-intro-row">
          <SectionHeading
            eyebrow="THE SERVICE MENU"
            title="Beauty, considered."
            titleId="services-title"
            description="Explore a selection of beauty experiences, then get in touch to discuss what feels right for you."
          />
          <Reveal className="service-menu-note">
            <p>From a polished finishing touch to time to unwind.</p>
            <a className="text-link" href="#additional-services">
              Explore all services <ArrowIcon />
            </a>
          </Reveal>
        </div>

        <div className="service-grid featured-service-grid">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onEnquire={onBook}
            />
          ))}
        </div>
        <p className="availability-note">
          This is an editable starting menu. Please confirm service availability and pricing directly with PRAISY.
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref: mediaRef, isActive: mediaInView } = useViewportActive<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileVideoSource();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="about-section section" id="about" aria-labelledby="about-title">
      <div className="about-layout content-shell">
        <div className="about-media" ref={mediaRef}>
          <img
            className="about-video-poster"
            src="/images/about-hair-poster.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
          {mediaInView && !reducedMotion && !videoFailed && (
            <video
              className={`section-ambient-video ${videoReady ? "is-ready" : ""}`}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/images/about-hair-poster.jpg"
              aria-label="Cinematic close-up of flowing glossy black hair against a deep-violet background"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
            >
              <source src={isMobile ? "/videos/praisy-about-hair-mobile.mp4" : "/videos/praisy-about-hair.mp4"} type="video/mp4" />
            </video>
          )}
          <div className="media-quote about-media-quote">
            <span className="media-quote-eyebrow">THE FEELING OF BEAUTY</span>
            <p lang="ta">அழகு என்பது தோற்றம் மட்டுமல்ல;<br />அது ஒரு உணர்வு.</p>
            <span className="media-quote-line" aria-hidden="true" />
          </div>
        </div>

        <div className="about-copy">
          <Reveal>
            <p className="eyebrow">A LITTLE ABOUT PRAISY</p>
            <h2 id="about-title">Where beauty meets intention.</h2>
            <p className="body-copy">
              At PRAISY, every detail is considered. Our aim is to create a welcoming beauty experience through thoughtfully selected treatments, personalised attention, and an atmosphere designed for relaxation.
            </p>
            <a className="text-link" href="#signature">
              Discover the approach <ArrowIcon />
            </a>
          </Reveal>
          <div className="about-aside" aria-hidden="true">
            <span>01</span>
            <span>Beauty with intention</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureSection({ onBook }: { onBook: (name?: string) => void }) {
  const { ref: bridalMediaRef, isActive: bridalMediaInView } = useViewportActive<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileVideoSource();
  const [bridalVideoReady, setBridalVideoReady] = useState(false);
  const [bridalVideoFailed, setBridalVideoFailed] = useState(false);

  return (
    <section className="section signature-section" id="signature" aria-labelledby="signature-title">
      <div className="content-shell">
        <SectionHeading
          eyebrow="SIGNATURE TREATMENTS"
          title="Small rituals. Beautiful details."
          titleId="signature-title"
          description="A closer look at a few experiences to ask PRAISY about."
          className="signature-heading"
        />

        <div className="signature-layout">
          <div className="signature-feature bridal-feature">
            <div className="signature-feature-image" ref={bridalMediaRef}>
              <img
                className="bridal-video-poster"
                src="/images/bridal-signature-poster.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
              {bridalMediaInView && !reducedMotion && !bridalVideoFailed && (
                <video
                  className={`section-ambient-video ${bridalVideoReady ? "is-ready" : ""}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/images/bridal-signature-poster.jpg"
                  aria-label="Cinematic close-up of Indian bridal jewellery, burgundy silk, and jasmine flowers; no faces shown"
                  onCanPlay={() => setBridalVideoReady(true)}
                  onError={() => setBridalVideoFailed(true)}
                >
                  <source src={isMobile ? "/videos/praisy-bridal-signature-mobile.mp4" : "/videos/praisy-bridal-signature.mp4"} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="signature-feature-copy bridal-feature-copy">
              <p className="eyebrow">01 / BRIDAL SIGNATURE</p>
              <h3 lang="ta">அழகாய் ஒரு தொடக்கம்.</h3>
              <p lang="ta">உங்கள் வாழ்வின் அழகான நாளுக்கு, அன்போடும் அழகோடும் ஒரு சிறப்பு அனுபவம்.</p>
              <button className="text-link" type="button" onClick={() => onBook("Bridal Package")}>
                Enquire about bridal packages <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="signature-list">
            {signatureTreatments.map((treatment, index) => (
              <Reveal className="signature-list-item" key={treatment.title} delay={index * 65}>
                <img
                  src={treatment.image}
                  alt={`${treatment.title} editorial detail`}
                  className="signature-thumb"
                  loading="lazy"
                  decoding="async"
                />
                <div className="signature-list-copy">
                  <p className="signature-index">0{index + 2}</p>
                  <h3>{treatment.title}</h3>
                  <p>{treatment.description}</p>
                </div>
                <button
                  className="icon-link"
                  type="button"
                  aria-label={`Enquire about ${treatment.title}`}
                  onClick={() => onBook(treatment.title)}
                >
                  <ArrowIcon />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtendedServices({ onBook }: { onBook: (name?: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const displayedServices =
    activeFilter === "All"
      ? extendedServices
      : extendedServices.filter((service) => service.category === activeFilter);

  return (
    <section
      className="section extended-services-section"
      id="additional-services"
      aria-labelledby="extended-title"
    >
      <div className="content-shell">
        <div className="extended-heading-row">
          <SectionHeading
            eyebrow="EXPLORE THE MENU"
            title="Find your kind of care."
            titleId="extended-title"
            description="Filter the editable service menu by the experience you would like to explore."
          />
          <span className="availability-label">Service availability to be confirmed</span>
        </div>

        <div className="service-filters" role="group" aria-label="Filter services by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "is-active" : ""}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="filter-result" aria-live="polite">
          {displayedServices.length} {displayedServices.length === 1 ? "service" : "services"} to explore
        </p>
        <div className="service-grid extended-service-grid">
          {displayedServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              compact
              onEnquire={onBook}
            />
          ))}
        </div>
        <p className="availability-note">
          Services shown are a suggested starting catalogue, not a confirmed list of current salon offerings.
        </p>
      </div>
    </section>
  );
}

function keepFocusInside(event: KeyboardEvent, dialog: HTMLElement | null) {
  if (event.key !== "Tab" || !dialog) return;
  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
    ),
  );
  if (focusable.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalOpen = lightboxIndex !== null;

  useEffect(() => {
    if (!modalOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const closeOnKey = (event: KeyboardEvent) => {
      keepFocusInside(event, dialogRef.current);
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % galleryItems.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnKey);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnKey);
      previouslyFocused?.focus();
    };
  }, [modalOpen]);

  const activeItem = lightboxIndex === null ? null : galleryItems[lightboxIndex];

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="content-shell">
        <div className="gallery-heading-row">
          <SectionHeading
            eyebrow="PRAISY SIGNATURE COLLECTION"
            title="Moments of elegance."
            titleId="gallery-title"
            description="Every detail tells a story of elegance, artistry and timeless beauty."
          />
          <p className="gallery-index">01 <span>—</span> 08</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <button
              className={`gallery-item gallery-item-${index + 1}`}
              type="button"
              key={item.title}
              aria-label={`Open gallery image: ${item.title}`}
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
                loading="lazy"
                decoding="async"
              />
              <span className="gallery-item-label">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {activeItem && lightboxIndex !== null && (
        <div
          className="lightbox-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <div ref={dialogRef} className="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Beauty gallery image" tabIndex={-1}>
            <button
              ref={closeRef}
              className="lightbox-close"
              type="button"
              aria-label="Close gallery"
              onClick={() => setLightboxIndex(null)}
            >
              <MenuIcon open />
            </button>
            <button
              className="lightbox-step lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length)}
            >
              <ArrowIcon />
            </button>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="lightbox-image"
              loading="eager"
              decoding="async"
            />
            <div className="lightbox-caption" aria-live="polite">
              <span>{String(lightboxIndex + 1).padStart(2, "0")}</span>
              <p>{activeItem.title}</p>
            </div>
            <button
              className="lightbox-step lightbox-next"
              type="button"
              aria-label="Next image"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryItems.length)}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

type BookingDetails = { customerName: string; customerPhone: string; serviceName: string; preferredDate: string; preferredTime: string; eventType: string; eventDate: string; guests: string; notes: string };
const emptyBooking: BookingDetails = { customerName: "", customerPhone: "", serviceName: "", preferredDate: "", preferredTime: "", eventType: "", eventDate: "", guests: "", notes: "" };

function BookingFlow({ initialService, onClose }: { initialService?: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [details, setDetails] = useState<BookingDetails>({ ...emptyBooking, serviceName: initialService ?? "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState<"details" | "review">("details");
  const [conciergeMessage, setConciergeMessage] = useState("Vanakkam! I’m your PRAISY Concierge. I’ll help prepare your appointment request. Share a few details and I’ll organise them into a WhatsApp message for our team.");
  const [conciergeQuestion, setConciergeQuestion] = useState("");
  const [conciergeReply, setConciergeReply] = useState("");
  const askConcierge = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = conciergeQuestion.trim();
    if (!question) return;
    const q = question.toLowerCase();
    let reply = "I can help you prepare your enquiry. Choose the service you have in mind and share your preferred date and time below. The PRAISY team will confirm the actual availability and pricing directly on WhatsApp.";
    if (/bridal|wedding|engagement|reception|mehendi|haldi|marriage/.test(q)) {
      reply = "For a bridal or wedding enquiry, choose ‘Bridal Package’ or ‘Bridal Makeup’ in the form. You’ll then see fields for event type, event date and how many people need services. The team can confirm package options and availability over WhatsApp.";
    } else if (/price|cost|rate|budget|package/.test(q)) {
      reply = "I don’t have a verified live price list, so I won’t guess. Tell us which treatment you’re interested in and send the enquiry on WhatsApp; the PRAISY team can share current pricing and package details.";
    } else if (/available|availability|slot|time|open|today|tomorrow/.test(q)) {
      reply = "Please select your preferred date and time in the form. Those are requests, not confirmed slots; PRAISY will check the salon schedule and reply on WhatsApp.";
    } else if (/hair|facial|skin|nail|makeup|spa|thread|wax/.test(q)) {
      reply = "You can choose the closest matching service from the service list. Add any preferences in ‘Anything else we should know?’ and send the enquiry; the team can help refine the treatment if you’re unsure.";
    } else if (/cancel|change|reschedule|edit/.test(q)) {
      reply = "If you need to change an existing booking, please message PRAISY directly on its official WhatsApp contact with your name and original appointment date. This form creates a new enquiry; it does not change an existing reservation.";
    }
    setConciergeReply(reply);
    setConciergeQuestion("");
  };
  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const closeOnEscape = (event: KeyboardEvent) => { keepFocusInside(event, dialogRef.current); if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); previouslyFocused?.focus(); };
  }, [onClose]);
  const update = (field: keyof BookingDetails, value: string) => {
    setDetails(current => ({ ...current, [field]: value })); setError("");
    if (field === "serviceName") setConciergeMessage(/bridal|pre-bridal/i.test(value) ? "Lovely choice. For bridal enquiries, event type and event date help our team prepare the right follow-up." : "Wonderful. Add your preferred date and time. The PRAISY team will confirm availability on WhatsApp.");
  };
  const isBridal = /bridal|pre-bridal/i.test(details.serviceName) || Boolean(details.eventType || details.eventDate);
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  const readableDate = (value: string) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Not specified";
  const buildMessage = () => ["Hello PRAISY Beauty Lounge! ✨", "I'd like to request an appointment. Please confirm availability.", "", `Customer name: ${details.customerName.trim()}`, `Contact number: ${details.customerPhone.trim()}`, `Service: ${details.serviceName}`, `Preferred appointment date: ${readableDate(details.preferredDate)}`, `Preferred time: ${details.preferredTime}`, ...(isBridal ? [`Event type: ${details.eventType || "Not specified"}`, `Event date: ${readableDate(details.eventDate)}`, `Guests / people needing service: ${details.guests || "Not specified"}`] : []), `Additional details: ${details.notes.trim() || "None"}`, "", "Please let me know the availability and next steps. Thank you!"].join("\n");
  const continueToReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!details.customerName.trim() || !details.customerPhone.trim() || !details.serviceName || !details.preferredDate || !details.preferredTime) { setError("Please complete your name, contact number, service, preferred date and time."); return; }
    if (!/^[+()\d\s-]{7,20}$/.test(details.customerPhone.trim())) { setError("Please enter a valid contact number."); return; }
    if (details.preferredDate < minDate) { setError("Please choose today or a future date for your appointment."); return; }
    if (details.eventDate && details.eventDate < minDate) { setError("Please choose today or a future date for the event."); return; }
    setError(""); setStep("review"); setConciergeMessage("Thank you! I’ve organised your request below. Review it, then continue to WhatsApp to send it to the PRAISY team.");
  };
  const sendToWhatsApp = () => {
    const phone = salonConfig.whatsappNumber.replace(/\D/g, "");
    const message = encodeURIComponent(buildMessage());
    // A configured official number routes directly to PRAISY. With no verified
    // number available yet, open WhatsApp's recipient picker rather than inventing one.
    const destination = phone.length >= 8 ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;
    window.open(destination, "_blank", "noopener,noreferrer");
    if (phone.length < 8) setError("PRAISY’s official WhatsApp number has not been configured. WhatsApp will open with your details pre-filled; please select PRAISY’s official contact before sending.");
  };
  return <div className="lightbox-backdrop booking-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialogRef} className="booking-notice booking-flow" role="dialog" aria-modal="true" aria-labelledby="booking-notice-title" tabIndex={-1}>
      <button ref={closeRef} className="lightbox-close" type="button" aria-label="Close booking concierge" onClick={onClose}><MenuIcon open /></button>
      <p className="eyebrow">PRAISY PERSONAL ASSISTANCE</p><h2 id="booking-notice-title">Your beauty, thoughtfully planned.</h2>
      <div className="concierge-message" aria-live="polite"><span className="concierge-mark" aria-hidden="true">P</span><div><strong>PRAISY AI Concierge</strong><p>{conciergeMessage}</p></div></div>
      <form className="concierge-ask" onSubmit={askConcierge}>
        <label htmlFor="concierge-question">Ask a quick question</label>
        <div className="concierge-ask-row"><input id="concierge-question" value={conciergeQuestion} onChange={e => setConciergeQuestion(e.target.value)} placeholder="E.g. I’m planning a wedding…" /><button type="submit">Ask</button></div>
        {conciergeReply && <p className="concierge-reply" aria-live="polite">{conciergeReply}</p>}
      </form>
      {step === "details" ? <form className="booking-form" onSubmit={continueToReview}><div className="booking-form-grid">
        <label>Your name *<input autoComplete="name" value={details.customerName} onChange={e=>update("customerName",e.target.value)} placeholder="Enter your full name" required /></label>
        <label>Contact number *<input autoComplete="tel" inputMode="tel" value={details.customerPhone} onChange={e=>update("customerPhone",e.target.value)} placeholder="+91 98765 43210" required /></label>
        <label className="booking-field-wide">Service you’re interested in *<select value={details.serviceName} onChange={e=>update("serviceName",e.target.value)} required><option value="">Choose a service</option>{services.map(service=><option key={service.id} value={service.name}>{service.name}</option>)}<option value="Bridal Package">Bridal Package</option><option value="Party Makeup">Party Makeup</option><option value="Personalised Consultation">Personalised Consultation</option></select></label>
        <label>Preferred date *<input type="date" min={minDate} value={details.preferredDate} onChange={e=>update("preferredDate",e.target.value)} required /></label>
        <label>Preferred time *<select value={details.preferredTime} onChange={e=>update("preferredTime",e.target.value)} required><option value="">Choose a time</option><option>10:00 AM – 12:00 PM</option><option>12:00 PM – 2:00 PM</option><option>2:00 PM – 4:00 PM</option><option>4:00 PM – 6:00 PM</option><option>6:00 PM – 8:00 PM</option></select></label>
        {isBridal && <><label>Event type<select value={details.eventType} onChange={e=>update("eventType",e.target.value)}><option value="">Choose event type</option><option>Wedding</option><option>Engagement</option><option>Reception</option><option>Mehendi / Haldi</option><option>Pre-bridal</option><option>Other event</option></select></label><label>Event date<input type="date" min={minDate} value={details.eventDate} onChange={e=>update("eventDate",e.target.value)} /></label><label className="booking-field-wide">Number of people needing services<input value={details.guests} onChange={e=>update("guests",e.target.value)} placeholder="e.g. Bride + 3 family members" /></label></>}
        <label className="booking-field-wide">Anything else we should know?<textarea value={details.notes} onChange={e=>update("notes",e.target.value)} rows={3} placeholder="Your look, preferred artist, questions, or special requests…" /></label>
      </div>{error && <p className="booking-error" role="alert">{error}</p>}<button className="button button-gold booking-submit" type="submit">Review appointment request <ArrowIcon /></button><p className="booking-consent">Your details will be included in the WhatsApp message you choose to send. Your appointment is not confirmed until PRAISY replies.</p></form> : <div className="booking-review"><h3>Review your request</h3><dl><div><dt>Name</dt><dd>{details.customerName}</dd></div><div><dt>Contact</dt><dd>{details.customerPhone}</dd></div><div><dt>Service</dt><dd>{details.serviceName}</dd></div><div><dt>Preferred date</dt><dd>{details.preferredDate}</dd></div><div><dt>Preferred time</dt><dd>{details.preferredTime}</dd></div>{isBridal && <div><dt>Event</dt><dd>{details.eventType || "Not specified"}{details.eventDate ? ` · ${details.eventDate}` : ""}</dd></div>}{isBridal && details.guests && <div><dt>People</dt><dd>{details.guests}</dd></div>}{details.notes.trim() && <div><dt>Notes</dt><dd>{details.notes}</dd></div>}</dl>{error && <p className="booking-error" role="alert">{error}</p>}<button className="button button-gold booking-submit" type="button" onClick={sendToWhatsApp}><WhatsAppIcon /> Continue to WhatsApp <ArrowIcon /></button><button className="booking-edit" type="button" onClick={()=>{setStep("details");setError("");}}>Edit details</button><p className="booking-consent">WhatsApp opens with your request pre-filled. Tap Send so the PRAISY team receives it. This does not automatically confirm your appointment.</p></div>}
    </div></div>;
}

function App() {
  const [bookingFlowOpen, setBookingFlowOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const handleBooking = (serviceName?: string) => { setBookingService(serviceName); setBookingFlowOpen(true); };
  const closeBookingFlow = () => setBookingFlowOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation onBook={() => handleBooking()} />

      <main id="main-content">
        <CinematicFilm variant="hero" id="home" labelledBy="hero-title" eager>
          <div className="hero-copy">
            <p className="hero-eyebrow">Beauty, beyond the ordinary</p>
            <p className="hero-brand">PRAISY</p>
            <div className="hero-heading-mask">
              <h1 id="hero-title">A More Beautiful You.</h1>
            </div>
            <p className="hero-description">Discover a more beautiful version of you.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#services">
                Explore our services <ArrowIcon />
              </a>
              <button className="button button-outline" type="button" onClick={() => handleBooking()}>
                <WhatsAppIcon /> Book on WhatsApp
              </button>
            </div>
          </div>
          <a className="hero-scroll" href="#introduction" aria-label="Scroll to discover PRAISY">
            <span>Scroll to discover</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </CinematicFilm>

        <section className="brand-introduction" id="introduction" aria-labelledby="intro-title">
          <Reveal className="intro-content">
            <p className="eyebrow">A MOMENT, MADE YOURS</p>
            <h2 id="intro-title">Come as you are.<br />Leave a little more you.</h2>
            <p>
              Thoughtful beauty experiences begin with a conversation about what matters to you.
            </p>
            <span className="intro-flourish" aria-hidden="true" />
          </Reveal>
        </section>

        <MainServices onBook={handleBooking} />
        <AboutSection />
        <SignatureSection onBook={handleBooking} />

        <CinematicFilm variant="middle" id="middle-film" labelledBy="middle-film-title" className="middle-film-section">
          <Reveal className="film-copy middle-film-copy">
            <p className="eyebrow">THE ART OF BEAUTY</p>
            <h2 id="middle-film-title">Every Detail.<br />An Expression of Elegance.</h2>
            <p>Discover thoughtfully curated beauty experiences designed around your individual style.</p>
            <a className="button button-outline" href="#additional-services">
              Explore our treatments <ArrowIcon />
            </a>
          </Reveal>
        </CinematicFilm>

        <ExtendedServices onBook={handleBooking} />
        <GallerySection />

        <section className="section approach-section" aria-labelledby="approach-title">
          <div className="content-shell approach-layout">
            <div className="approach-intro">
              <Reveal>
                <p className="eyebrow">WHY PRAISY</p>
                <h2 id="approach-title">A beauty experience, shaped around you.</h2>
                <p className="section-description">
                  The ideas that guide the PRAISY experience, ready to be made personal.
                </p>
              </Reveal>
            </div>
            <div className="approach-list">
              {approachPoints.map((point, index) => (
                <Reveal className="approach-point" key={point.title} delay={index * 75}>
                  <span className="approach-number">0{index + 1}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.copy}</p>
                  </div>
                  <span className="approach-line" aria-hidden="true" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="stories-section" aria-labelledby="stories-title">
          <div className="content-shell stories-layout">
            <Reveal className="stories-copy">
              <p className="eyebrow">CLIENT LOVE</p>
              <h2 id="stories-title">Every experience has its own voice.</h2>
              <p>A little inspiration for the beauty experience you have in mind.</p>
            </Reveal>
            <div className="sample-review-grid">
              <Reveal className="sample-review-card">
                <span className="eyebrow">SAMPLE REVIEW</span>
                <div className="review-stars" aria-label="Illustrative five-star sample">★★★★★</div>
                <p className="placeholder-quote">“Makeup finish romba elegant-ah irundhuchu. Overall experience comfortable-ah and lovely-ah irundhuchu!”</p>
                <p className="sample-review-name">Kavya M. <span>· Sample</span></p>
              </Reveal>
              <Reveal className="sample-review-card" delay={70}>
                <span className="eyebrow">SAMPLE REVIEW</span>
                <div className="review-stars" aria-label="Illustrative five-star sample">★★★★★</div>
                <p className="placeholder-quote">“Hair styling super-ah irundhuchu. Enakku venum-nu nenacha look-ku nalla attention kuduthanga.”</p>
                <p className="sample-review-name">Nivetha R. <span>· Sample</span></p>
              </Reveal>
              <Reveal className="sample-review-card" delay={140}>
                <span className="eyebrow">SAMPLE REVIEW</span>
                <div className="review-stars" aria-label="Illustrative five-star sample">★★★★★</div>
                <p className="placeholder-quote">“Bridal preparation-ku calm-ah plan panna mudinjadhu. Details ellam thoughtful-ah irundha maadhiri feel aachu.”</p>
                <p className="sample-review-name">Harini S. <span>· Sample</span></p>
              </Reveal>
              <Reveal className="sample-review-card" delay={210}>
                <span className="eyebrow">SAMPLE REVIEW</span>
                <div className="review-stars" aria-label="Illustrative five-star sample">★★★★★</div>
                <p className="placeholder-quote">“Spa treatment apram romba relaxed-ah feel panninen. Place-oda ambience-um nalla soothing-ah irundhuchu.”</p>
                <p className="sample-review-name">Divya K. <span>· Sample</span></p>
              </Reveal>
              <p className="sample-review-disclaimer">Illustrative sample reviews only — these are not verified customer testimonials.</p>
            </div>
          </div>
        </section>

        <section className="booking-section" id="contact" aria-labelledby="booking-title">
          <div className="booking-image" aria-hidden="true">
            <img
              src={galleryItems[7].image}
              alt=""
              className="booking-image-crop"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="content-shell booking-content">
            <Reveal>
              <p className="eyebrow">A NOTE TO BEGIN</p>
              <h2 id="booking-title">Your next beauty ritual awaits.</h2>
              <p>Get in touch to explore our services and enquire about your appointment.</p>
              <button className="button button-gold" type="button" onClick={() => handleBooking()}>
                <WhatsAppIcon /> Book on WhatsApp <ArrowIcon />
              </button>
              <p className="booking-footnote">Your appointment is not confirmed until PRAISY replies.</p>
            </Reveal>
          </div>
        </section>

        <CinematicFilm variant="bottom" id="finale-film" labelledBy="finale-title" className="finale-film-section">
          <Reveal className="film-copy finale-film-copy">
            <p className="eyebrow">A LASTING IMPRESSION</p>
            <h2 id="finale-title">Your Beauty.<br />Your Moment.</h2>
            <p>Let your next beauty experience begin with PRAISY.</p>
            <button className="button button-gold" type="button" onClick={() => handleBooking()}>
              Start your booking <ArrowIcon />
            </button>
          </Reveal>
        </CinematicFilm>
      </main>

      <footer className="site-footer">
        <div className="content-shell footer-main">
          <div className="footer-brand-block">
            <a className="footer-brand" href="#home">PRAISY</a>
            <p>Beauty, beyond the ordinary.</p>
          </div>
          <div className="footer-column">
            <p className="footer-heading">Explore</p>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="footer-column">
            <p className="footer-heading">Contact</p>
            <a href={`https://wa.me/${salonConfig.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp · {salonConfig.phoneDisplay}</a>
            {salonConfig.address && <span>{salonConfig.address}</span>}
            {salonConfig.openingHours && <span>{salonConfig.openingHours}</span>}
            {salonConfig.email && <a href={`mailto:${salonConfig.email}`}>{salonConfig.email}</a>}
          </div>
          <div className="footer-column footer-social" id="follow">
            <p className="footer-heading">Follow</p>
            <div className="footer-social-links" aria-label="PRAISY social media">
              <a
                className="footer-social-link"
                href={salonConfig.instagramUrl || "#follow"}
                target={salonConfig.instagramUrl ? "_blank" : undefined}
                rel={salonConfig.instagramUrl ? "noreferrer" : undefined}
                aria-label="Instagram — profile link to be added"
                title={salonConfig.instagramUrl ? "Instagram" : "Instagram link to be added"}
              ><InstagramIcon /></a>
              <a
                className="footer-social-link"
                href={salonConfig.facebookUrl || "#follow"}
                target={salonConfig.facebookUrl ? "_blank" : undefined}
                rel={salonConfig.facebookUrl ? "noreferrer" : undefined}
                aria-label="Facebook — profile link to be added"
                title={salonConfig.facebookUrl ? "Facebook" : "Facebook link to be added"}
              ><FacebookIcon /></a>
              <a
                className="footer-social-link"
                href={salonConfig.youtubeUrl || "#follow"}
                target={salonConfig.youtubeUrl ? "_blank" : undefined}
                rel={salonConfig.youtubeUrl ? "noreferrer" : undefined}
                aria-label="YouTube — channel link to be added"
                title={salonConfig.youtubeUrl ? "YouTube" : "YouTube link to be added"}
              ><YouTubeIcon /></a>
            </div>
            <button type="button" onClick={() => handleBooking()}>Book appointment <ArrowIcon /></button>
          </div>
        </div>
        <div className="content-shell footer-bottom">
          <p>© {new Date().getFullYear()} PRAISY. All rights reserved.</p>
          <p>Every detail, a touch of elegance. Every moment, uniquely yours.</p>
        </div>
      </footer>

      {bookingFlowOpen && <BookingFlow initialService={bookingService} onClose={closeBookingFlow} />}
    </>
  );
}

export default App;