(() => {
  const saleCalculators = Array.from(document.querySelectorAll("[data-sale-calculator]"));

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
})();
