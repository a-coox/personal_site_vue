<template>
  <transition name="fade-in">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
.fadeIn {
  .fade-in-enter-active,
  .fade-in-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-in-enter,
  .fade-in-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>