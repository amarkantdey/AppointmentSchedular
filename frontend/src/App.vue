<template>
  <div id="app">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Book Appointment" active><BookAppointment/></b-tab>
        <b-tab title="Show Appointments"><ShowAppointment /></b-tab>        
      </b-tabs>
    </div>
    
  </div>
</template>

<script>
import ShowAppointment from './components/ShowAppointment.vue'
import BookAppointment from './components/BookAppointment.vue'

export default {
  name: 'App',
  components: {
    ShowAppointment,
    BookAppointment
  },
  created(){
        document.title = "Appointment Scheduler"
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
