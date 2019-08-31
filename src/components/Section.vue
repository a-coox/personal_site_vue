<template>
  <section class="section">
    <header v-if="showHeader">{{ header }}</header>
    <slot/>
  </section>
</template>

<script>
export default {
  name: 'Section',
  props: {
    header: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
  .section {
    color: #17252a;
    padding: 4em 0;
    font-family: 'Nunito Sans', Georgia, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    min-height: 98vh;
    background-color: #feffff;

    p {
      font-family: 'Nunito Sans', sans-serif;
      font-weight: 300;
    }

    header {
      position: relative;
      font-size: 2.5em;
      margin-bottom: 1.6em;
      font-family: 'Oleo Script', cursive;

      &::after,
      &::before {
        content: '';
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
  }
</style>