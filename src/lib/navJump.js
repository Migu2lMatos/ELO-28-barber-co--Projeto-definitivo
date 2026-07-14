// Shared flag: true for a brief window right after the user clicks an
// internal "#anchor" link (nav menu, "Ver Serviços", etc.). Reveal-style
// entrance animations check this and skip straight to their end state
// instead of animating, so jumping to a section doesn't fire a cascade of
// fade-ins for every element the smooth-scroll flies past on the way there.
export const navJump = { active: false };

export function initNavJumpListener() {
  let timer;
  const onClick = (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    navJump.active = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      navJump.active = false;
    }, 1200);
  };

  document.addEventListener("click", onClick);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("click", onClick);
  };
}
