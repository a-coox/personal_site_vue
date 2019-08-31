<template>
  <div id="app">
    <Navbar :isScrolled="isScrolled" :active="active"/>
    <LandingSection ref="home"/>
    <AboutSection ref="about"/>
    <SkillsSection ref="skills"/>
    <ProjectsSection ref="project"/>
    <ExperienceSection ref="experience"/>
    <ContactSection ref="contact"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import LandingSection from './components/LandingSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ContactSection from './components/ContactSection.vue';
import InterSectionObserver from './services/InterSectionObserver';

const VIEW_THRESHOLDS = {
  min: 0.2,
  max: 0.9
};

export default {
  name: 'app',
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
      active: 'home'
    };
  },

  methods: {
    navScrollCallback(entries) {
      // Only register landing page, only 1 entry.
      const evt = entries[0];
      this.isScrolled = !evt.isIntersecting;
    },
    sectionScrollBack(entries) {
      for (const entry of entries) {
        if (!entry.target.id) {
          continue;
        }
        if (entry.isIntersecting && 
            (entry.intersectionRatio >= 0.8 || entry.intersectionRatio <= 0.3)) {
          this.active = entry.target.id;
          break;
        }
      }
    }
  },

  mounted() {
    // Initialise trigger to change nav bar colour on scroll
    const landingObserver = new InterSectionObserver(this.navScrollCallback, { threshold: 0.8 });
    landingObserver.observe(this.$refs.home.$el);

    // Another trigger to change section of the page highlighted
    const sectionObserver = new InterSectionObserver(this.sectionScrollBack, { threshold: [0.2, 0.9] });
    // const pages = ['home', 'about', 'skills', 'project', 'experience', 'contact'];
    const pages = ['home', 'about']
    pages.forEach(page => {
      sectionObserver.observe(this.$refs[page].$el);
    });
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oleo+Script|Nunito+Sans:200,300,400&display=swap');

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
