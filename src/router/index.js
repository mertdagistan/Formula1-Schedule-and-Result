import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RaceView from '../views/RaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:year/',
      name: 'year',
      component: HomeView,
      props: true 
    },
    {
      path: '/:year/circuit-:circuitId',
      name: 'circuit',
      component: HomeView,
      props: true 
    },
    {
      path: '/:year/circuit-:circuitId/race',
      name: 'race',
      component: RaceView,
      props: true 
    }
  ]
})

export default router
