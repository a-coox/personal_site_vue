<template>
  <a>
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button",

  props: {
    text: {
      type: String,
      default: ""
    },
    symbol: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: rgb(60, 82, 139);
  border: 2px solid rgb(60, 82, 139);
  background-color: transparent;
  padding: 10px;
  display: inline-block;
  min-width: 100px;
  margin: 10px auto;
  text-align: center;
  transition: all 0.15s ease-in-out;
  border-radius: 2px;
  outline: none;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    background-color: rgb(60, 82, 139);
    color: white;
  }
}
</style>