<template>
  <canvas ref="canvas" :width="canvas.width" :height="canvas.height">
  </canvas>
</template>

<script>
import ParticleAnimation from "@/services/particles.js";
import debounce from "@/services/debounce.js";

export default {
  name: 'ParticleCanvas',

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      animation: null,
      running: false,
      hasStarted: false,
      canvas: {
        width: 500,
        height: 500
      }
    };
  },

  methods: {
    mousemove(evt) {
      if (!this.hasStarted) {
        this.running = true;
      }
      this.animation.onMouseMove(evt);
    },
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

  watch: {
    running(newVal) {
      if (newVal) {
        console.log('playing');
        if (!this.hasStarted) {
          this.hasStarted = true;
          this.animation.start();
        } else {
          this.animation.continue();
        }
      } else {
        console.log('Pausing');
        this.animation.stop();
      }
    },
    isActive(newVal) {
      this.running = newVal;
    }
  },

  mounted() {
    const canvas = this.$refs.canvas;
    this.canvas.width = this.$refs.canvas.clientWidth;
    this.canvas.height = this.$refs.canvas.clientHeight;

    this.$nextTick(() => {
      this.animation = new ParticleAnimation(canvas);
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