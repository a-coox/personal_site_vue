<template>
  <picture>
    <source :srcset="src + '.webp'" type="image/webp" />
    <source :srcset="`${src}.${ext}`" :type="'image/' + ext" />
    <img :src="`${src}.${ext}`" :alt="alt" />
  </picture>
</template>

<script>
export default {
  name: "Picture",
  props: {
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    ext: {
      type: String,
      default: "jpg"
    }
  }
};
</script>

<style lang="scss" scoped>
picture {
  display: inline-block;

  img {
    width: 100%;
  }
}
</style>
