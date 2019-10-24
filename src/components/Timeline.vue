<template>
  <div class="timeline">
    <div class="line" />
    <div class="timelineElements">
      <TimelineSegment
        v-for="(segmentData, i) in data"
        :key="i"
        :data="segmentData"
      />
    </div>
  </div>
</template>

<script>
import TimelineSegment from "./TimelineSegment";

export default {
  name: "Timeline",

  components: {
    TimelineSegment
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.timeline {
  display: flex;

  .line {
    width: 8px;
    border-radius: 10px;
    background: linear-gradient(180deg, #0c326bd8, #2c106dd8);
    margin-right: 10px;
  }

  .timelineElements {
    flex: 1;
  }
}

@include for-phone {
  .timeline {
    .line {
      margin-right: 5px;
    }
  }
}
</style>
