<template>
  <Section id="project" :header="'Projects'">
    <div class="projects">
      <Project v-for="(project, i) in projects" :key="i" :project="project" />
    </div>
  </Section>
</template>

<script>
import Section from "./Section";
import Project from "./Project";
import projects from "../data/projects.json";

export default {
  name: "ProjectsSection",

  components: {
    Section,
    Project
  },

  data() {
    return {
      projects: projects
    };
  }
};
</script>

<style lang="scss" scoped>
.projects {
  margin: 0 auto;
  width: 95%;
  max-width: 920px;
}
</style>
