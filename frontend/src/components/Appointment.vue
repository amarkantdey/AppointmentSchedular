<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12 mrgnbtm">
        <h2>Show Appointments</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="startDate">Start Date</label>
                        <b-form-datepicker v-model="startDate"></b-form-datepicker>
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="endDate" >End Date</label>
                        <b-form-datepicker v-model="endDate"></b-form-datepicker>
                    </div>
                </div>
                <div class="row">
                    <button type="button" @click='getEvents($event)' class="btn btn-primary" style="margin: 10px">Show Events</button>
                </div>                
            </form>
        </div>
    </div>
    <div class="row">
        <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in items" v-bind:key="user.id"> 
          <td>{{user.date}}</td>
          <td>{{user.from}}</td>
          <td>{{user.to}}</td>
        </tr>
      </tbody>
    </table> 
    </div>
    </div>
</template>

<script>
import { getAllEvents } from '../services/AppointmentService'

export default {
  name: 'CreateAppointment',
  data() {
    return {
      startDate:'',
      endDate:'',
      events:'',
      fields: ['Date', 'From', 'To'],
      items: []          
    }
  },
  methods: {
      getEvents(){
          getAllEvents(this.startDate, this.endDate).then(response => {
             this.items = response
          })
      },
      clearForm() {
          this.appointmentDate = "";
      }
  },
  mounted () {
    this.getEvents();
  }
}
</script>