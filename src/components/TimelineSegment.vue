<template>
  <FadeIn :direction="'right'" class="timelineSegment">
    <div class="arrow" />
    <div class="text">
      <h3 class="title">{{ data.title }}</h3>
      <h4 class="date">{{ data.date }}</h4>
      <p class="description">{{ data.description }}</p>
    </div>
  </FadeIn>
</template>

<script>
import FadeIn from "./FadeIn";

export default {
  name: "TimelineSegment",

  components: {
    FadeIn
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.timelineSegment {
  display: flex;
  margin-bottom: 40px;
  height: 190px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .arrow {
    $size: 15px;

    position: relative;
    left: 1px;
    width: 0;
    height: 0;
    border-top: $size solid transparent;
    border-bottom: $size solid transparent;
    border-right: $size solid white;
    margin-top: 30px;
  }

  .text {
    text-align: left;
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

    .title {
      font-size: 20px;
      color: rgb(23, 31, 88);
    }

    .description {
      font-size: 18px;
    }

    .date {
      margin-bottom: 8px;
      color: rgb(89, 89, 95);
    }
  }
}

@include for-phone {
  .timelineSegment {
    height: initial;

    .arrow {
      $size: 12px;

      border-top: $size solid transparent;
      border-bottom: $size solid transparent;
      border-right: $size solid white;
    }
  }
}
</style>
