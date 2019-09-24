<template>
  <canvas ref="canvas" :width="canvas.width" :height="canvas.height" @mousemove.stop="animation.onMousemove">
  </canvas>
</template>

<script>
import ParticleAnimation from "@/services/particles.js";
import debounce from "@/services/debounce.js";

export default {
  name: 'ParticleCanvas',

  data() {
    return {
      animation: null,
      canvas: {
        width: 500,
        height: 500
      }
    };
  },

  methods: {
    resize(evt) {
      if (this.$refs.canvas) {
        const { clientWidth, clientHeight } = this.$refs.canvas;
        if (this.canvas.width != clientWidth || this.canvas.height != clientHeight) {
          this.canvas.width = clientWidth;
          this.canvas.height = clientHeight;
          this.animation.updateCanvas(clientWidth, clientHeight);
        }
      }
    }
  },

  mounted() {
    const canvas = this.$refs.canvas;
    this.canvas.width = this.$refs.canvas.clientWidth;
    this.canvas.height = this.$refs.canvas.clientHeight;

    this.$nextTick(() => {
      this.animation = new ParticleAnimation(canvas);
      this.animation.start();

      window.addEventListener('resize', debounce((evt) => this.resize(evt), 50));
    });
  }
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>