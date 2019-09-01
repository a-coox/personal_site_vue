<template>
  <div class="skillBox">
    <h3 class="skillHead">{{title}}</h3>
    <Skill v-for="(skill, i) in skills" :key="i" :skill="skill" />
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

  props: {
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => {}
    }
  },

  components: {
    Skill
  }
};
</script>

<style lang="scss" scoped>
.skillBox {
  color: #17252a;
  vertical-align: top;
  padding: 1.5em;
  padding-top: 0;
  margin: 0 3%;
  margin-bottom: 40px;
  width: 40%;
  min-width: 350px;
  display: inline-block;
  background-color: #feffff;
  border-radius: 2px;

  .skillHead {
    position: relative;
    top: -25px;
    font-size: 1.5em;
    background-color: rgb(226, 239, 247);
    display: inline-block;
    width: 200px;
    padding: 15px;
    border-radius: 4px;
  }

  & > div:last-child() {
    margin-bottom: 15px;
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
</style>