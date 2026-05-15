(() => {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function revealImmediately() {
    document.documentElement.classList.add("reveal-fallback");

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  function revealItemsInViewport() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const isInViewport =
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight * 1.08 &&
        rect.left <= viewportWidth;

      if (isInViewport) {
        item.classList.add("is-visible");
      }
    });
  }

  if (revealItems.length === 0) {
    document.documentElement.classList.remove("reveal-ready");
  } else if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealImmediately();
  } else {
    document.documentElement.classList.add("reveal-ready");

    revealItems.forEach((item) => {
      const delay = Number(item.dataset.revealDelay || 0);

      if (delay > 0) {
        item.style.setProperty("--reveal-delay", `${delay}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    const revealViewportFallbackTimer = window.setTimeout(revealItemsInViewport, 900);

    window.addEventListener("beforeprint", () => {
      window.clearTimeout(revealViewportFallbackTimer);
      revealImmediately();
      observer.disconnect();
    });
  }
})();
