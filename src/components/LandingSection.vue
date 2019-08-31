<template>
  <Section id="home" class="container" :showHeader="false">
    <canvas id="canvas"></canvas>
    <div class="content">
      <div class="title">
        <h1 id="name" class="simpleTyper" data-typer-text="Hi, I'm Aaron Coox"></h1>
        <h2 id="description">Computer & Electrical/Information Technology student. Welcome to my resume.</h2>
      </div>
      <a id="enterBtn" href="#about">Explore Site</a>
    </div>
    <div id="overlay"></div>
  </Section>
</template>

<script>
import Section from './Section';

export default {
  name: 'LandingSection',
  components: {
    Section
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0;
    background-image: url('../assets/img/background/background-full.jpg');
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1;

    .title,
    #enterBtn {
      position: absolute;
      display: block;
      text-align: center;
      margin: 0 auto;
      left: 0;
      right: 0;
      z-index: 4;
      color: white;
    }

    .title {
      top: 25%;
    }

    #enterBtn {
      text-transform: uppercase;
      font-family: 'Nunito Sans', Georgia, sans-serif;
      transition: 0.35s ease-in-out;
      line-height: 50px;
      text-decoration: none;
      border: 2px solid white;
      outline: 2px solid white;
      outline-offset: -8px;
      width: 160px;
      top: 60%;
      overflow: hidden;
      padding: 8px 2px;

      &::before {
        transition: 0.35s ease-in-out;
        content: '';
        position: absolute;
        top: 0;
        right: -50px;
        bottom: 0;
        left: 0;
        border-right: 50px solid transparent;
        border-bottom: 70px solid rgba(255, 255, 255, 1);
        transform: translateX(-100%);
        z-index: -1;
      }

      &:hover {
        font-weight: bold;
        color: rgb(20, 20, 20);
        border-color: rgb(20, 20, 20);
        outline-color: rgb(20, 20, 20);

        &::before {
          transform: translateX(0);
        }
      }
    }

    #description {
      font-family: 'Nunito Sans', Georgia, sans-serif;
      font-weight: 200;
      font-size: calc(15px + 0.7vw);
      display: inline-block;
      text-align: center;
      margin-top: 2%;
      width: 40%;
      min-width: 10em;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
    }

    #name {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
      box-sizing: content-box;
      font-family: 'Oleo Script', cursive;
      font-weight: 300;
      font-style: normal;
      font-size: calc(3.2em + 2.1vw);
      width: 80%;
      margin: 0 auto;
      min-height: 100px;
    }

    #overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(7, 18, 32, 0.7),
        rgba(15, 10, 34, 0.7)
      );
      z-index: 2;
    }
  }
</style>