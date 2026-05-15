(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroMedia = document.querySelector(".hero-10 .media");

  if (heroMedia && !prefersReducedMotion.matches) {
    let ticking = false;

    const updateHeroParallax = () => {
      const hero = heroMedia.closest(".hero-10");

      if (!hero) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) {
        ticking = false;
        return;
      }

      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      const offset = progress * 54;

      heroMedia.style.setProperty("--hero-parallax-y", `${offset}px`);
      ticking = false;
    };

    const requestHeroParallax = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateHeroParallax);
    };

    updateHeroParallax();
    window.addEventListener("scroll", requestHeroParallax, { passive: true });
    window.addEventListener("resize", requestHeroParallax);
  }
})();
