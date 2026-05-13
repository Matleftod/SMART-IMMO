(() => {
  const benefitChoosers = Array.from(document.querySelectorAll("[data-benefit-chooser]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
})();
