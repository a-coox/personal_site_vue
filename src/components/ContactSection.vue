<template>
  <Section id="contact" :header="'Contact Me'">
    <div class="contactInfo">
      <p>
        Please, don't hestitate to contact me through any of the options below.
        I'd love to hear from you!
      </p>
      <div id="contactLinks">
        <ContactLink
          v-for="contact in contacts"
          :key="contact.text"
          v-bind="contact"
        />
      </div>
    </div>
  </Section>
</template>

<script>
import ContactLink from "./ContactLink";
import Section from "./Section";

import LinkedinLogo from "../assets/icons/linkedinLogo.svg";
import EmailLogo from "../assets/icons/emailLogo.svg";
import GithubLogo from "../assets/icons/githubLogo.svg";
import MediumLogo from "../assets/icons/mediumLogo.svg";

export default {
  name: "ContactSection",

  components: {
    ContactLink,
    Section
  },

  data() {
    return {
      contacts: [
        {
          text: "Linkedin",
          logo: LinkedinLogo,
          link: "https://www.linkedin.com/in/aaron-coox/"
        },
        {
          text: "Email",
          logo: EmailLogo,
          link: "mailto:aaron.coox@outlook.com"
        },
        {
          text: "GitHub",
          logo: GithubLogo,
          link: "https://github.com/Belgiumese/"
        },
        {
          text: "Medium",
          logo: MediumLogo,
          link: "https://medium.com/@thebelgiumesekid"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#contact {
  .contactInfo {
    max-width: 940px;

    p {
      margin: 0 auto;
      width: 65%;
      font-size: 24px;
    }

    #contactLinks {
      margin-top: 20px;
    }
  }
}
</style>
