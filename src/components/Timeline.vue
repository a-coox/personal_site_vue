<template>
  <div class="timeline">
    <div class="line" />
    <!-- <scroll-bar class="timelineElements" :style="{ height: foldHeight }" overflow="auto"> -->
    <div class="timelineElements">
      <div ref="aboveFold" class="aboveFold">
        <TimelineSegment
          v-for="(segmentData, i) in aboveFoldData"
          :key="i"
          :data="segmentData"
        />
      </div>
      <Collapser :collapsed="moreCollapsed">
        <div class="belowFold">
          <TimelineSegment
            v-for="(segmentData, i) in belowFoldData"
            :key="i"
            :data="segmentData"
          />
        </div>
      </Collapser>
      <Button
        v-if="belowFoldData.length"
        class="showMore"
        @click.native="showMore"
        >{{ showMoreText }}</Button
      >
    </div>

    <!-- </scroll-bar> -->
  </div>
</template>

<script>
// import scrollBar from "vue-scroll-bar";
import TimelineSegment from "./TimelineSegment";
import Button from "./Button";
import Collapser from "./Collapser";

export default {
  name: "Timeline",

  components: {
    TimelineSegment,
    Button,
    Collapser
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    maxShown: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      moreCollapsed: true,
      foldHeight: "auto"
    };
  },

  computed: {
    aboveFoldData() {
      return this.data.slice(0, this.maxShown);
    },

    belowFoldData() {
      return this.data.slice(this.maxShown, this.data.length);
    },

    showMoreText() {
      return this.moreCollapsed ? "Show More" : "Show Less";
    }
  },

  // mounted() {
  //   this.setHeight();
  // },

  // updated() {
  //   this.setHeight();
  // },

  methods: {
    setHeight() {
      const foldElem = this.$refs.aboveFold;
      if (foldElem && foldElem.scrollHeight) {
        this.foldHeight = `${foldElem.scrollHeight}px`;
      }
    },

    showMore() {
      this.moreCollapsed = !this.moreCollapsed;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.timeline {
  display: flex;
  align-items: stretch;

  .line {
    width: 8px;
    border-radius: 10px;
    background: linear-gradient(
      to bottom,
      rgba(12, 50, 107, 0.847),
      rgba(44, 16, 109, 0.847)
    );
    margin-right: 10px;
  }

  .timelineElements {
    flex: 1;
    overflow: hidden;

    .belowFold {
      padding-top: 40px;
    }

    .showMore {
      font-size: 18px;
      padding: 13px;
      margin-bottom: 0;
      margin-top: 15px;
    }
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
