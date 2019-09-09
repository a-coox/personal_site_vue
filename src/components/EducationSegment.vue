<template>
  <div class="educationSegment" :class="{right: right}">
    <div class="line" />
    <div class="timeDot" />
    <div class="arrow" />
    <p class="date" v-if="date">{{date}}</p>
    <div class="textbox">
      <div class="gpa" v-if="gpa != 0">
        <GradHatLogo />
        <p>
          <span class="name">GPA:</span>
          {{gpa}}
        </p>
      </div>

      <div class="awards" v-if="awards">
        <AwardLogo />
        <p>
          <span class="name">Awards:</span>
          {{awards}}
        </p>
      </div>

      <div class="experience" v-if="$slots.default">
        <BriefcaseLogo />
        <slot />
      </div>

      <!-- <div class="courses" v-if="courses.length">
        <Collapser :collapsed="!showCourses">
          <BookLogo />
          <div class="courseInfo">
            <p class="name">Courses Completed:</p>
            <ul class="subjList">
              <li v-for="(course, i) in courses" :key="i">
                <a
                  target="_blank"
                  :href="'https://www.uq.edu.au/study/course.html?course_code=' + course.link"
                >{{course.title}}</a>
              </li>
            </ul>
          </div>
        </Collapser>
        <Button class="showMore" @click.native="showCourses = !showCourses">{{showMoreText}}</Button>
      </div>-->
    </div>
  </div>
</template>

<script>
// import Collapser from "./Collapser";
// import Button from "./Button";
import GradHatLogo from "../assets/icons/gradHatLogo.svg";
import AwardLogo from "../assets/icons/awardLogo.svg";
import BookLogo from "../assets/icons/bookLogo.svg";
import BriefcaseLogo from "../assets/icons/briefcaseLogo.svg";

export default {
  name: "EducationSegment",

  props: {
    date: {
      type: String,
      default: ""
    },
    gpa: {
      type: Number,
      default: 0
    },
    awards: {
      type: String,
      default: ""
    },
    courses: {
      type: Array,
      default: () => []
    },
    right: {
      type: Boolean,
      default: false
    }
  },

  components: {
    GradHatLogo,
    AwardLogo,
    BriefcaseLogo
  },

  data() {
    return {
      showCourses: false
    };
  },

  computed: {
    showMoreText() {
      return this.showCourses ? "Show Less" : "Show More";
    }
  }
};
</script>

<style lang="scss" scoped>
.educationSegment {
  display: grid;
  align-items: center;
  grid-template-rows: 35px 1fr 4fr 6fr;
  width: 100%;
  position: relative;
  grid-template-columns: 1fr 26fr 2fr 4fr 14fr 15fr;
  grid-template-areas:
    ". . . . . ."
    ". text . . . ."
    ". text arrow dot date ."
    ". text . . . .";

  &.right {
    grid-template-columns: 15fr 14fr 4fr 2fr 26fr 1fr;
    grid-template-areas:
      ". . . . . ."
      ". . . . text ."
      ". date dot arrow text ."
      ". . . . text .";

    .arrow {
      border-right: 15px solid white;
      border-left: none;
      justify-self: end;
    }

    .line {
      grid-column: 3;
    }

    .date {
      text-align: right;
      margin-left: 0;
      margin-right: 10%;
    }
  }

  .textbox {
    width: 100%;
    height: 100%;
    grid-area: text;
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    vertical-align: middle;

    & > div {
      text-align: left;
      padding-bottom: 5px;
    }

    svg {
      $size: 23px;

      height: $size;
      width: $size;
      margin-right: 7px;
      vertical-align: top;
    }

    p {
      display: inline-block;
      font-size: 16px;
      width: 90%;
    }

    .name {
      font-weight: 600;
    }

    .courses {
      text-align: center;

      .courseInfo {
        display: inline-block;
        text-align: left;
        width: 90%;

        .subjList {
          list-style-type: none;

          li {
            border-bottom: 1px solid rgba(37, 31, 31, 0.12);

            &:last-of-type {
              border-bottom: none;
            }

            a {
              padding: 2px 0;
              color: #17252a;
              display: block;
              text-decoration: none;

              &:hover {
                background-color: rgb(240, 240, 240);
                text-decoration: underline;
              }
            }
          }
        }
      }

      .showMore {
        margin-top: 5px;
        margin-bottom: 0;
        padding: 7px;
      }
    }

    .projectLink {
      color: #3c528b;
      text-decoration: none;
      font-weight: 700;
    }
  }

  .date {
    font-size: 18px;
    text-align: left;
    margin-left: 10%;
    grid-area: date;
  }

  .arrow {
    grid-area: arrow;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid white;
  }

  .timeDot {
    grid-area: dot;
    justify-self: center;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: rgb(68, 65, 65);
    z-index: 2;
  }

  .line {
    width: 4px;
    background-color: rgb(68, 65, 65);
    z-index: 0;
    grid-row: 1/5;
    grid-column: 4;
    height: 100%;
    justify-self: center;
  }
}
</style>