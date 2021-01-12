<template>
  <div class="contactLink">
    <a :href="decryptedLink" target="_blank">
      <component :is="logo" />
    </a>
    <p class="iconSub">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "ContactLink",

  props: {
    link: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    logo: {
      type: Object,
      default: null
    }
  },

  computed: {
    decryptedLink() {
      return atob(this.link);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.contactLink {
  display: inline-block;
  padding: 2% 5% 5% 5%;

  p {
    margin: 0 auto;
    text-align: center;
    font-size: 22px;
    position: relative;
    top: -5px;
  }

  a {
    color: #3d64c3;
    transition: 0.15s linear;

    &:hover {
      cursor: pointer;
      color: #1a182b;
    }

    svg {
      height: 80px;
    }
  }
}

@include for-tablet-portrait {
  .contactLink {
    padding: 3%;

    a {
      svg {
        height: 60px;
      }
    }

    p {
      font-size: 20px;
    }
  }
}

@include for-phone {
  .contactLink {
    p {
      font-size: 18px;
    }
  }
}
</style>
