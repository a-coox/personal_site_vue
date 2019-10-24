<template>
  <Section id="education" :header="'Work & Education'" :coloured="true">
    <div class="timeline">
      <EducationSegment :date="'September, 2019'">
        I completed a
        <b>Robotics</b> intership in India with
        <a class="projectLink" target="_blank" href="https://infosys.com/"
          >Infosys</a
        >, a global IT company. I researched and implemented a co-operative
        pathfinding algorithm for unknown environments.
      </EducationSegment>
      <EducationSegment v-bind="history[0]" :right="true" />
      <EducationSegment :date="'December, 2018'">
        <p>
          I undertook a
          <b>Cyber Security</b> internship at Cympire in Israel. I wrote a fully
          automated Windows Kerberos Vulnerability exploit in C. I also created
          an automated Azure infrastructure to execute this vulnerability on.
        </p>
      </EducationSegment>
      <EducationSegment :date="'February, 2018'" :right="true">
        <p>
          Started working as an
          <b>official UQ Tutor</b> for
          <a
            class="projectLink"
            target="_blank"
            href="https://www.uq.edu.au/study/course.html?course_code=CSSE2010"
            >Computer Systems</a
          >. I teach C programming & microcontrollers to classes of up to 90
          students. I also started as a <b>Web Developer Intern</b> at
          <a class="projectLink" target="_blank" href="https://www.gbst.com/"
            >GBST</a
          >, where I use Vue.js and D3.js to create advanced financial web-apps.
        </p>
      </EducationSegment>

      <Collapser :collapsed="!showFullTimeline">
        <EducationSegment v-bind="history[1]" />
        <EducationSegment :date="'November, 2016'" :right="true">
          <p>
            I began work as a
            <b>University Tutor</b> at St John's College, teaching
            <a
              class="projectLink"
              target="_blank"
              href="https://www.uq.edu.au/study/course.html?course_code=MATH1052"
              >Calculus & ODEs</a
            >. Applied skills include advanced understanding of university
            content, strong communication, and ability to teach.
          </p>
        </EducationSegment>
        <EducationSegment :date="'June, 2016'">
          <p>
            I started as an
            <b>Intern</b> at
            <a
              class="projectLink"
              target="_blank"
              href="http://agilityapplications.com/"
              >Agility Applications</a
            >, an investment software company. Applied skills include SQL Server
            queries, Atlassian products, and software automation.
          </p>
        </EducationSegment>
      </Collapser>
      <Button
        class="showMore"
        @click.native="showFullTimeline = !showFullTimeline"
        >{{ showMoreText }}</Button
      >
    </div>
  </Section>
</template>

<script>
import Section from "./Section";
import Button from "./Button";
import Collapser from "./Collapser";
import EducationHistory from "../data/educationHistory.json";
import EducationSegment from "./EducationSegment";

export default {
  name: "EducationSection",

  components: {
    Section,
    EducationSegment,
    Collapser,
    Button
  },

  data() {
    return {
      history: EducationHistory,
      showFullTimeline: false
    };
  },

  computed: {
    showMoreText() {
      return this.showFullTimeline ? "Show Less" : "Show More";
    }
  }
};
</script>

<style lang="scss" scoped>
#education {
  .timeline {
    width: 98%;
    max-width: 1000px;

    .showMore {
      background-color: white;
      font-size: 18px;
      margin-top: 20px;

      &:hover {
        background-color: rgb(60, 82, 139);
      }
    }
  }
}
</style>
