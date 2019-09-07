<template>
  <Section id="skills" :header="'Skills & Experience'" :coloured="true">
    <Intersect @enter.once="animate = true" :threshold="[0.2]">
      <div class="skillContainer">
        <SkillBox :title="'Professional'" :skills="professionalSkills" :animate="animate" />
        <SkillBox :title="'Personal'" :skills="personalSkills" :animate="animate" />
      </div>
    </Intersect>
  </Section>
</template>

<script>
import Section from "./Section";
import SkillBox from "./SkillBox";
import professionalSkills from "../data/professionalSkills.json";
import personalSkills from "../data/personalSkills.json";
import Intersect from "vue-intersect";

export default {
  name: "SkillsSection",

  components: {
    Section,
    SkillBox,
    Intersect
  },

  data() {
    return {
      professionalSkills: professionalSkills,
      personalSkills: personalSkills,
      animate: false
    };
  }
};
</script>

<style lang="scss" scoped>
#skills {
  color: white;

  .skillContainer {
    width: 95%;
    max-width: 1000px;
  }
}
</style>