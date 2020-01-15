<template>
  <div class="tooltip">
    <InfoIcon class="infoIcon" />
    <span class="tooltipText">{{ text }}</span>
  </div>
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
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;

  .tooltipText {
    position: absolute;
    visibility: hidden;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    background: white;
    transition: all 0.16s ease-in-out;
    z-index: 90;
    min-width: 300px;
  }

  &:hover {
    .tooltipText {
      visibility: visible;
    }
  }

  .infoIcon {
    width: 15px;
    height: 15px;
    fill: rgb(20, 20, 20);
  }
}
</style>
