<template>
  <div id="app">
    <Navbar
      :is-scrolled="isScrolled"
      :active="activePage"
      :is-scrolled-fully="isScrolledFully"
    />
    <LandingSection
      ref="home"
      :is-active="!isScrolledFully"
      @enter="onEnter"
      @leave="onLeave"
    />
    <AboutSection ref="about" />
    <SkillsSection ref="skills" />
    <ProjectsSection ref="project" />
    <EducationSection ref="education" />
    <ContactSection ref="contact" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LandingSection from "./components/LandingSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import EducationSection from "./components/EducationSectionNew.vue";
import ContactSection from "./components/ContactSection.vue";

import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();
require("intersection-observer");

export default {
  name: "App",
  components: {
    Navbar,
    LandingSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    EducationSection,
    ContactSection
  },

  data() {
    return {
      isScrolled: false,
      active: 0,
      pages: ["home", "about", "skills", "project", "education", "contact"]
    };
  },

  computed: {
    activePage() {
      return this.pages[this.active];
    },
    isScrolledFully() {
      return this.active != 0;
    }
  },

  mounted() {
    // Another trigger to change section of the page highlighted
    const sectionObserver = new IntersectionObserver(this.sectionScrollBack, {
      threshold: 0.2
    });
    this.pages.forEach(page => {
      sectionObserver.observe(this.$refs[page].$el);
    });
  },

  methods: {
    onEnter(evt) {
      if (evt[0].intersectionRatio > 0.8) {
        this.isScrolled = false;
      } else {
        this.isScrolled = true;
      }
    },
    onLeave() {
      this.isScrolled = true;
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
