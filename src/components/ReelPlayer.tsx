import { useEffect, useRef, useState } from "react";

/** Muted vertical reels in a phone frame; plays the list in sequence while visible. */
const ReelPlayer = ({ videos, poster, label }: { videos: string[]; poster?: string; label: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (v && i > 0) v.play().catch(() => {});
  }, [i]);

  return (
    <div className="shot mobile reel">
      <div className="shot-screen">
        <video
          ref={ref}
          src={`./images/projects/${videos[i]}`}
          poster={poster ? `./images/projects/${poster}` : undefined}
          muted
          playsInline
          preload="auto"
          aria-label={label}
          onEnded={() => setI((n) => (n + 1) % videos.length)}
        />
      </div>
      <span className="reel-badge" aria-hidden>
        ● Reel
      </span>
    </div>
  );
};

export default ReelPlayer;
