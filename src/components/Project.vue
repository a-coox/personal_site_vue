<template>
  <Intersect @enter.once="inViewCallback" :threshold="[0.6]">
    <div class="project" :class="{animated: animated}">
      <img :src="project.img" :alt="project.imgAlt" />
      <div class="projText">
        <h2>{{project.name}}</h2>
        <p>{{project.description}}</p>
        <ul class="projTags">
          <li v-for="(tag, i) in project.tags" :key="i">{{tag}}</li>
        </ul>
        <slot />
      </div>
    </div>
  </Intersect>
</template>

<script>
import Intersect from "vue-intersect";

export default {
  name: "Project",

  props: {
    project: {
      type: Object,
      default: () => {
        return {
          name: "",
          img: "",
          imgAlt: "",
          description: "",
          tags: []
        };
      }
    }
  },

  components: {
    Intersect
  },

  data() {
    return {
      animated: false
    };
  },

  methods: {
    inViewCallback() {
      this.animated = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/fadeIn.scss";

.project {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding: 2em 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  opacity: 0;

  &.animated {
    @include fade-in;
  }

  .projText {
    font-size: 18px;
    text-align: left;
    width: 100%;
    padding-left: 5%;

    h2 {
      font-size: 23px;
      text-align: left;
      margin-bottom: 16px;
    }

    .projTags li {
      font-size: 16px;
      display: inline-block;
      border-radius: 0.7em;
      background-color: rgba(23, 37, 42, 0.65);
      color: white;
      padding: 5px 13px;
      margin-right: 8px;
      margin-top: 0.6em;
    }
  }

  img {
    border-radius: 20px;
    width: 37%;
  }

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-of-type {
    padding-top: 0;
  }
}
</style>