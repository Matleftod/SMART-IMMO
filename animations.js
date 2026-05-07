const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const benefitChoosers = Array.from(document.querySelectorAll("[data-benefit-chooser]"));
const heroMedia = document.querySelector(".hero-10 .media");
const marcheTimelines = Array.from(document.querySelectorAll("[data-marche-timeline]"));
const saleCalculators = Array.from(document.querySelectorAll("[data-sale-calculator]"));
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNavigation = document.querySelector("#mobile-navigation");

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

if (mobileMenuToggle && mobileNavigation) {
  const mobileNavigationLinks = Array.from(mobileNavigation.querySelectorAll("a"));
  let mobileNavigationTimer;

  const setMobileNavigationState = (isOpen, restoreFocus = false) => {
    window.clearTimeout(mobileNavigationTimer);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("mobile-nav-open", isOpen);

    if (isOpen) {
      mobileNavigation.hidden = false;
      window.requestAnimationFrame(() => {
        mobileNavigation.classList.add("is-open");
      });
    } else {
      mobileNavigation.classList.remove("is-open");
      mobileNavigationTimer = window.setTimeout(
        () => {
          mobileNavigation.hidden = true;
        },
        prefersReducedMotion.matches ? 0 : 240,
      );
    }

    if (!isOpen && restoreFocus) {
      mobileMenuToggle.focus();
    }
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    setMobileNavigationState(!isOpen);
  });

  mobileNavigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileNavigationState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenuToggle.getAttribute("aria-expanded") === "true") {
      setMobileNavigationState(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenuToggle.getAttribute("aria-expanded") !== "true" ||
      mobileNavigation.contains(event.target) ||
      mobileMenuToggle.contains(event.target)
    ) {
      return;
    }

    setMobileNavigationState(false);
  });
}

benefitChoosers.forEach((chooser) => {
  const choices = Array.from(chooser.querySelectorAll("[data-benefit-choice]"));
  const panel = chooser.querySelector(".benefit-active");
  const selectors = chooser.querySelector(".benefit-selectors");
  const title = panel?.querySelector("[data-benefit-title]");
  const copy = panel?.querySelector("[data-benefit-copy]");

  if (choices.length === 0 || !title || !copy || !panel || !selectors) {
    return;
  }

  let changeTimer;
  const imagePreloadCache = new Map();
  const benefitMobileMq = window.matchMedia("(max-width: 820px)");
  const panelDesktopParent = panel.parentElement;
  const panelDesktopNextSibling = panel.nextElementSibling;
  const panelId = panel.id;

  const isMobileAccordion = () => benefitMobileMq.matches;

  const placePanelUnderChoice = (choice) => {
    if (!choice || !isMobileAccordion()) {
      return;
    }

    selectors.insertBefore(panel, choice.nextSibling);
  };

  const applyDesktopSemantics = () => {
    selectors.setAttribute("role", "tablist");
    selectors.setAttribute("aria-label", "Choisir un bénéfice");
    selectors.setAttribute("aria-orientation", "vertical");
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-live", "polite");
  };

  const applyMobileSemantics = () => {
    selectors.setAttribute("role", "group");
    selectors.setAttribute("aria-label", "Bénéfices");
    selectors.removeAttribute("aria-orientation");
    panel.setAttribute("role", "region");
    panel.removeAttribute("aria-live");
  };

  const preloadBenefitImage = (url) => {
    if (!url) {
      return Promise.resolve();
    }

    if (imagePreloadCache.has(url)) {
      return imagePreloadCache.get(url);
    }

    const preloadPromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url);
      img.src = url;
    });

    imagePreloadCache.set(url, preloadPromise);
    return preloadPromise;
  };

  choices.forEach((choice) => {
    if (choice.dataset.benefitImage) {
      preloadBenefitImage(choice.dataset.benefitImage);
    }
  });

  const updatePanel = (choice) => {
    title.textContent = choice.dataset.benefitTitle || choice.textContent || "";
    copy.textContent = choice.dataset.benefitCopy || "";
    panel.setAttribute("aria-labelledby", choice.id);

    const imageUrl = choice.dataset.benefitImage;
    const imagePosition = choice.dataset.benefitImagePosition;

    if (!imageUrl) {
      panel.style.removeProperty("--benefit-visual-image");
    } else {
      preloadBenefitImage(imageUrl).then((loadedUrl) => {
        if (!loadedUrl) {
          return;
        }

        const safeUrl = loadedUrl.replace(/"/g, "");
        panel.style.setProperty("--benefit-visual-image", `url("${safeUrl}")`);
      });
    }

    if (imagePosition) {
      panel.style.setProperty("--benefit-visual-position", imagePosition);
    }

    placePanelUnderChoice(choice);
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
      item.setAttribute("aria-expanded", String(isActive));
      item.setAttribute("aria-controls", panelId);
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
    choice.setAttribute("aria-controls", panelId);
    choice.setAttribute("aria-expanded", String(choice.classList.contains("is-active")));

    choice.addEventListener("click", () => activateChoice(choice));
    choice.addEventListener("keydown", (event) => {
      if (isMobileAccordion()) {
        return;
      }

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

  const initialChoice = choices.find((choice) => choice.classList.contains("is-active")) || choices[0];
  const syncBenefitMode = () => {
    if (isMobileAccordion()) {
      applyMobileSemantics();
      choices.forEach((choice) => {
        choice.removeAttribute("role");
        choice.tabIndex = 0;
      });
      placePanelUnderChoice(choices.find((choice) => choice.classList.contains("is-active")) || initialChoice);
      return;
    }

    applyDesktopSemantics();
    choices.forEach((choice) => {
      choice.setAttribute("role", "tab");
      const isActive = choice.classList.contains("is-active");
      choice.tabIndex = isActive ? 0 : -1;
    });
    if (panelDesktopParent) {
      panelDesktopParent.insertBefore(panel, panelDesktopNextSibling);
    }
  };

  syncBenefitMode();
  benefitMobileMq.addEventListener("change", syncBenefitMode);
  updatePanel(initialChoice);
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
