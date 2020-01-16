<template>
  <span class="tooltip" @mouseover="mouseover">
    <InfoIcon class="infoIcon" />
    <span ref="tooltipText" class="tooltipText">{{ text }}</span>
  </span>
</template>

<script>
import InfoIcon from "@/assets/icons/info.svg";

export default {
  components: {
    InfoIcon
  },

  props: {
    text: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      minOffset: 10 // Minimum popup offset from screen edge,
    };
  },

  methods: {
    mouseover() {
      this.$nextTick(() => {
        const elem = this.$refs.tooltipText;
        const bbox = elem.getBoundingClientRect();

        if (bbox.left < this.minOffset) {
          const leftOffset = this.minOffset - bbox.left;
          elem.style.marginLeft = `${leftOffset}px`;
        } else if (bbox.right > window.innerWidth - this.minOffset) {
          const rightOffset = bbox.right - window.innerWidth + this.minOffset;
          elem.style.marginLeft = `${-rightOffset}px`;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.tooltip {
  display: inline-flex;
  position: relative;
  justify-content: center;
  margin: 0 5px;

  .tooltipText {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background: white;
    transition: transform 0.25s ease-out, opacity 0.25s ease-out;
    z-index: 90;
    min-width: 300px;
    padding: 5px;
    left: 50%;
    bottom: 0;
    transform: translateY(48%) translateX(12px);
  }

  &:hover {
    .tooltipText {
      opacity: 1;
      visibility: visible;
      transform: translateY(48%) translateX(17px);
    }

    .infoIcon {
      color: rgb(65, 65, 65);
    }
  }

  .infoIcon {
    width: 17px;
    height: 17px;
    color: rgb(153, 153, 152);
  }

  @include for-tablet-landscape {
    &:hover {
      .tooltipText {
        transform: translateX(-50%) translateY(-25px);
      }
    }

    .tooltipText {
      transform: translateX(-50%) translateY(-18px);
    }
  }
}
</style>
