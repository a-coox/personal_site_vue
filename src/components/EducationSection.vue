<template>
  <Section id="education" :header="'Education & Work'" :coloured="true"></Section>
</template>

<script>
import Section from "./Section";

export default {
  name: "EducationSection",

  components: {
    Section
  }
};
</script>

<style lang="scss" scoped>
.toHide {
  max-width: 500px;
  overflow: hidden;
  font-size: 20px;
  color: white;
  transition: height 0.5s ease-out;
  height: auto;
}
</style>