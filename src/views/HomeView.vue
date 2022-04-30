<template>
  <h1 v-if="year > 0">Lütfen Session Seçiniz</h1>
</template>




<script>
export default {
  data() {
    return {
        year: this.$route.params.year,
        circuit: this.$route.params.circuitId
    }
  },
};
</script>