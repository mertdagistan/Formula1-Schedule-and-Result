


<template>
  <div class="header">
    <h4>{{ this.$store.state.headerTitle}}</h4>
  </div>
</template>





<style scoped>
.header {
  position: fixed;
  top: 0px;
  background: #15151E;
  right: 1px;
  left: 300px;
  z-index: 1100;
  padding: 2px 20px;
  box-shadow: 3px 0 10px 1px rgba(105, 105, 105, 0.396);
  transition: left ease 0.5s;
  height: 50px;
  padding: 7px 20px 7px 20px;
}
.drivers {
  float: left;
  height: 35px;
  width: 35px;
  border-radius: 35px;
  border: 1px solid black;
  display: block;
  margin-right: 5px;
  margin-left: 5px;
}
</style>