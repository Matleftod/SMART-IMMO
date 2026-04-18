const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const benefitChoosers = Array.from(document.querySelectorAll("[data-benefit-chooser]"));

benefitChoosers.forEach((chooser) => {
  const activePanel = chooser.querySelector(".benefit-active");
  const activeTitle = chooser.querySelector("[data-benefit-title]:not([data-benefit-choice])");
  const activeCopy = chooser.querySelector("[data-benefit-copy]:not([data-benefit-choice])");
  const choices = Array.from(chooser.querySelectorAll("[data-benefit-choice]"));
  let transitionTimer;

  if (!activePanel || !activeTitle || !activeCopy || choices.length === 0) {
    return;
  }

  function setActiveChoice(choice, shouldFocus = false) {
    if (!choice || choice.classList.contains("is-active")) {
      if (shouldFocus && choice) {
        choice.focus();
      }
      return;
    }

    const updateContent = () => {
      activeTitle.textContent = choice.dataset.benefitTitle || choice.textContent.trim();
      activeCopy.textContent = choice.dataset.benefitCopy || "";

      choices.forEach((item) => {
        const isActive = item === choice;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      if (shouldFocus) {
        choice.focus();
      }
    };

    clearTimeout(transitionTimer);

    if (prefersReducedMotion.matches) {
      updateContent();
      activePanel.classList.remove("is-changing");
      return;
    }

    activePanel.classList.add("is-changing");
    transitionTimer = window.setTimeout(() => {
      updateContent();
      window.requestAnimationFrame(() => {
        activePanel.classList.remove("is-changing");
      });
    }, 150);
  }

  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => setActiveChoice(choice));

    choice.addEventListener("keydown", (event) => {
      const lastIndex = choices.length - 1;
      let nextIndex = index;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = index === lastIndex ? 0 : index + 1;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        nextIndex = index === 0 ? lastIndex : index - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      } else {
        return;
      }

      event.preventDefault();
      setActiveChoice(choices[nextIndex], true);
    });
  });
});
