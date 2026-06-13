import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Are You Batman?" },
      { name: "description", content: "A very important question." },
    ],
  }),
  component: BatmanPage,
});

function BatmanPage() {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [yesOffset, setYesOffset] = useState({ x: 0, y: 0 });
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const MAX_DODGES = 6;

  const dodge = () => {
    if (clicks >= MAX_DODGES) {
      const container = containerRef.current?.getBoundingClientRect();
      const noBtn = noRef.current?.getBoundingClientRect();
      if (container && noBtn) {
        const cx = container.left + container.width / 2;
        const cy = container.top + container.height / 2;
        const targetX = noBtn.left + noBtn.width / 2 - cx;
        const targetY = noBtn.top + noBtn.height / 2 - cy;
        setYesOffset({ x: targetX, y: targetY });
      }
      return;
    }

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    const maxX = container.width / 2 - 80;
    const maxY = container.height / 2 - 60;
    const intensity = Math.min(1, (clicks + 1) / MAX_DODGES);
    const angle = Math.random() * Math.PI * 2;
    const radius = (60 + clicks * 50) * intensity;
    const x = Math.max(-maxX, Math.min(maxX, Math.cos(angle) * radius));
    const y = Math.max(-maxY, Math.min(maxY, Math.sin(angle) * radius));
    setYesOffset({ x, y });
    setClicks((c) => c + 1);
  };

  const handleYesClick = () => {
    setRevealed(true);
  };

  const handleNoHover = () => {
    dodge();
  };

  useEffect(() => {
    if (clicks < MAX_DODGES) return;
    const handler = () => {
      const container = containerRef.current?.getBoundingClientRect();
      const noBtn = noRef.current?.getBoundingClientRect();
      if (container && noBtn) {
        const cx = container.left + container.width / 2;
        const cy = container.top + container.height / 2;
        setYesOffset({
          x: noBtn.left + noBtn.width / 2 - cx,
          y: noBtn.top + noBtn.height / 2 - cy,
        });
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [clicks]);

  if (revealed) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-background via-secondary/30 to-background">
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-primary animate-fade-in">
          I knew it. 🦇
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-in">
          Your secret is safe with me, Dark Knight. Now, a little something I made for you…
        </p>
        <Link
          to="/story"
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium tracking-wide hover:scale-105 transition-transform shadow-lg"
        >
          Enter the secret page →
        </Link>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-background via-secondary/30 to-background"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 text-[20vw] font-serif flex items-center justify-center select-none">
        🦇
      </div>

      <h1 className="relative font-serif text-4xl md:text-6xl mb-4 text-foreground">
        Are you Batman?
      </h1>
      <p className="relative text-muted-foreground mb-12 max-w-md">
        Be honest. This is a very serious investigation.
        {clicks > 0 && clicks < MAX_DODGES && (
          <span className="block mt-2 text-sm italic opacity-70">
            (the No button seems… nervous)
          </span>
        )}
        {clicks >= MAX_DODGES && (
          <span className="block mt-2 text-sm italic opacity-70">
            (just click Yes already 😏)
          </span>
        )}
      </p>

      <div className="relative flex gap-6 items-center justify-center">
        <button
          ref={yesRef}
          onClick={handleYesClick}
          style={{
            transform: `translate(${yesOffset.x}px, ${yesOffset.y}px)`,
            transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="relative z-10 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl"
        >
          Yes
        </button>

        <button
          ref={noRef}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={handleNoHover}
          style={{
            transform: `translate(${noOffset.x}px, ${noOffset.y}px) scale(${1 + clicks * 0.08})`,
            transition: "transform 0.25s ease-out",
          }}
          className="relative z-20 px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium border border-border shadow-md"
        >
          No
        </button>
      </div>
    </main>
  );
}
