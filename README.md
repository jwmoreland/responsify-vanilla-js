# Responsify-Vanilla-JS

A JavaScript plugin inspired by `Responsify.js`, rebuilt without jQuery dependencies. This plugin utilizes data attributes on images to specify and protect focal areas, ensuring that important parts of your images remain visible regardless of their container's size.

## Features

- No jQuery dependency.
- Easily protect and prioritize areas within your images during resizing.
- Intuitive data-attribute based configuration.
- Smooth transition and re-calculations during window resizing.

## Installation

### Directly in HTML:

```html
<script src="path-to-your-folder/responsify.js"></script>
```

### NPM:

```
npm install responsify-vanilla-js
```

## Usage

1. Add the neccessary data attributes to your images:
    ```html
        <img class="js-focal-point-image" src="your-image.jpg" data-focus-left="0.1" data-focus-top="0.16" data-focus-right="0.94" data-focus-bottom="0.9">
    ```
    **Note:** class is not necessary, unless you initialize it with a selector

2. Initialize the plugin:
   ```javascript
    responsify('.js-focal-point-image');  // Use your specific selector.
   ```

## API
   
   `responsify(input)`
   
**Initialize Options**:  `[input]` Can be a CSS selector string (e.g., 'img.responsive') or an array of image DOM elements.

The function will process the images, making them responsive while maintaining the specified focus area.

## Examples

HTML:
```html
<img src="landscape.jpg" data-focus-left="0.2" data-focus-top="0.2" data-focus-right="0.8" data-focus-bottom="0.8">
```

---

Passing Selector as an array:
```html

<div class="panels">
    <div class="image-panel">
        <img src="./images/image-1.jpg" data-focus-top="0.1" data-focus-left=".05" data-focus-right="0.92" data-focus-bottom="0.78">
    </div>
    <div class="image-panel">
        <img src="./images/image-2.jpg" data-focus-top="0.11" data-focus-left=".05" data-focus-right="1" data-focus-bottom="0.98">
    </div>
    <div class="image-panel">
        <img src="./images/image-3.jpg" data-focus-top="0.06" data-focus-left=".21" data-focus-right="0.98" data-focus-bottom="0.87">
    </div>
</div>

<style>
    .panels { display: flex; }
    .image-panel { position: relative; }
</style>

<script>
    let focusImages = document.querySelectorAll('.image-panel img');

    responsify(focusImages);
</script>

```