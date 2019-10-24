<template>
  <Intersect :threshold="[0.6]" @enter.once="animate">
    <div
      class="animateContainer"
      :class="{ animated: animated, right: direction == 'right' }"
    >
      <slot />
    </div>
  </Intersect>
</template>

<script>
import Intersect from "vue-intersect";

export default {
  name: "FadeIn",

  components: {
    Intersect
  },

  props: {
    threshold: {
      type: Array,
      default: () => [0.6]
    },
    direction: {
      type: String,
      default: "left"
    },
    toAnimate: {
      type: Boolean,
      default: false
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      animatedInternal: false
    };
  },

  computed: {
    animated() {
      return this.animatedInternal || this.toAnimate;
    }
  },

  methods: {
    animate() {
      if (this.enabled) {
        this.animatedInternal = true;
        this.$emit("animate");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.animateContainer {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.right {
    transform: translateX(20px);
  }

  &.animated {
    opacity: 100;
    transform: initial;
  }
}
</style>
