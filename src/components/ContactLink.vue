<template>
  <div class="contactLink">
    <a :href="link" target="_blank">
      <component :is="logo" />
    </a>
    <p class="iconSub">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "ContactLink",

  props: {
    link: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    logo: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.contactLink {
  display: inline-block;
  padding: 5%;

  p {
    margin: 0 auto;
    text-align: center;
    font-size: 22px;
    position: relative;
    top: -5px;
  }

  a {
    color: #3d64c3;
    transition: 0.15s linear;

    &:hover {
      cursor: pointer;
      color: #1a182b;
    }

    svg {
      height: 80px;
    }
  }
}
</style>