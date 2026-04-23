# Senior Shopify Developer Task – Custom Curtain PDP

## 📌 Overview

This project is a custom Product Detail Page (PDP) implementation for curtain products, built as part of the Senior Shopify Developer technical assessment.

The solution demonstrates:

* Dynamic pricing using Shopify metafields
* Hidden variant handling (Fabric Panels)
* Real-time UI updates without page reload
* Clean and scalable architecture using Liquid and JavaScript

---

## 🎯 Objectives Covered

* Fabric Panel variant is hidden from the frontend
* Drop is the only visible variant option
* Width selection determines Fabric Panel count via metafields
* Price updates dynamically based on:

  * Width
  * Fabric Panel (calculated internally)
  * Drop
* Seamless user experience with no page refresh

---

## 🧠 Pricing Logic

The pricing mechanism is fully driven by metafields.

### Flow:

1. User selects **Width**
2. Width maps to **Fabric Panel count** using metafield
3. User selects **Drop**
4. A key is generated:

   ```
   {fabric_panel}/{drop}
   ```
5. This key is used to fetch price from `price_mappings`
6. Price is updated dynamically on the PDP
7. Corresponding variant is selected in the background for cart submission

---

## 🧪 Example

**Input:**

* Width: 150 cm
* Drop: 400 cm

**Process:**

* Fabric Panels = 3
* Key = `3/400`
* Price = 6000

**Output:**

* Price updates instantly on UI
* Correct variant added to cart

---

## 🧩 Product Configuration

### Variants

**Fabric Panel (Hidden)**

* 1, 2, 3, 4, 5, 6

**Drop (Visible)**

* 300 cm
* 400 cm

---

## 🗂️ Metafields Setup

All metafields are created under namespace: `custom`

---

### 1. Price Mapping

* **Key:** `custom.price_mappings`
* **Type:** JSON

```json
{
  "1/300": 1000,
  "1/400": 2000,
  "2/300": 2000,
  "2/400": 3000,
  "3/300": 4000,
  "3/400": 6000,
  "4/300": 6000,
  "4/400": 9000,
  "5/300": 8000,
  "5/400": 12000,
  "6/300": 10000,
  "6/400": 15000
}
```

---

### 2. Fabric Panel Mapping

* **Key:** `custom.fabric_panel_count`
* **Type:** JSON

```json
{
  "50": 1,
  "100": 2,
  "150": 3,
  "200": 4,
  "250": 5,
  "300": 6
}
```

---

### 3. Width Options

* **Key:** `custom.width`
* **Type:** List (Single line text)

Example:

```
50 cm, 100 cm, 150 cm, 200 cm, 250 cm, 300 cm
```

---

### 4. Additional Fields

| Field               | Key                   | Type |
| ------------------- | --------------------- | ---- |
| Chain Side          | custom.chain_side     | List |
| Chain Colour        | custom.chain_color    | List |
| Installation Height | custom.install_height | List |

---

### 5. Tooltip Fields

| Field                    | Key                             |
| ------------------------ | ------------------------------- |
| Width Info               | custom.width_info               |
| Drop Info                | custom.drop_info                |
| Chain Side Info          | custom.chain_side_info          |
| Chain Colour Info        | custom.chain_colour_info        |
| Installation Height Info | custom.installation_height_info |

---

## 🧱 Metaobjects

Metaobjects are used to manage Fabric and Color swatches dynamically.

---

### Fabric Metaobject

* **Type:** `fabric`

Fields:

* name (text)
* image (file)

---

### Color Metaobject

* **Type:** `color`

Fields:

* name (text)
* color (color picker)

---

## ⚙️ Installation Steps

1. Upload files:

   * `/sections/custom-pdp.liquid`
   * `/assets/custom-pdp.js`
   * `/assets/custom-pdp.css`
   * `/snippets/custom-pdp-data.liquid`

2. Open Shopify Theme Customizer

3. Add **Custom PDP Section** to product template

4. Configure product:

   * Add required variants
   * Add metafields
   * Add metaobject entries

5. Save and test functionality

---

## 🛒 Cart Adjustment

To hide Fabric Panel from cart display:

```liquid
{%- for option in item.options_with_values -%}
  {% unless option.name == 'Fabric Panel' %}
  <div class="product-option">
    <dt>{{ option.name }}:</dt>
    <dd>{{ option.value }}</dd>
  </div>
  {% endunless %}
{%- endfor -%}
```

---

## ⚡ Key Highlights

* Dynamic pricing using metafields
* Hidden variant logic for clean UX
* Real-time updates using JavaScript
* Fully responsive design
* Modular and maintainable code structure

---

## 🔗 Demo

**Store URL:**
https://3bp9ihkwtj93q4e6-76083167521.shopifypreview.com/products_preview

**Password:**
zarrii

---

## 📂 Repository

GitHub Repository:
https://github.com/Zarrrii08/Curtain-Product-PDP---Ropstom/
