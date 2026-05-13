<section id="calculateur" class="sale-calculator-section">
  <div class="wrap">
    <div class="sale-calculator" data-sale-calculator data-reveal="fade">
      <div class="sale-calculator__intro">
        <p class="eyebrow">Simulation</p>
        <h2 class="sale-calculator__title serif">Chaque vente à un coût</h2>
        <p class="sale-calculator__copy">Simulation indicative basée sur les paramètres renseignés</p>
        <div class="sale-calculator__result" role="status" aria-live="polite" aria-atomic="true">
          <span id="net-result-label">Ce qu’il vous reste après la vente</span>
          <output id="net-result" data-net-result for="sale-price percent-range percent-input fixed-cost" aria-labelledby="net-result-label">332 500 €</output>
        </div>
      </div>

      <form class="sale-calculator__panel" aria-label="Calculateur du coût de la vente">
        <label class="calc-field" for="sale-price">
          <span>Prix de vente de votre bien</span>
          <span class="calc-input-shell">
            <input id="sale-price" type="text" inputmode="numeric" autocomplete="off" value="350 000" data-sale-price>
            <span>€</span>
          </span>
        </label>

        <fieldset class="calc-cost">
          <legend id="cost-mode-legend">Coût de la vente</legend>
          <div class="calc-mode-switch" role="radiogroup" aria-labelledby="cost-mode-legend">
            <button class="is-active" type="button" role="radio" aria-checked="true" aria-controls="cost-panel-percent" tabindex="0" data-cost-mode="percent">Pourcentage</button>
            <button type="button" role="radio" aria-checked="false" aria-controls="cost-panel-fixed" tabindex="-1" data-cost-mode="fixed">Forfait</button>
          </div>

          <div class="calc-mode-panel is-active" id="cost-panel-percent" data-cost-panel="percent">
            <div class="calc-percent-head">
              <label for="percent-range">Pourcentage appliqué</label>
              <div class="calc-percent-value">
                <label class="calc-sr-only" for="percent-input">Pourcentage du coût de la vente</label>
                <input id="percent-input" type="number" min="4" max="9" step="0.1" value="5" data-percent-input>
                <span>%</span>
              </div>
            </div>
            <input id="percent-range" type="range" min="4" max="9" step="0.1" value="5" data-percent-range aria-describedby="percent-range-help percent-cost-preview">
            <p class="calc-sr-only" id="percent-range-help">Valeur comprise entre 4% et 9%.</p>
            <p class="calc-cost-preview" id="percent-cost-preview" aria-live="polite" aria-atomic="true">Coût calculé : <strong data-cost-preview>17 500 €</strong></p>
          </div>

          <div class="calc-mode-panel is-disabled" id="cost-panel-fixed" data-cost-panel="fixed" aria-disabled="true">
            <label class="calc-field" for="fixed-cost">
              <span>Montant du forfait</span>
              <span class="calc-input-shell">
                <input id="fixed-cost" type="text" inputmode="numeric" autocomplete="off" value="18 000" data-fixed-cost disabled>
                <span>€</span>
              </span>
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</section>
