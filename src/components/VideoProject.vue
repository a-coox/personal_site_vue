<template>
  <FadeIn>
    <div class="project">
      <Video
        class="picture"
        width="600"
        height="480"
        :id="project.videoId"
        :title="project.videoTitle"
      />
      <div class="projText">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <ul class="projTags">
          <li v-for="(tag, i) in project.tags" :key="i">{{ tag }}</li>
        </ul>
        <Button
          v-if="project.link"
          :href="project.link.href"
          target="_blank"
          class="button"
        >
          {{ project.link.text }}
        </Button>
        <slot />
      </div>
    </div>
  </FadeIn>
</template>

<script>
import FadeIn from "./FadeIn";
import Button from "./Button";
import Video from "./Video";

export default {
  name: "VideoProject",

  components: {
    FadeIn,
    Button,
    Video
  },

  props: {
    project: {
      type: Object,
      default: () => {
        return {
          name: "",
          videoId: "",
          videoTitle: "",
          description: "",
          tags: []
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/fadeIn.scss";
@import "../styles/screenSizes.scss";

.project {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding: 2em 0;
  border-top: 1px solid rgba(0, 0, 0, 0.15);

  &.animated {
    @include fade-in;
  }

  .projText {
    display: flex;
    flex-direction: column;
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

    .button {
      margin-top: 25px;
    }
  }
}

@include for-tablet-landscape {
  .project {
    .picture {
      width: 80%;
    }
  }
}

@include for-tablet-portrait {
  .project {
    flex-wrap: wrap;

    .picture {
      width: 380px;
      margin-bottom: 20px;
    }

    .projText {
      max-width: 85%;
      text-align: center;
      padding-left: 0;

      h2 {
        text-align: center;
        margin-bottom: 10px;
        font-size: 26px;
      }
    }
  }
}

@include for-phone {
  .project {
    .projText {
      p {
        font-size: 17px;
      }
    }
  }
}

@include for-phone-small {
  .project {
    .picture {
      width: 85%;
      max-width: 350px;
    }

    .projText {
      max-width: initial;
    }
  }
}
</style>

<style lang="scss">
@import "../styles/screenSizes.scss";

.project {
  .picture {
    width: 65%;

    img {
      border-radius: 20px;
    }
  }
}
</style>
