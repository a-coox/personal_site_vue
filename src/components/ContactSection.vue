<template>
  <Section id="contact" :header="'Contact Me'">
    <div class="contactInfo">
      <p>
        Please, don't hestitate to contact me through any of the options below.
        I'd love to hear from you!
      </p>
      <div class="emailContainer">
        <EmailLogo class="logo" />
        <h2 class="emailText">
          {{ email[0] }}<span>{{ email[2] }}</span
          ><span class="fake">{{ email[1] }}</span
          >{{ email[3] }}<span>{{ email[4] }}</span
          >{{ email[5] }}
        </h2>
      </div>
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
    Section,
    EmailLogo
  },

  computed: {
    email() {
      return this.encodedEmail.map(atob);
    }
  },

  data() {
    return {
      encodedEmail: [
        "YWFyb24u",
        "K2hvbmV5",
        "Y29veA==",
        "QA==",
        "b3V0bG9vaw==",
        "LmNvbQ=="
      ],
      contacts: [
        {
          text: "Linkedin",
          logo: LinkedinLogo,
          link: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2Fhcm9uLWNvb3gv"
        },
        {
          text: "GitHub",
          logo: GithubLogo,
          link: "aHR0cHM6Ly9naXRodWIuY29tL2EtY29veC8="
        },
        {
          text: "Medium",
          logo: MediumLogo,
          link: "aHR0cHM6Ly9tZWRpdW0uY29tL0B0aGViZWxnaXVtZXNla2lk"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

#contact {
  .contactInfo {
    max-width: 940px;

    p {
      margin: 0 auto;
      width: 65%;
      font-size: 24px;
    }

    .emailContainer {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 30px;

      .logo {
        color: #7986f4;
        height: 50px;
      }

      .emailText {
        padding-left: 10px;

        .fake {
          visibility: hidden;
          width: 0;
          display: inline-block;
        }
      }
    }

    #contactLinks {
      margin-top: 20px;
    }
  }
}

@include for-tablet-portrait {
  .emailContainer {
    font-size: 15px;
  }
}

@include for-phone-small {
  .emailContainer {
    flex-direction: column;
    font-size: 14px;
  }
}
</style>
