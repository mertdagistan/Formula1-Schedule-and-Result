<script setup>
import { mapGetters } from "vuex";
</script>


<template>
  <table v-if="gridList.length > 0">
    <thead>
      <tr>
        <th>Pos</th>
        <th>Driver</th>
        <th>Team</th>
        <th>Lap</th>
        <th>Gap</th>
        <th>Fastest Lap</th>
        <th>Point</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in gridList" v-bind:key="item.Position" class="driver">
        <td>{{ item.Position }}</td>
        <td :style="{ 'border-left': '4px solid' + teamColor(item.TeamID) }">
          {{ item.Name }}
        </td>
        <td>{{ item.Team }}</td>
        <td>{{ item.Laps }}</td>
        <td class="gap">
          <span>{{ item.Gap }}</span>
        </td>
        <td class="gap">
          <span>{{ item.FastestLap }}</span>
        </td>
        <td>{{ (item.Points > 0 ? "+" : "") + item.Points }}</td>
      </tr>
    </tbody>
  </table>
  <div v-if="gridList.length===0">
        <h1>No Data</h1>
  </div>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      gridList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    teamColor(name) {
      return colors[name];
    },
    getData() {
      let year = this.$store.state.selectedRace.season;
      let round = this.$store.state.selectedRace.round;

      fetch(
        `https://ergast.com/api/f1/${year}/${round}/results.json`
      )
        .then((response) => response.json())
        .then((data) => {
           this.gridList = [];
          if (data.MRData.RaceTable.Races.length > 0) {
            data.MRData.RaceTable.Races[0].Results.forEach((e) => {
              this.gridList.push({
                Position: e.position,
                Name: e.Driver.givenName + " " + e.Driver.familyName,
                Team: e.Constructor.name,
                Laps: e.laps,
                Gap: e.Time ? e.Time.time : e.status,
                FastestLap: e.FastestLap ? e.FastestLap.Time.time : "",
                Points: e.points,
                TeamID: e.Constructor.constructorId,
              });
            });
          }
        });
    
    },
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        this.getData();
      },
      immediate: true,
    },
  },
};

const colors = {
  mercedes: "#00D2BE",
  ferrari: "#DC0000",
  red_bull: "#1E41FF",
  alfa: "#FFF500",
  alphatauri: "#F596C8",
  haas: "#9B0000",
  aston_martin: "#469BFF",
  alpine: "#BD9E57",
  mclaren: "#FF8700",
  williams: "#FFFFFF",
};
</script>


<style scoped>
table {
  /* position relative to include a band on the left of the container */
  margin: 0rem 1rem;
  position: relative;
  /* cap the width of the table, allowing for a sizeable portion of white space if allowed by the viewport */
  width: 100%;
  /* spacing to separate the table rows vertically */
  border-spacing: 0 1rem !important;
  border-collapse: separate;
}
/* with a pseudo element add a band with a repeating linear gradient */
table:before {
  position: absolute;
  content: "";
  right: calc(100% + 1rem);
  top: 0;
  height: 100%;
  width: 1.5rem;
  border-radius: 5px;
  border: 1px solid #38383f;
  background: repeating-linear-gradient(
    -45deg,
    #15151e 0px,
    #15151e 4px,
    #38383f 4px,
    #38383f 8px
  );
}
/* center every element nested in a table row */
table tr > * {
  text-align: center;
  padding: 0.5rem;
}
/* align every second item of each row to the left */
table tr > *:nth-child(2) {
  text-align: left;
}

/* style the headings to have thin uppercase titles for the columns */
table th {
  font-weight: 300;
  letter-spacing: 0.04rem;
  font-size: 0.9rem;
  color: #eee;
  text-transform: uppercase;
}

/* slightly increase the weight of the cell describing the position */
table td.position {
  font-weight: 500;
}

/* style the cell with the driver visually separating the first, last name and team */
table td.driver {
  padding-left: 1rem;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
}
table td.driver strong {
  text-transform: uppercase;
  font-weight: 500;
}
table td.driver span {
  text-transform: capitalize;
  margin-left: 0.75rem;
  font-size: 0.8rem;
  color: #999;
  letter-spacing: initial;
}

/* style the span nested in the last cell to have the gap in a rounded rectangle */
table td.gap span {
  background: #38383f;
  border-radius: 30px;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  text-transform: uppercase;
}

/* on smaller viewports remove the third column from sight */
@media (max-width: 500px) {
  table tr > *:nth-child(3) {
    display: none;
  }
}
</style>