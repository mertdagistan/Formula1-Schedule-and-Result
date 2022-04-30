import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      headerTitle: "",
      selectedRace: {
        id: "",
        round: "",
        season:""
      },
    };
  },
  mutations: {
    setHeaderTitle(state, title) {
      state.headerTitle = title;
    },
    setRaceId(state, id) {
      state.selectedRace.id = id;
    },
    setRaceRound(state, round) {
      state.selectedRace.round = round;
    },
    setRaceSeason(state, season) {
      state.selectedRace.season = season;
    },
  },
  getters: {
    getHeaderTitle(state) {
      return state.headerTitle;
    },
  },
});

store.commit("setHeaderTitle");
store.commit("setRaceId");
store.commit("setRaceSeason");
store.commit("setRaceRound");

export default store;
