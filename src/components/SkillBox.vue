<template>
  <div class="skillBox">
    <component :is="logo" class="logo" />
    <h3 class="skillHead">{{ title }}</h3>

    <p class="description">{{ description }}</p>

    <h4>Languages I use:</h4>
    <div class="skills">
      <Skill
        v-for="(skill, i) in skills"
        :key="i"
        :skill="skill"
        :animate="animate"
      />
    </div>
    <div class="scale">
      <div id="basic">Basic</div>
      <div id="good">Intermediate</div>
      <div id="advanced">Advanced</div>
    </div>
  </div>
</template>

<script>
import Skill from "./Skill.vue";

export default {
  name: "SkillBox",

  components: {
    Skill
  },

  props: {
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => {}
    },
    description: {
      type: String,
      default: ""
    },
    animate: {
      type: Boolean,
      default: false
    },
    logo: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.skillBox {
  color: #17252a;
  vertical-align: top;
  padding: 25px 30px;
  margin: 0 3%;
  margin-bottom: 40px;
  width: 40%;
  min-width: 350px;
  display: inline-block;
  background-color: #feffff;
  border-radius: 10px;

  & > div:last-child() {
    margin-bottom: 15px;
  }

  .logo {
    max-height: 75px;
    margin-bottom: 5px;
  }

  .skillHead {
    font-weight: 600;
    font-size: 25px;
  }

  .description {
    margin: 20px 0;
    font-size: 17.5px;
  }

  h4 {
    margin: 25px 0 20px 0;
    font-size: 20px;
    text-align: left;
  }

  .scale {
    text-align: left;
    font-size: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    & > div {
      line-height: 2em;
      position: relative;
      text-align: center;
      display: inline-block;
      font-size: 15px;
      font-weight: 600;
      border-bottom: 3px solid transparent;
      flex: 1;

      &::before {
        left: 0;
      }

      &::before,
      &:last-of-type::after {
        position: absolute;
        display: inline-block;
        content: "";
        width: 3px;
        height: 17px;
        bottom: -2px;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }

    #basic {
      border-image: linear-gradient(to right, #30cfd0 0%, #318dad 100%) 1;

      &::before {
        background-color: #30cfd0;
      }
    }

    #good {
      border-image: linear-gradient(to right, #318dad 0%, #324b8a 100%) 1;

      &::before {
        background-color: #318dad;
      }
    }

    #advanced {
      border-image: linear-gradient(to right, #324b8a 0%, #330967 100%) 1;

      &::before {
        background-color: #324b8a;
      }

      &::after {
        background-color: #330967;
        left: inherit;
        right: 0;
      }
    }
  }
}

@include for-tablet-landscape {
  .skillBox {
    width: 95%;
    max-width: 480px;
    min-width: initial;
  }
}
</style>
