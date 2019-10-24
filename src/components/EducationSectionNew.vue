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
    Timeline,
    briefcaseLogo
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
@import "../styles/screenSizes.scss";

#education {
  background: linear-gradient(
    135deg,
    rgba(27, 118, 254, 0.718),
    rgba(92, 36, 223, 0.651)
  );
  padding-bottom: 3.5em;

  .edContainer {
    width: 97%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1150px;

    .segment {
      width: 520px;
      margin: 0 15px 20px 15px;

      &:last-of-type {
        margin-bottom: 0;
      }

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

@include for-phone {
  #education {
    .edContainer {
      .segment {
        margin-left: 0;
        margin-right: 0;

        .timelineContainer {
          padding: 20px 5px;
          background-color: transparent;
        }
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
