


<!--
Circuits:  Circuit List

 -->
<script setup>
import Circuits from "../components/Circuits.vue";
</script>

<template>
  <div class="sidebar">
    <div class="years">
      <div class="row">
        <label for="years" class="col-2">Year</label>
        <div class="col-10">
          <select
            name="years"
            id="years"
            class="form-select year-list"
            v-model="year"
            @change="changeYear($event)"
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>
    </div>
    <Circuits />
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "2022",
    };
  },
  methods: {
    changeYear(event) {

      

      this.$router.push({
        name: "circuit",
        params: {
          year: event.target.value,
        },
      });
    },
  },
};
</script>




<style scoped>
.sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #15151e;
  width: 300px;
  box-shadow: rgba(105, 105, 105, 0.229) 0 3px 10px 0;
  -moz-transition: left ease 0.5s;
  -o-transition: left ease 0.5s;
  -webkit-transition: left ease 0.5s;
  transition: left ease 0.5s;
  color: white;
}

.years {
  height: 50px;
  border-bottom: 1px solid white;
}

.year-list {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  outline: none;
}

.year-list option {
  color: black;
}

.year-list:focus {
  border-color: transparent !important;
  box-shadow: none !important;
}
</style>