/**
 * Product Card Web Component
 *
 * A custom element that handles product display and variant switching
 * on collection pages with built-in caching.
 * Uses Shopify's Storefront API for detailed product data.
 */

class ProductCard extends HTMLElement {
  static productCache = {};

  constructor() {
    super();
    this.productHandle = this.getAttribute("data-product-handle");
    this.productId = this.getAttribute("data-product-id");
    this.productData = null;
    this.currentVariantId = null;
    this.loaded = false;
  }

  connectedCallback() {
    if (this.productHandle) {
      this.loadProductData();
    }
  }

  async loadProductData() {
    try {
      // Use the Storefront API function we created
      this.productData = await window.fetchProductData(this.productHandle);

      if (!this.productData) {
        console.error(`Failed to load product data for ${this.productHandle}`);
        return;
      }

      this.currentVariantId = this.productData.variants[0].id;
      this.loaded = true;

      if (this.productData.variants.length > 1) {
        this.setupVariantSelector();
      }
    } catch (error) {
      console.error(
        `Error loading product data for ${this.productHandle}:`,
        error,
      );
    }
  }

  setupVariantSelector() {
    // Find the existing container for variant selector
    // const productInfo = this.querySelector(".354-product-content");
    // if (!productInfo) return;
    // Add event listener to all radio inputs in the group
    const inputs = this.querySelectorAll(
      `input[name="${this.productId}_card_color"]`,
    );
    console.log("Input elements:", inputs);
    inputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        console.log("Variant changed:", event.target.value);
        const variantId = event.target.value;
        this.currentVariantId = variantId;
        this.updateVariantDetails(variantId);
      });
    });
  }

  updateVariantDetails(variantId) {
    if (!this.productData) return;

    // Find the selected variant
    const selectedVariant = this.productData.variants.find(
      (variant) => variant.id === variantId,
    );

    if (!selectedVariant) return;

    // Update price
    const priceElement = this.querySelector(
      ".price__regular .price-item--regular",
    );
    if (priceElement) {
      const formattedPrice = this.formatMoney(selectedVariant.price);
      priceElement.innerHTML = formattedPrice;
    }

    // Update primary and secondary images based on the variant
    this.updateVariantImages(selectedVariant);

    // Update availability state
    this.updateAvailabilityState(selectedVariant.available);

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent("variant-changed", {
        detail: {
          variantId,
          product: this.productData,
          variant: selectedVariant,
        },
        bubbles: true,
      }),
    );
  }

  updateVariantImages(selectedVariant) {
    if (!selectedVariant.featured_image) return;

    const imageContainer = this.querySelector(".group");
    if (!imageContainer) return;

    // Update the primary (visible) image
    const primaryImage = imageContainer.querySelector(".opacity-100");
    if (primaryImage && primaryImage.querySelector("img")) {
      const img = primaryImage.querySelector("img");
      img.src = selectedVariant.featured_image.src;
      if (img.srcset) {
        img.srcset = selectedVariant.featured_image.src;
      }
      if (selectedVariant.featured_image.alt) {
        img.alt = selectedVariant.featured_image.alt;
      }
    }

    // Find and update the secondary (rollover) image
    // This approach finds the next product image after the variant's image
    const secondaryImage = imageContainer.querySelector(".opacity-0");
    if (
      secondaryImage &&
      secondaryImage.querySelector("img") &&
      this.productData.images.length > 1
    ) {
      const img = secondaryImage.querySelector("img");

      // Find the index of the current variant image in the product images array
      const currentImageIndex = this.productData.images.findIndex(
        (image) => image.src === selectedVariant.featured_image.src,
      );

      // Get the next image in the array, or the first if we're at the end
      let nextImageIndex =
        (currentImageIndex + 1) % this.productData.images.length;

      // If the next image is the same as the current (rare case), try the one after
      if (
        nextImageIndex === currentImageIndex &&
        this.productData.images.length > 2
      ) {
        nextImageIndex = (nextImageIndex + 1) % this.productData.images.length;
      }

      const nextImage = this.productData.images[nextImageIndex];

      if (nextImage) {
        img.src = nextImage.src;
        if (img.srcset) {
          img.srcset = nextImage.src;
        }
        if (nextImage.alt) {
          img.alt = nextImage.alt;
        }
      }
    }
  }

  updateAvailabilityState(available) {
    if (!available) {
      this.classList.add("product-card--sold-out");
    } else {
      this.classList.remove("product-card--sold-out");
    }
  }

  formatMoney(cents) {
    return "$" + (cents / 100).toFixed(2);
  }

  disconnectedCallback() {
    // Clean up any event listeners if needed
  }
}

// Register the custom element
customElements.define("product-card", ProductCard);
