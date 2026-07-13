import { useReveal } from "../hooks/useReveal";

// Wraps children in a tag that fades/slides into view on scroll (GSAP +
// ScrollTrigger, once per element). `direction`: "up" (default), "down",
// "left", "right" or "scale".
export default function Reveal({ as: Tag = "div", delay = 0, direction = "up", className = "", children }) {
  const { ref } = useReveal({ direction, delay });

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
