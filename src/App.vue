<template>
  <div id="app">
    <Navbar :isScrolled="isScrolled" :active="activePage" />
    <LandingSection ref="home" />
    <AboutSection ref="about" />
    <SkillsSection ref="skills" />
    <ProjectsSection ref="project" />
    <ExperienceSection ref="experience" />
    <ContactSection ref="contact" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LandingSection from "./components/LandingSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import InterSectionObserver from "./services/InterSectionObserver";

import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

export default {
  name: "app",
  components: {
    Navbar,
    LandingSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection
  },

  data() {
    return {
      isScrolled: false,
      active: 0,
      pages: ["home", "about", "skills", "project"]
    };
  },

  computed: {
    activePage() {
      return this.pages[this.active];
    }
  },

  methods: {
    navScrollCallback(entries) {
      // Only register landing page, only 1 entry.
      const evt = entries[0];
      this.isScrolled = !evt.isIntersecting;
    },
    sectionScrollBack(entries) {
      for (const entry of entries) {
        if (!entry.target.id || entry.boundingClientRect.top > 0) {
          continue;
        }
        // If scrolling from the top, change section
        if (entry.isIntersecting) {
          this.active = this.pages.indexOf(entry.target.id);
        } else {
          // Scrolling from bottom, previous section
          this.active = this.pages.indexOf(entry.target.id) + 1;
        }
      }
    }
  },

  mounted() {
    // Initialise trigger to change nav bar colour on scroll
    const landingObserver = new InterSectionObserver(this.navScrollCallback, {
      threshold: 0.8
    });
    landingObserver.observe(this.$refs.home.$el);

    // Another trigger to change section of the page highlighted
    const sectionObserver = new InterSectionObserver(this.sectionScrollBack, {
      threshold: 0.2
    });
    // const pages = ['home', 'about', 'skills', 'project', 'experience', 'contact'];
    const pages = ["home", "about", "skills", "project"];
    pages.forEach(page => {
      sectionObserver.observe(this.$refs[page].$el);
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Oleo+Script|Nunito+Sans:200,300,400,600&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
