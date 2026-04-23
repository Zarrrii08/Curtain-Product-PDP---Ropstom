document.addEventListener("DOMContentLoaded", () => {
  const widthSelector = document.getElementById("width-selector");
  const dropSelector = document.getElementById("drop-selector");
  const priceEl = document.querySelector(".cart-price");
  const variantInput = document.getElementById("variant-id-input");
  const cartBtn = document.querySelector(".btn--add-to-cart");

  const crState = {
    width: null,
    drop: null,
    panels: null,
    variant: null
  };

  const extractNumber = (val) => val.split(" ")[0];

  const getPanels = (width) => {
    return window.crProduct.fabricPanelMap[width] || null;
  };

  const getPrice = (panels, drop) => {
    return window.crProduct.priceMap[`${panels}/${drop}`] || null;
  };

  const findVariant = (panels, drop) => {
    return window.crProduct.variants.find(v =>
      v.options.includes(String(panels)) &&
      v.options.includes(`${drop} cm`)
    );
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(window.crProduct.locale, {
      style: "currency",
      currency: window.crProduct.currency
    }).format(amount);
  };

  const handleError = () => {
    priceEl.innerText = "Unavailable";
    cartBtn.disabled = true;
  };

  const updateUI = (price, variant) => {
    priceEl.innerText = formatMoney(price);
    variantInput.value = variant.id;

    if (variant.available) {
      cartBtn.disabled = false;
      cartBtn.classList.remove("sold-out");
    } else {
      cartBtn.disabled = true;
      cartBtn.classList.add("sold-out");
    }
  };

  const updateProduct = () => {
    const width = extractNumber(widthSelector.value);
    const drop = extractNumber(dropSelector.value);

    const panels = getPanels(width);
    const price = getPrice(panels, drop);
    const variant = findVariant(panels, drop);

    if (!panels || !price || !variant) {
      handleError();
      return;
    }

    updateUI(price, variant);
  };

  widthSelector.addEventListener("change", updateProduct);
  dropSelector.addEventListener("change", updateProduct);

  updateProduct();
});