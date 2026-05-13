(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const marcheTimelines = Array.from(document.querySelectorAll("[data-marche-timeline]"));

  marcheTimelines.forEach((timeline) => {
    const steps = Array.from(timeline.querySelectorAll("[data-marche-step]"));

    if (steps.length === 0) {
      return;
    }

    if (prefersReducedMotion.matches) {
      timeline.style.setProperty("--timeline-progress", "1");
      steps.forEach((step) => step.classList.add("is-active"));
      return;
    }

    let ticking = false;
    timeline.classList.add("is-motion-ready");

    const updateTimeline = () => {
      const trigger = window.innerHeight * 0.62;
      const firstMarker = steps[0].querySelector(".marche-marker") || steps[0];
      const lastMarker = steps[steps.length - 1].querySelector(".marche-marker") || steps[steps.length - 1];
      const firstRect = firstMarker.getBoundingClientRect();
      const lastRect = lastMarker.getBoundingClientRect();
      const firstCenter = firstRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top + lastRect.height / 2;
      const progress = Math.min(1, Math.max(0, (trigger - firstCenter) / Math.max(1, lastCenter - firstCenter)));

      timeline.style.setProperty("--timeline-progress", String(progress));

      steps.forEach((step) => {
        const marker = step.querySelector(".marche-marker");
        const markerRect = (marker || step).getBoundingClientRect();
        const markerCenter = markerRect.top + markerRect.height / 2;

        step.classList.toggle("is-active", markerCenter <= trigger);
      });

      ticking = false;
    };

    const requestTimelineUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateTimeline);
    };

    updateTimeline();
    window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
    window.addEventListener("resize", requestTimelineUpdate);
  });
})();
