<script setup>
import { mapActions } from "vuex";
</script>

<template>
  <div>
    <ul class="circiut-list">
      <li
        v-for="item in circiutList"
        v-bind:key="item.Circuit.circuitId"
        :class="{
          active: this.$route.params.circuitId === item.Circuit.circuitId,
        }"
        v-on:click="updateTitle(item)"
      >
        {{ item.raceName }}
      </li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      circiutList: [],
      year: "",
    };
  },
  mounted() {
    this.getDataList(false);
  },
  methods: {
    updateTitle(data) {
      this.$store.commit("setHeaderTitle", data.raceName);
      this.$store.commit("setRaceId", data.Circuit.circuitId);
      this.$store.commit("setRaceSeason", data.season);
      this.$store.commit("setRaceRound", data.round);
      this.$router.push({
        name: "race",
        params: {
          year: data.season,
          circuitId: data.Circuit.circuitId,
        },
      });
    },
    getDataList(changeYear) {
      let year = this.$route.params.year;
      this.year = year;

      axios.get(`http://ergast.com/api/f1/${year}.json`).then((response) => {
        this.circiutList=[];
        this.circiutList = response.data.MRData.RaceTable.Races;

        if (changeYear === true) {
          const data = response.data.MRData.RaceTable.Races[0];
          console.log("data", data);
          this.$store.commit("setHeaderTitle", data.raceName);
          this.$store.commit("setRaceId", data.Circuit.circuitId);
          this.$store.commit("setRaceSeason", data.season);
          this.$store.commit("setRaceRound", data.round);
          this.$router.push({
            name: "race",
            params: {
              year: data.season,
              circuitId: data.Circuit.circuitId,
            },
          });
        }
      });
    },
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        if (newValue.year !== this.year && this.year.length === 4) {
          console.log("newValue", newValue);
          console.log("this.year", this.year);
          this.getDataList(true);
        }
      },
      immediate: true,
    },
  },
};
</script>


<style scoped>
.circiut-list {
  list-style: none;
  padding: 0;
  padding: 0px;
}

.circiut-list li {
  cursor: pointer;
  padding: 8px 10px;
  font-size: 14px;
}

.circiut-list li:hover {
  background-color: #eee;
  color: black;
}

.circiut-list li.active {
  background-color: #eee;
  color: black;
}

.circiut-list li a {
  color: white;
}
.circiut-list li:hover a {
  color: black;
  background-color: #eee;
}

.circiut-list li.active a {
  background-color: #eee;
  color: black;
}
</style>