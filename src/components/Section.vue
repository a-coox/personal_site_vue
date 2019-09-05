<template>
  <section class="section" :class="{coloured: coloured}">
    <header v-if="showHeader">{{ header }}</header>
    <slot />
  </section>
</template>

<script>
export default {
  name: "Section",
  props: {
    header: {
      type: String,
      default: ""
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    coloured: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.section {
  color: #17252a;
  padding: 4em 0;
  font-family: "Nunito Sans", Georgia, sans-serif;
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 100vh;
  background-color: #feffff;

  p {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 300;
  }

  header {
    position: relative;
    font-size: 2.5em;
    margin-bottom: 1.6em;
    font-family: "Oleo Script", cursive;

    &::after,
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
      margin: 0 10px;
      width: 60px;
      height: 2px;
      background-color: #17252a;
    }

    &::after {
      right: 100%;
    }

    &::before {
      left: 100%;
    }
  }

  &.coloured {
    background: linear-gradient(
      135deg,
      rgba(27, 171, 254, 0.65),
      rgba(36, 48, 223, 0.65)
    );

    header {
      color: white;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

      &::before,
      &::after {
        background-color: white;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>