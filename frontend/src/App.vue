<template>
  <div id="app">
    <Appointment />
  </div>
</template>

<script>
import Appointment from './components/Appointment.vue'

export default {
  name: 'App',
  components: {
    Appointment
  }
}
</script>

<style>
 @import './assets/styles/global.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
