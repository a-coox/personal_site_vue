<template>
  <div id="hamburgerMenu" :class="{dark: dark, open: open}">
    <div class="icon">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HamburgerMenu",

  props: {
    dark: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

#hamburgerMenu {
  z-index: 101;
  display: none;
  position: fixed;
  top: 30px;
  left: 30px;
  cursor: pointer;
  color: white;

  .icon {
    .bar {
      width: 26px;
      height: 4px;
      background-color: white;
      transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
      margin: 5px auto;
    }
  }

  &.open {
    .bar {
      background-color: black;

      &:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }

      &:nth-child(2) {
        width: 0;
      }

      &:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }

  &.dark {
    .bar {
      background-color: black;
    }
  }

  @include for-tablet-portrait {
    display: initial;
  }
}
</style>