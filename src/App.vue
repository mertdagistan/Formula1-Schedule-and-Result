<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import SessionBar from "@/components/SessionBar.vue";
</script>

<script>
import axios from "axios";

export default {
  mounted() {
    lastResult()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const race = data.MRData.RaceTable;

        this.$store.commit("setRaceId", race.Races[0].Circuit.circuitId);
        this.$store.commit("setRaceRound", race.round);
        this.$store.commit("setRaceSeason", race.season);
        this.$store.commit("setHeaderTitle", race.Races[0].raceName);

        this.$router.push({
          name: "race",
          params: {
            year: race.season,
            circuitId: race.Races[0].Circuit.circuitId,
          },
        });

        console.log("race", race);
      });
  },
};

function lastResult() {
  return fetch(`http://ergast.com/api/f1/current/last/results.json`);
}
</script>

<template>
  <div class="container-fluid" v-if="this.$store.state.selectedRace.id">
    <Sidebar />
    <main>
      <Header />
      <div class="content">
        <SessionBar />
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
@import "@/assets/base.css";
@import "/node_modules/bootstrap/dist/css/bootstrap.min.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  border-top: 4px solid #dc0000;
  background-color: #15151e;
  color: #fff;
  font-family: "Rubik", sans-serif;
  /* center the table horizontally */
  display: flex;
  flex-direction: column;
  align-items: center;
}
a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: black;
}

main {
  padding-right: 15px;
  padding-left: 15px;
  background-color: #15151e;
  position: fixed;
  display: block;
  overflow: hidden;
  overflow-y: auto;
  left: 300px;
  right: 0;
  bottom: 0;
  top: 20px;
}

.content {
  position: relative;
  top: 50px;
  min-height: 300px;
  transition: top ease-out 0.5s;
  padding: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* main {
  padding: 10px;
  box-shadow: 0px 0px 10px #0000001a;
  border-radius: 10px;
} */
</style>

<!-- 
import HelloWorld from '@/components/HelloWorld.vue'

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
-->
