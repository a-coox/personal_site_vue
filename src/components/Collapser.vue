<template>
  <div class="collapser" ref="collapser">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Collapser",

  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    expand() {
      const elem = this.$refs.collapser;
      const height = elem.scrollHeight;
      elem.style.height = height + "px";
      const callee = evt => {
        elem.removeEventListener("transitionend", callee);
        elem.style.height = null;
        this.hidden = false;
      };
      elem.addEventListener("transitionend", callee);
    },

    collapse() {
      const elem = this.$refs.collapser;
      const height = elem.scrollHeight;
      const transition = elem.style.transition;
      elem.style.transition = "";

      requestAnimationFrame(() => {
        elem.style.height = height + "px";
        elem.style.transition = transition;

        requestAnimationFrame(() => {
          elem.style.height = "0px";
          this.hidden = true;
        });
      });
    }
  },

  watch: {
    collapsed(shouldCollapse, isCollapsed) {
      if (isCollapsed && !shouldCollapse) {
        this.expand();
      } else if (!isCollapsed && shouldCollapse) {
        this.collapse();
      }
    }
  },

  mounted() {
    const elem = this.$refs.collapser;
    elem.style.height = "0px";
  }
};
</script>

<style lang="scss" scoped>
.collapser {
  overflow: hidden;
  transition: height 0.5s ease-out;
  height: auto;
}
</style>