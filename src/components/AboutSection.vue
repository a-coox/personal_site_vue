<template>
  <Section id="about" :header="'About Me'">
    <transition name="fade-in">
      <div id="aboutContainer">
        <p>
          I'm an enthusiastic student interested in all things electronic, from web app development to C
          micro-controller programming.
          I love reading to complement my studies or unwind.
          <br />
          <br />Side projects and work knowledge are what give me a strong skillset to bring to the workforce. My
          internships and
          tutoring experience have given me a deeper understanding of programming and teamwork. I live in Brisbane,
          Australia
          where I study engineering at the University of Queensland.
          <br />
          <br />I am always interested in opportunities to expand my experience!
        </p>
        <img src="../assets/img/me.png" alt="Handsome photo of me" id="myPhoto" />
      </div>
    </transition>
  </Section>
</template>

<script>
import Section from "./Section";

export default {
  name: "AboutSection",
  components: {
    Section
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding-top: 3em;
  justify-content: center;
}

#aboutContainer {
  max-width: 980px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-around;

  p {
    width: 60%;
    font-size: 1.2em;
    text-align: left;
  }

  #myPhoto {
    width: calc(9em + 15%);
    border-radius: 100%;
    object-fit: contain;
  }
}
</style>