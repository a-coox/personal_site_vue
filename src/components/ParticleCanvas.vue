<template>
  <canvas ref="canvas" :width="canvas.width" :height="canvas.height"> </canvas>
</template>

<script>
import ParticleAnimation from "@/services/particles.js";
import debounce from "@/services/debounce.js";

export default {
  name: "ParticleCanvas",

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
        height: 500,
        minWidthToRun: 495
      }
    };
  },

  watch: {
    running(newVal) {
      if (newVal) {
        if (!this.hasStarted) {
          this.hasStarted = true;
          this.animation.start();
        } else {
          this.animation.continue();
        }
      } else {
        this.animation.stop();
      }
    },
    isActive(newVal) {
      if (!this.isDeviceMobile()) {
        this.running = newVal;
      }
    }
  },

  mounted() {
    const canvas = this.$refs.canvas;
    this.canvas.width = this.$refs.canvas.clientWidth;
    this.canvas.height = this.$refs.canvas.clientHeight;

    this.$nextTick(() => {
      this.animation = new ParticleAnimation(canvas);
      window.addEventListener(
        "resize",
        debounce(evt => this.resize(evt), 50)
      );
    });
  },

  methods: {
    mousemove(evt) {
      if (!this.isDeviceMobile()) {
        this.ensureAnimationIsStarted();
        this.animation.onMouseMove(evt);
      }
    },

    isDeviceMobile() {
      const canvasWidth = this.$refs.canvas.clientWidth;
      return canvasWidth <= this.canvas.minWidthToRun;
    },

    ensureAnimationIsStarted() {
      if (!this.hasStarted) {
        this.running = true;
      }
    },

    resize() {
      if (this.isDeviceMobile()) {
        this.disableAnimation();
      } else if (this.$refs.canvas && !this.isCanvasSizeCorrect()) {
        this.setCorrectCanvasSize();
        this.running = true;
      }
    },

    disableAnimation() {
      this.running = false;
      this.animation.clearCanvas();
    },

    isCanvasSizeCorrect() {
      const { clientWidth, clientHeight } = this.$refs.canvas;
      return (
        this.canvas.width === clientWidth && this.canvas.height === clientHeight
      );
    },

    setCorrectCanvasSize() {
      const { clientWidth, clientHeight } = this.$refs.canvas;
      this.canvas.width = clientWidth;
      this.canvas.height = clientHeight;
      this.animation.updateCanvas(clientWidth, clientHeight);
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
