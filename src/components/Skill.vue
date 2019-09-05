<template>
  <div class="skill">
    <p>{{skill.name}}</p>
    <div class="barGraph">
      <div class="bar" v-for="(level, i) in skill.level" :key="i"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skill",

  props: {
    skill: {
      type: Object,
      default() {
        return {
          name: "",
          level: 0
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.skill {
  margin-bottom: 25px;

  p {
    font-size: 1.05em;
    text-align: left;
    font-weight: 300;
  }

  .barGraph {
    font-size: 0;
    position: relative;
    text-align: left;
    height: 5px;
    margin-top: 10px;

    .bar {
      position: relative;
      top: -4px;
      width: 14.15%;
      background-color: #2b7a78;
      height: 5px;
      display: inline-block;
      border-radius: 8px;
      margin: 0 1.5%;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &:nth-child(6) {
        background-color: #330968;
      }

      &:nth-child(5) {
        background-color: #322f7c;
      }

      &:nth-child(4) {
        background-color: #32538f;
      }

      &:nth-child(3) {
        background-color: #316698;
      }

      &:nth-child(2) {
        background-color: #3192b0;
      }

      &:nth-child(1) {
        background-color: #30cdcf;
      }
    }
  }

  .info {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;
    vertical-align: middle;
    margin-bottom: 5px;

    &:hover {
      color: rgba(0, 0, 0, 0.8);

      &::before,
      &::after {
        visibility: visible;
        opacity: 1;
        transform: translateX(5px) translateY(-50%);
      }
    }
  }

  span {
    position: relative;

    &::before {
      font-size: 15px;
      line-height: 20px;
      text-align: left;
      padding: 12px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      width: 300px;
      border-radius: 3px;
      background: white;
      color: black;
      content: attr(data-info);
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: all 0.16s ease-in-out;
      top: 50%;
      left: 140%;
      margin-left: 5px;
      transform: translateY(-50%);
      z-index: 90;
    }

    &::after {
      border: 10px solid transparent;
      width: 0;
      content: "";
      top: 50%;
      left: 120%;
      transform: translateY(-50%);
      border-right: 10px solid rgba(0, 0, 0, 0.3);
      border-left: none;
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: all 0.16s ease-in-out;
    }
  }
}
</style>