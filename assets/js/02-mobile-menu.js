(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNavigation = document.querySelector("#mobile-navigation");

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
})();
