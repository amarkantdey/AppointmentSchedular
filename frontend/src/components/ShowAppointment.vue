<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12 mrgnbtm">
        <h2>Show Appointments</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6  mt-4">
                        <label htmlFor="startDate"><b>Start Date</b></label>
                        <b-form-datepicker v-model="startDate"></b-form-datepicker>
                    </div>
                    <div class="form-group col-md-6  mt-4">
                        <label htmlFor="endDate" ><b>End Date</b></label>
                        <b-form-datepicker v-model="endDate"></b-form-datepicker>
                    </div>
                </div>
                <div class="row  justify-content-center">
                    <button type="button" @click='getEvents($event)' class="btn btn-primary" style="margin: 10px; width: 200px">Show Events</button>                    
                </div>                
            </form>
        </div>
    </div>
    <div v-if="showGrid && items.length > 0" class="row">
        <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items && items.length == 0">No Records found</tr>
        <tr v-for="user in items" v-bind:key="user.id"> 
          <td>{{user.date}}</td>
          <td>{{user.from}}</td>
          <td>{{user.to}}</td>
        </tr>
      </tbody>
    </table> 
    </div>
    <div v-if="showGrid && items.length == 0" class="row justify-content-center"><b>No Records found</b></div>
    </div>
</template>

<script>
import { getAllEvents } from '../services/AppointmentService'

export default {
  name: 'CreateAppointment',
  data() {
    return {
      startDate:'',
      showGrid: false,
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
             this.showGrid = true;
          })
      },
      clearForm() {
          this.appointmentDate = "";
          this.showGrid = false;
      }
  }
}
</script>