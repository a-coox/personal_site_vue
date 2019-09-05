<template>
  <Section id="project" :header="'Projects'">
    <div class="projects">
      <Project v-for="(project, i) in projects" :key="i" :project="project" />
      <Collapser :collapsed="moreCollapsed">
        <Project v-for="(project, i) in projectsExtra" :key="i" :project="project" />
      </Collapser>
      <Button @click.native="showMore">{{showMoreText}}</Button>
    </div>
  </Section>
</template>

<script>
import Section from "./Section";
import Project from "./Project";
import Button from "./Button";
import Collapser from "./Collapser";
import projects from "../data/projects.json";
import projectsExtra from "../data/projectsExtra.json";

export default {
  name: "ProjectsSection",

  components: {
    Section,
    Project,
    Collapser,
    Button
  },

  data() {
    return {
      moreCollapsed: true,
      projects: projects,
      projectsExtra: projectsExtra
    };
  },

  computed: {
    showMoreText() {
      return this.moreCollapsed ? "Show More" : "Show Less";
    }
  },

  methods: {
    showMore() {
      this.moreCollapsed = !this.moreCollapsed;
    }
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
