<template>
  <div class="project">
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
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
.project {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding: 2em 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

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