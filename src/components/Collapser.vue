<template>
  <div ref="collapser" class="collapser">
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
  },

  methods: {
    expand() {
      const elem = this.$refs.collapser;
      const height = elem.scrollHeight;
      elem.style.height = height + "px";
      const callee = () => {
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
