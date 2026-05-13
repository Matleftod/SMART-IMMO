(() => {
  const offersTableScrollAreas = Array.from(document.querySelectorAll(".offers-table-scroll"));

  offersTableScrollAreas.forEach((scrollArea) => {
    const hint = scrollArea.parentElement?.querySelector(".offers-table__mobile-hint");

    if (!hint) {
      return;
    }

    let isHintDismissed = false;
    let hintReturnTimer;
    const mobileScrollableMq = window.matchMedia("(max-width: 760px)");
    const hintIdleDelay = 3500;
    let previousScrollLeft = scrollArea.scrollLeft;

    const dismissHint = () => {
      if (isHintDismissed || !mobileScrollableMq.matches) {
        return;
      }

      isHintDismissed = true;
      hint.classList.add("is-dismissed");
    };

    const showHint = () => {
      if (!mobileScrollableMq.matches || !isHintDismissed) {
        return;
      }

      isHintDismissed = false;
      hint.classList.remove("is-dismissed");
    };

    const scheduleHintReturn = () => {
      window.clearTimeout(hintReturnTimer);
      hintReturnTimer = window.setTimeout(showHint, hintIdleDelay);
    };

    const onScroll = () => {
      const currentScrollLeft = scrollArea.scrollLeft;
      const deltaX = Math.abs(currentScrollLeft - previousScrollLeft);
      previousScrollLeft = currentScrollLeft;

      if (deltaX < 1) {
        return;
      }

      dismissHint();
      scheduleHintReturn();
    };

    const onHorizontalWheel = (event) => {
      if (Math.abs(event.deltaX) < 1) {
        return;
      }

      dismissHint();
      scheduleHintReturn();
    };

    scrollArea.addEventListener("scroll", onScroll, { passive: true });
    scrollArea.addEventListener("wheel", onHorizontalWheel, { passive: true });

    mobileScrollableMq.addEventListener("change", () => {
      window.clearTimeout(hintReturnTimer);
      previousScrollLeft = scrollArea.scrollLeft;
      if (!mobileScrollableMq.matches) {
        hint.classList.remove("is-dismissed");
        isHintDismissed = false;
      }
    });
  });
})();
