<template>
  <picture class="backgroundImage">
    <source
      srcset="img/background/background-full.webp"
      type="image/webp"
      media="(min-resolution: 120dpi"
    />
    <source srcset="img/background/background-full.jpg" type="image/jpeg" />
    <img src="background-full.jpeg" alt="Background of a city at night" />

    <source srcset="img/background/background-full.webp" type="image/webp" />
    <source srcset="img/background/background-full.jpg" type="image/jpeg" />
    <img src="background-full.jpeg" alt="Background of a city at night" />
  </picture>
</template>

<style lang="scss" scoped>
.backgroundImage {
  object-fit: contain;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>
