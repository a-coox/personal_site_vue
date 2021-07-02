<template>
  <Section id="about" :header="'About Me'">
    <div id="aboutContainer">
      <p>
        I'm an enthusiastic engineer interested in all things electronic, from
        web development to embedded systems.
        <br />
        <br />Side projects and work knowledge are what give me a strong
        skillset to bring to the workforce. My internships and tutoring
        experience have given me a deeper understanding of programming and
        teamwork. I studied engineering at the University of Queensland, and now
        work in San Francisco, CA.
        <br />
        <br />I am always interested in opportunities to expand my experience!
      </p>
      <Picture
        id="myPhoto"
        :src="'img/me'"
        :ext="'png'"
        :alt="'Handsome photo of me'"
      />
    </div>
  </Section>
</template>

<script>
import Section from "./Section";
import Picture from "./Picture";

export default {
  name: "AboutSection",
  components: {
    Section,
    Picture
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

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
}

@include for-tablet-portrait {
  #aboutContainer {
    flex-direction: column-reverse;

    p {
      width: 90%;
      max-width: 600px;
      text-align: center;
    }

    #myPhoto {
      margin-bottom: 30px;
    }
  }
}

@include for-phone {
  #aboutContainer {
    p {
      font-size: 17px;
    }
  }
}
</style>

<style lang="scss">
#myPhoto {
  width: calc(9em + 15%);

  img {
    border-radius: 100%;
    object-fit: contain;
  }
}
</style>
