import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "For You, My Love 💖" },
      { name: "description", content: "A little gift made just for you — our story, our memories, and all the reasons why." },
      { property: "og:title", content: "For You, My Love" },
      { property: "og:description", content: "A little gift made just for you." },
    ],
  }),
  component: Index,
});

const HER_NAME = "My Love";

const TIMELINE = [
  { date: "The Day We Met", title: "Where it all began", text: "Write a sweet memory about the first time you met. ✨", image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800" },
  { date: "Our First Date", title: "Butterflies & laughter", text: "Describe your first date together — the place, the food, the feeling.", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800" },
  { date: "First Trip Together", title: "Adventures with you", text: "Add a memory about a trip or getaway you took together.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800" },
  { date: "That One Night", title: "An unforgettable evening", text: "Write about a magical evening you shared.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800" },
  { date: "Today", title: "And every day after", text: "Every single day with you is a memory I want to keep forever.", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800" },
];

const REASONS = [
  { front: "Your Smile", back: "It lights up every room and makes my heart skip a beat." },
  { front: "Your Kindness", back: "The way you care for everyone around you is breathtaking." },
  { front: "Your Laugh", back: "It's my favorite sound in the entire world." },
  { front: "Your Mind", back: "I love the way you think and see the world." },
  { front: "Your Strength", back: "You're braver than you believe, stronger than you seem." },
  { front: "Your Hugs", back: "Home isn't a place — it's wrapped in your arms." },
  { front: "Your Eyes", back: "I could get lost in them for hours." },
  { front: "Just You", back: "Every little thing about you — exactly as you are." },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "That golden afternoon" },
  { src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800", caption: "Sunsets with you" },
  { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800", caption: "Laughing till it hurt" },
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800", caption: "Our little adventure" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", caption: "Dancing in the kitchen" },
];

function Index() {
  return (
    <main className="min-h-screen bg-romantic overflow-x-hidden">
      <FloatingHearts />
      <Hero />
      <Timeline />
      <Reasons />
      <Gallery />
      <Footer />
    </main>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.7) % 12;
        const duration = 12 + ((i * 1.3) % 10);
        const size = 12 + ((i * 7) % 20);
        const symbols = ["♥", "✦", "✿", "♥"];
        return (
          <span
            key={i}
            className="absolute text-rose/40 animate-float"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {symbols[i % symbols.length]}
          </span>
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-gold/20 via-rose/10 to-transparent rounded-full animate-glow pointer-events-none" />
      <p className="font-script text-2xl md:text-3xl text-rose mb-4 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
        For {HER_NAME},
      </p>
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight max-w-4xl animate-fade-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
        To the Most <em className="text-gradient-gold animate-shimmer not-italic">Special Person</em> in My World
      </h1>
      <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.65s", opacity: 0 }}>
        I made this little corner of the internet just for you — every pixel a tiny way of saying <em>I love you</em>.
      </p>
      <a
        href="#story"
        className="mt-10 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-rose to-accent text-primary-foreground font-medium tracking-wide shadow-romantic hover:shadow-glow-gold hover:scale-105 active:scale-95 transition-all duration-400 animate-fade-up border-glow"
        style={{ animationDelay: "0.95s", opacity: 0 }}
      >
        Begin Our Story ↓
      </a>
    </section>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Timeline() {
  return (
    <section id="story" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader eyebrow="Our story" title="The little moments that made us" />
      <div className="relative mt-16">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-rose/40 to-transparent -translate-x-1/2" />
        {TIMELINE.map((item, i) => (
          <TimelineCard key={i} item={item} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}

function TimelineCard({ item, side }: { item: typeof TIMELINE[number]; side: "left" | "right" }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const animClass = side === "left" ? "animate-slide-left" : "animate-slide-right";
  return (
    <div
      ref={ref}
      className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${
        visible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
      } ${side === "right" ? "md:flex-row-reverse" : ""}`}
    >
      <div className="md:w-1/2 pl-12 md:pl-0 md:px-8 w-full">
        <div className={`group relative bg-card rounded-2xl p-6 shadow-romantic hover:shadow-glow-gold hover:-translate-y-1 transition-all duration-500 border border-border/50 hover:border-gold/50 overflow-hidden ${visible ? animClass : ""}`}
          style={{ animationDelay: "0.15s" }}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
          <p className="font-script text-rose text-xl">{item.date}</p>
          <h3 className="font-display text-2xl mt-1 mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.text}</p>
        </div>
      </div>
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gold to-rose ring-4 ring-background animate-pulse-soft" />
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

function Rooms() { return null; } // Legacy fallback layer

function Reasons() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader eyebrow="A few of many" title="Reasons I love you" />
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {REASONS.map((r, i) => (
          <ReasonCard key={i} reason={r} index={i} />
        ))}
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: typeof REASONS[number]; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      ref={ref}
      className={`flip-card h-44 md:h-52 cursor-pointer transition-all duration-700 ${flipped ? "flipped" : ""} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-card-inner">
        <div className="flip-face rounded-2xl bg-gradient-to-br from-cream to-blush flex items-center justify-center text-center p-4 shadow-romantic border border-border/40 hover:border-gold/40 transition-colors duration-300">
          <div>
            <div className="text-3xl mb-2 animate-pulse-soft">💖</div>
            <p className="font-display text-xl">{reason.front}</p>
          </div>
        </div>
        <div className="flip-face flip-back rounded-2xl bg-gradient-to-br from-rose to-accent text-primary-foreground flex items-center justify-center text-center p-5 shadow-glow-gold">
          <p className="font-script text-xl leading-snug">{reason.back}</p>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Snapshots" title="Us, frame by frame" />
      <div className="mt-16 relative">
        <div className="aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-romantic relative bg-card">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              <img src={g.src} alt={g.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10">
                <p className="font-script text-2xl md:text-4xl text-white">{g.caption}</p>
              </div>
            </div>
          ))}
          <button
            onClick={() => setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur hover:bg-white shadow-romantic flex items-center justify-center text-xl"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % GALLERY.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur hover:bg-white shadow-romantic flex items-center justify-center text-xl"
            aria-label="Next"
          >
            →
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-rose" : "w-2 bg-border"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <p className="font-script text-rose text-2xl">{eyebrow}</p>
      <h2 className="font-display text-4xl md:text-5xl mt-2">{title}</h2>
      <div className="mx-auto mt-4 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 py-20 px-6 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-radial from-gold/15 via-rose/5 to-transparent rounded-full animate-glow pointer-events-none" />
      <p className="font-script text-4xl text-rose relative">Yours, always.</p>
      <p className="mt-3 text-muted-foreground text-sm tracking-wide">Made with 💖 just for you.</p>
    </footer>
  );
}
