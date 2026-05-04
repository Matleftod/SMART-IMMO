const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const benefitChoosers = Array.from(document.querySelectorAll("[data-benefit-chooser]"));
const heroMedia = document.querySelector(".hero-10 .media");
const marcheTimelines = Array.from(document.querySelectorAll("[data-marche-timeline]"));
const saleCalculators = Array.from(document.querySelectorAll("[data-sale-calculator]"));
const offerComparisons = Array.from(document.querySelectorAll("[data-offers-comparison]"));
const issueRails = Array.from(document.querySelectorAll("[data-issue-rail]"));

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "aria-hidden": "true",
      focusable: "false",
      "stroke-width": "1.6"
    }
  });
}

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
  const panel = chooser.querySelector(".benefit-active");
  const title = panel?.querySelector("[data-benefit-title]");
  const copy = panel?.querySelector("[data-benefit-copy]");

  if (choices.length === 0 || !title || !copy || !panel) {
    return;
  }

  let changeTimer;

  const updatePanel = (choice) => {
    title.textContent = choice.dataset.benefitTitle || choice.textContent || "";
    copy.textContent = choice.dataset.benefitCopy || "";
    panel.setAttribute("aria-labelledby", choice.id);
  };

  const activateChoice = (choice) => {
    if (!choice || choice.classList.contains("is-active")) {
      return;
    }

    window.clearTimeout(changeTimer);

    choices.forEach((item) => {
      const isActive = item === choice;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    if (prefersReducedMotion.matches) {
      updatePanel(choice);
      return;
    }

    panel.classList.add("is-changing");
    changeTimer = window.setTimeout(() => {
      updatePanel(choice);
      window.requestAnimationFrame(() => {
        panel.classList.remove("is-changing");
      });
    }, 150);
  };

  choices.forEach((choice, index) => {
    choice.tabIndex = choice.classList.contains("is-active") ? 0 : -1;
    choice.setAttribute("aria-selected", String(choice.classList.contains("is-active")));

    choice.addEventListener("click", () => activateChoice(choice));
    choice.addEventListener("keydown", (event) => {
      const nextIndex = event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? choices.length - 1
              : index;

      if (nextIndex === index) {
        return;
      }

      event.preventDefault();
      const nextChoice = choices[(nextIndex + choices.length) % choices.length];
      nextChoice.focus();
      activateChoice(nextChoice);
    });
  });
});

offerComparisons.forEach((comparison) => {
  const toggle = comparison.querySelector("[data-offers-toggle]");
  const toggleLabel = comparison.querySelector("[data-offers-toggle-label]");
  const detail = comparison.querySelector("[data-offers-detail]");

  if (!toggle || !detail) {
    return;
  }

  let closeTimer;

  const setOpen = (isOpen) => {
    window.clearTimeout(closeTimer);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (toggleLabel) {
      toggleLabel.textContent = isOpen ? "Masquer le détail des prestations" : "Comparer toutes les prestations";
    }

    if (isOpen) {
      detail.hidden = false;

      if (prefersReducedMotion.matches) {
        detail.classList.add("is-open");
        return;
      }

      window.requestAnimationFrame(() => {
        detail.classList.add("is-open");
      });
      return;
    }

    detail.classList.remove("is-open");

    if (prefersReducedMotion.matches) {
      detail.hidden = true;
      return;
    }

    closeTimer = window.setTimeout(() => {
      detail.hidden = true;
    }, 460);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
});

issueRails.forEach((rail) => {
  const triggers = Array.from(rail.querySelectorAll("[data-issue-trigger]"));
  const panels = Array.from(rail.querySelectorAll("[data-issue-panel]"));

  if (triggers.length === 0 || panels.length === 0) {
    return;
  }

  let activeIssue = triggers.find((trigger) => trigger.classList.contains("is-active"))?.dataset.issueTrigger || triggers[0].dataset.issueTrigger;
  let hideTimer;
  let switchTimer;
  let isInitialized = false;

  const setActiveIssue = (issueKey) => {
    if (!issueKey) {
      return;
    }

    if (isInitialized && issueKey === activeIssue && rail.querySelector(`[data-issue-panel="${issueKey}"]`)?.classList.contains("is-active")) {
      return;
    }

    activeIssue = issueKey;
    isInitialized = true;
    window.clearTimeout(hideTimer);
    window.clearTimeout(switchTimer);
    rail.classList.add("is-switching");

    triggers.forEach((trigger) => {
      const isActive = trigger.dataset.issueTrigger === issueKey;
      trigger.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-selected", String(isActive));
      trigger.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.issuePanel === issueKey;

      if (isActive) {
        panel.hidden = false;
        window.requestAnimationFrame(() => {
          panel.classList.add("is-active");
          panel.removeAttribute("aria-hidden");
        });
        return;
      }

      panel.classList.remove("is-active");
      panel.setAttribute("aria-hidden", "true");

      if (prefersReducedMotion.matches) {
        panel.hidden = true;
      }
    });

    if (!prefersReducedMotion.matches) {
      hideTimer = window.setTimeout(() => {
        panels.forEach((panel) => {
          if (!panel.classList.contains("is-active")) {
            panel.hidden = true;
          }
        });
      }, 460);
      switchTimer = window.setTimeout(() => {
        rail.classList.remove("is-switching");
      }, 500);
    } else {
      rail.classList.remove("is-switching");
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => setActiveIssue(trigger.dataset.issueTrigger));
    trigger.addEventListener("focus", () => setActiveIssue(trigger.dataset.issueTrigger));
    trigger.addEventListener("click", () => setActiveIssue(trigger.dataset.issueTrigger));
    trigger.addEventListener("keydown", (event) => {
      const currentIndex = triggers.indexOf(trigger);
      const nextIndex = event.key === "ArrowRight" ? currentIndex + 1 : event.key === "ArrowLeft" ? currentIndex - 1 : currentIndex;

      if (nextIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      const nextTrigger = triggers[(nextIndex + triggers.length) % triggers.length];
      nextTrigger.focus();
      setActiveIssue(nextTrigger.dataset.issueTrigger);
    });
  });

  setActiveIssue(activeIssue);
});

saleCalculators.forEach((calculator) => {
  const salePrice = calculator.querySelector("[data-sale-price]");
  const percentRange = calculator.querySelector("[data-percent-range]");
  const percentInput = calculator.querySelector("[data-percent-input]");
  const fixedCost = calculator.querySelector("[data-fixed-cost]");
  const costPreview = calculator.querySelector("[data-cost-preview]");
  const netResult = calculator.querySelector("[data-net-result]");
  const resultBlock = calculator.querySelector(".sale-calculator__result");
  const modeButtons = Array.from(calculator.querySelectorAll("[data-cost-mode]"));
  const modePanels = Array.from(calculator.querySelectorAll("[data-cost-panel]"));

  if (!salePrice || !percentRange || !percentInput || !fixedCost || !costPreview || !netResult) {
    return;
  }

  const moneyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const numberFormatter = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  });

  let activeMode = "percent";
  let resultTimer;

  const parseMoney = (value) => {
    const normalized = String(value || "")
      .replace(/\s/g, "")
      .replace(/[€,.]/g, (match) => (match === "," ? "." : ""))
      .replace(/[^\d.]/g, "");

    return Number.parseFloat(normalized) || 0;
  };

  const formatMoneyInput = (input) => {
    const value = parseMoney(input.value);
    input.value = value > 0 ? numberFormatter.format(value) : "";
  };

  const getPercent = () => {
    const percent = Number.parseFloat(percentInput.value || percentRange.value);
    return Math.min(9, Math.max(4, Number.isFinite(percent) ? percent : 4));
  };

  const setMode = (mode) => {
    activeMode = mode;

    modeButtons.forEach((button) => {
      const isActive = button.dataset.costMode === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-checked", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    modePanels.forEach((panel) => {
      const isActive = panel.dataset.costPanel === mode;
      panel.classList.toggle("is-active", isActive);
      panel.classList.toggle("is-disabled", !isActive);
      panel.setAttribute("aria-disabled", String(!isActive));
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    percentRange.disabled = mode !== "percent";
    percentInput.disabled = mode !== "percent";
    fixedCost.disabled = mode !== "fixed";
    updateCalculator();
  };

  const updateCalculator = () => {
    const price = parseMoney(salePrice.value);
    const percent = getPercent();
    const percentageCost = price * (percent / 100);
    const fixed = parseMoney(fixedCost.value);
    const cost = activeMode === "fixed" ? fixed : percentageCost;
    const result = Math.max(0, price - cost);

    costPreview.textContent = moneyFormatter.format(percentageCost);
    netResult.textContent = moneyFormatter.format(result);

    if (resultBlock) {
      window.clearTimeout(resultTimer);
      resultBlock.classList.add("is-updating");
      resultTimer = window.setTimeout(() => {
        resultBlock.classList.remove("is-updating");
      }, 160);
    }
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.costMode || "percent"));
    button.addEventListener("keydown", (event) => {
      const currentIndex = modeButtons.indexOf(button);
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % modeButtons.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + modeButtons.length) % modeButtons.length;
      } else {
        return;
      }

      event.preventDefault();
      const nextButton = modeButtons[nextIndex];
      nextButton.focus();
      setMode(nextButton.dataset.costMode || "percent");
    });
  });

  salePrice.addEventListener("input", updateCalculator);
  salePrice.addEventListener("blur", () => {
    formatMoneyInput(salePrice);
    updateCalculator();
  });

  fixedCost.addEventListener("input", updateCalculator);
  fixedCost.addEventListener("blur", () => {
    formatMoneyInput(fixedCost);
    updateCalculator();
  });

  percentRange.addEventListener("input", () => {
    percentInput.value = percentRange.value;
    updateCalculator();
  });

  percentInput.addEventListener("input", () => {
    const percent = getPercent();
    percentRange.value = String(percent);
    updateCalculator();
  });

  percentInput.addEventListener("blur", () => {
    const percent = getPercent();
    percentInput.value = String(percent);
    percentRange.value = String(percent);
    updateCalculator();
  });

  formatMoneyInput(salePrice);
  formatMoneyInput(fixedCost);
  setMode(activeMode);
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
