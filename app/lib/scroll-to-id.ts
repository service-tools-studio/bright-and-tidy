export function scrollToId(
  hash: string,
  offsetPx = 100,
  options?: { focus?: boolean },
) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - offsetPx;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  if (options?.focus) {
    window.requestAnimationFrame(() => {
      if (!el.hasAttribute("tabindex")) {
        el.setAttribute("tabindex", "-1");
      }
      el.focus({ preventScroll: true });
    });
  }
}
