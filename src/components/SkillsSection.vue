<template>
  <Section 
    id="skills" 
    :header="'Skills & Experience'" 
    :coloured="true">
    <div class="skillContainer">
      <SkillBox :title="'Professional'" :skills="professionalSkills"/>
      <SkillBox :title="'Personal'" :skills="personalSkills"/>
    </div>
  </Section>
</template>

<script>
import Section from './Section';
import SkillBox from './SkillBox';
import professionalSkills from '../data/professionalSkills.json';
import personalSkills from '../data/personalSkills.json';

export default {
  name: 'SkillsSection',

  components: {
    Section,
    SkillBox
  },

  data() {
    return {
      professionalSkills: professionalSkills,
      personalSkills: personalSkills
    };
  }
}
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