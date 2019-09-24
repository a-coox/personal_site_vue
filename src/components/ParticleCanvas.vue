<template>
  <canvas ref="canvas" width="1500" height="750" @mousemove.stop="animation.onMousemove">
  </canvas>
</template>

<script>
import ParticleAnimation from "@/services/particles.js";

export default {
  name: 'ParticleCanvas',

  data() {
    return {
      animation: null
    };
  },

  mounted() {
    const canvas = this.$refs.canvas;
    console.log("HEELOOO")
    this.animation = new ParticleAnimation(canvas);
    this.animation.start();
  }
};
</script>