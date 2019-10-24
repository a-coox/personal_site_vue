<template>
  <Section id="education" :header="'Work & Education'" :coloured="true">
    <div class="edContainer">
      <div class="segment industry">
        <briefcaseLogo />
        <h3>Industry</h3>
        <div class="timelineContainer">
          <Timeline :data="industryHistory" />
        </div>
      </div>
      <div class="segment academic">
        <gradHatLogo />
        <h3>Academic</h3>
        <div class="timelineContainer">
          <Timeline :data="academicHistory" />
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
import Section from "./Section";
import Timeline from "./Timeline";
import industryHistory from "../data/industryHistory.json";
import academicHistory from "../data/academicHistory.json";
import gradHatLogo from "../assets/icons/gradCap.svg";
import briefcaseLogo from "../assets/icons/briefcase.svg";

export default {
  name: "EducationSection",

  components: {
    Section,
    gradHatLogo,
    briefcaseLogo,
    Timeline
  },

  data() {
    return {
      industryHistory: industryHistory,
      academicHistory: academicHistory,
      showFullTimeline: false
    };
  },

  computed: {
    // showMoreText() {
    //   return this.showFullTimeline ? "Show Less" : "Show More";
    // }
  }
};
</script>

<style lang="scss" scoped>
#education {
  background: linear-gradient(135deg, #1b76feb7, #5c24dfa6);

  .edContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 1150px;

    .segment {
      max-width: 45%;

      .timelineContainer {
        background-color: rgba(255, 255, 255, 0.35);
        border-radius: 25px;
        min-width: 350px;
        padding: 20px;
      }

      h3 {
        font-size: 26px;
        margin-bottom: 15px;
        font-weight: 600;
        color: white;
      }

      svg {
        max-width: 70px;
        max-height: 70px;
        fill: white;
      }
    }
  }
}
</style>

<style lang="scss">
#education {
  & > header {
    margin-bottom: 1em;
  }
}
</style>
