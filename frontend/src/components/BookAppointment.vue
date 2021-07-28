<template>
  <div class="container">
    
    <div class="row">
        <div class="col-md-12 mrgnbtm">
        <h2>Book Appointment</h2>
            <form>
                <div class="row justify-content-center mt-4">
                    <div class="form-group col-md-6">
                        <label htmlFor="startDate"><b>Select Date</b></label>
                        <b-form-datepicker v-model="startDate" size="sm" class="mt-1"></b-form-datepicker>
                    </div>
                    
                </div>
                <div class="row justify-content-center">
                    <div class="form-group col-md-6 mt-4">
                      <label htmlFor="timezone"><b>Select Timezone</b></label>
                      <div>
                        <b-form-select v-model="timezone" :options="options" @change='getAvailableSlots($event)' class="custom-select custom-select-sm mt-1"></b-form-select>
                      </div>                      
                    </div>
                </div>
            </form>
        </div>
    </div>
      <div class="row justify-content-center">
        <div v-if="timings.length > 0" class="form-group col-md-6 mt-4">
          <label htmlFor="startDate"><b>Select Time</b></label>
          <b-form-select  v-model="timing" :options="timings" class="custom-select custom-select-sm"></b-form-select>
        </div>        
      </div>
       <div class="row justify-content-center">
        <div v-if="timings.length > 0" class="form-group col-md-6 mt-4">
          <label htmlFor="startDate"><b>Enter Duration</b></label>
          <input type="text"  v-model="duration" text="Enter duration in minutes" class="custom-select custom-select-sm"/>
        </div>        
      </div>
      <div class="row justify-content-center">
        <div v-if="timings.length > 0" class="form-group col-md-6 mt-4">
          <button type="button" @click='addEvent()' class="btn btn-primary" style="margin: 10px">Book Appointment</button>
        </div>        
      </div>
    </div>
</template>

<script>
import { getFreeSlots, addEvent } from '../services/AppointmentService'

export default {
  name: 'CreateAppointment',
  data() {
    return {
      startDate: '',
      duration: '',
      events:'',
      timezone: null,
      options: [
        { value: null, text: 'Please select a timezone', disabled: true },
        { value: "America/Los_Angeles", text: 'America/Los_Angeles' },
        { value: 'Asia/Kolkata', text: 'Asia/Kolkata' },
      ],
      timing:'',
      timings:[  
      ]
    }
  },
  methods: {
      addEvent(){
        addEvent(this.timing, this.duration).then(response => {
          console.log(response)
          this.alertMsg = response
          this.makeToast('success')
          this.clearForm();
        })
        
      },
      makeToast(variant = null) {
        this.$root.$bvToast.toast('Toast body content', {
          title: `${variant || 'default'}`,
          toaster: 'b-toaster-top-center',
          variant: variant,
          solid: true,
          autoHideDelay: 5000,
          noAutoHide: true 
        })
      },
      getAvailableSlots(){
        if(this.startDate && this.timezone){
            getFreeSlots(this.startDate,this.timezone).then(response => {
              this.timings = response.map(res => { 
                return {value: res, text: new Date(res).toLocaleTimeString()}
              })
          })
        }
          
      },
      clearForm() {
          this.startDate = '',
          this.duration = '',
          this.events = '',
          this.timezone = null,
          this.options = [
            { value: null, text: 'Please select a timezone', disabled: true },
            { value: "America/Los_Angeles", text: 'America/Los_Angeles' },
            { value: 'Asia/Kolkata', text: 'Asia/Kolkata' },
          ],
          this.timing ='',
          this.timings =[  
          ]
      }
  },
  mounted () {
    this.clearForm();
  }
}
</script>