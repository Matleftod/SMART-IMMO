const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const benefitChoosers = Array.from(document.querySelectorAll("[data-benefit-chooser]"));
const heroMedia = document.querySelector(".hero-10 .media");
const marcheTimelines = Array.from(document.querySelectorAll("[data-marche-timeline]"));

function revealImmediately() {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
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
}

benefitChoosers.forEach((chooser) => {
  const choices = Array.from(chooser.querySelectorAll("[data-benefit-choice]"));
  const title = chooser.querySelector("[data-benefit-title]");
  const copy = chooser.querySelector("[data-benefit-copy]");

  if (choices.length === 0 || !title || !copy) {
    return;
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      if (choice.classList.contains("is-active")) {
        return;
      }

      choices.forEach((item) => {
        item.classList.toggle("is-active", item === choice);
        item.setAttribute("aria-pressed", String(item === choice));
      });

      title.textContent = choice.dataset.benefitTitle || choice.textContent || "";
      copy.textContent = choice.dataset.benefitCopy || "";
    });
  });
});

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
