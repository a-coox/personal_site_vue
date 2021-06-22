<template>
  <div class="navbar">
    <HamburgerMenu
      :dark="isScrolledFully"
      :open="hamburgOpen"
      @click.native="onClickHamburg"
    />
    <div v-show="hamburgOpen" class="menuOverlay" />
    <nav
      :class="{ pageScroll: isScrolled, slideIn: hamburgOpen }"
      @click="onClick($event)"
    >
      <Logo :class="{ pageScroll: isScrolled }" />
      <a href="#home" :class="{ active: active === 'home' }">Home</a>
      <a id="navAbout" href="#about" :class="{ active: active === 'about' }"
        >About Me</a
      >
      <a
        ref="education"
        href="#education"
        :class="{ active: active === 'education' }"
        >Experience</a
      >
      <a
        ref="projects"
        href="#projects"
        :class="{ active: active === 'projects' }"
        >Projects</a
      >
      <a id="navSkills" href="#skills" :class="{ active: active === 'skills' }"
        >Skills</a
      >
      <a ref="contact" href="#contact" :class="{ active: active === 'contact' }"
        >Contact</a
      >
    </nav>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import HamburgerMenu from "./HamburgerMenu";
import { smoothScroll } from "../services/SmoothScroll";

export default {
  name: "Navbar",

  components: {
    Logo,
    HamburgerMenu
  },

  props: {
    isScrolled: {
      type: Boolean,
      default: false
    },
    active: {
      type: String,
      default: "home"
    },
    isScrolledFully: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      hamburgOpen: false
    };
  },

  methods: {
    onClick(evt) {
      smoothScroll(evt);
      this.hamburgOpen = false;
    },
    onClickHamburg() {
      this.hamburgOpen = !this.hamburgOpen;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/screenSizes.scss";

.navbar {
  touch-action: none;

  .menuOverlay {
    z-index: 90;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0.4;
    background-color: black;
  }

  nav {
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

    & > a:not(.logo) {
      text-transform: uppercase;
      text-decoration: none;
      font-family: "Nunito Sans", Georgia, sans-serif;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      font-size: 15px;
      margin: 0.1em;
      padding: 1em 0.9em;

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
          color: rgb(97, 143, 228) !important;
          font-weight: 600;
        }
      }
    }

    @include for-tablet-portrait {
      $width: 260px;

      display: initial;
      overflow: hidden;
      position: fixed;
      height: 100%;
      width: $width;
      left: -$width;
      background-color: white;
      transition: transform 0.5s ease-in-out;
      border-right: 1px solid rgba(0, 0, 0, 0.15);
      border-bottom: none;

      a {
        color: black !important;
        display: block;
      }

      .logo {
        fill: #3a72b8;
        position: initial;
        margin-top: 20px;
        margin-bottom: 30px;
      }

      &.slideIn {
        display: initial;
        transform: translateX(260px);
      }
    }
  }
}
</style>
