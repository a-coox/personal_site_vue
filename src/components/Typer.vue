<template>
  <div class="typer">
    <p :class="{ cursor: cursorShow }">{{ typedText }}</p>
  </div>
</template>

<script>
import Random from "../services/Random";

export default {
  name: "Typer",

  props: {
    text: {
      type: String,
      default: ""
    },
    cursorSpeed: {
      type: Number,
      default: 500
    },
    typeDelay: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      cursorShow: true,
      cursorAnim: null,
      charsTyped: 0,
      cursorStopDelay: 1400,
      typeStartDelay: 500
    };
  },

  computed: {
    typedText() {
      return this.text.slice(0, this.charsTyped);
    }
  },

  mounted() {
    this.startCursorAnim();
    setTimeout(this.typeChar, this.typeStartDelay);
  },

  methods: {
    startCursorAnim() {
      this.cursorAnim = setInterval(() => {
        this.cursorShow = !this.cursorShow;
      }, this.cursorSpeed);
    },

    stopCursorAnim() {
      clearInterval(this.cursorAnim);
      this.cursorAnim = null;
      this.cursorShow = false;
    },

    typeChar() {
      if (this.charsTyped == this.text.length) {
        setTimeout(this.stopCursorAnim, this.cursorStopDelay);
        return; // Finished typing
      }
      this.charsTyped++;
      let randDelay = this.typeDelay * Random.getRandomBetween(0.85, 1.15);
      if (this.text[this.charsTyped - 1] === ",") {
        randDelay *= 3;
      }
      setTimeout(this.typeChar, randDelay);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/screenSizes.scss";

.typer {
  p {
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
    box-sizing: content-box;
    font-family: "Oleo Script", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: calc(3.2em + 2.1vw);
    width: 80%;
    margin: 0 auto;
    min-height: 100px;
  }

  .cursor {
    &::after {
      content: "";
      display: inline-block;
      width: 7px;
      height: 110px;
      background-color: white;
      position: absolute;
      margin-left: 3px;
    }
  }
}

@include for-tablet-portrait {
  .typer {
    p {
      min-height: 80px;
    }

    .cursor::after {
      height: 70px;
    }
  }
}

@include for-phone {
  .typer {
    p {
      font-size: 50px;
      min-height: 70px;
    }

    .cursor::after {
      height: 50px;
    }
  }
}

@include for-phone-small {
  .typer p {
    font-size: 40px;
  }
}
</style>
