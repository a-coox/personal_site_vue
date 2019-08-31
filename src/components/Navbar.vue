<template>
  <nav class="navbar" :class="{ pageScroll: isScrolled }">
    <Logo :class="{ pageScroll: isScrolled }"/>
    <a href="#home" :class="{ active: (active === 'home') }">Home</a>
    <a href="#about" id="navAbout" :class="{ active: (active === 'about') }">About Me</a>
    <a href="#skills" id="navSkills" :class="{ active: (active === 'skills') }">Skills & Experience</a>
    <a href="#projects" ref="projects" :class="{ active: (active === 'projects') }">Projects</a>
    <a href="#education" ref="education" :class="{ active: (active === 'education') }">Education</a>
    <a href="#contact" ref="contact" :class="{ active: (active === 'contact') }">Contact</a>
  </nav>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'Navbar',

  components: {
    Logo
  },

  props: {
    isScrolled: {
      type: Boolean,
      default: false
    },
    active: {
      type: String,
      default: 'home'
    }
  },
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: fixed;
  background: transparent;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease-in-out;

  a {
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Nunito Sans', Georgia, sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 15px;
    margin: 0.1em;
    padding: 1.1em 0.9em;

    &:hover:not(.active) {
      color: white;
    }

    &.active {
      font-weight: 600;
      color: rgb(60, 82, 139) !important;
    }
  }

  &.pageScroll {
    background: white !important;
    border-bottom: 0.5px solid rgba(163, 161, 161, 0.95);

    a {
      color: black;

      &:hover:not(.active) {
        color: rgba(43, 122, 119, 0.6) !important;
        font-weight: 600;
      }
    }
  }
}
</style>