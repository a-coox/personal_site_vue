<template>
  <Section id="skills" :header="'Skills & Experience'" :coloured="true">
    <Intersect :threshold="[0.2]" @enter.once="animate = true">
      <div class="skillContainer">
        <SkillBox
          class="webSkills"
          :title="'Software Developer'"
          :skills="webDevSkills.skills"
          :description="webDevSkills.description"
          :animate="animate"
          :logo="webLogo"
        />
        <SkillBox
          :title="'Computer Engineer'"
          :skills="engSkills.skills"
          :description="engSkills.description"
          :animate="animate"
          :logo="cpuLogo"
        />
      </div>
    </Intersect>
  </Section>
</template>

<script>
import Intersect from "vue-intersect";
import Section from "./Section";
import SkillBox from "./SkillBox";
import webDevSkills from "../data/webDevSkills.json";
import engSkills from "../data/engSkills.json";
import cpuLogo from "../assets/icons/cpuLogo.svg";
import webLogo from "../assets/icons/webLogo.svg";

export default {
  name: "SkillsSection",

  components: {
    Section,
    SkillBox,
    Intersect
  },

  data() {
    return {
      webDevSkills: webDevSkills,
      engSkills: engSkills,
      animate: false,
      webLogo: webLogo,
      cpuLogo: cpuLogo
    };
  }
};
</script>

<style lang="scss" scoped>
#skills {
  color: white;

  .skillContainer {
    width: 95%;
    max-width: 1100px;
  }
}
</style>

<style lang="scss">
.webSkills .logo {
  padding: 2px;
}
</style>
