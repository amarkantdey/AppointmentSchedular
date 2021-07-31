<template>
  <div class="container">
    <b-alert v-model="showDismissibleAlert" :variant="alertVariant" dismissible>{{alertMessage}}</b-alert>
    <div class="row">
        <div class="col-md-12 mrgnbtm">
        <h2>Book Appointment</h2>
            <form>
                <div class="row justify-content-center mt-4">
                    <div class="form-group col-md-6">
                        <label htmlFor="startDate"><b>Select Date</b></label>
                        <b-form-datepicker v-model="startDate" :min="min" ></b-form-datepicker>
                    </div>
                    
                </div>
                <div class="row justify-content-center mt-4">
                    <div class="form-group col-md-6 ">
                      <label htmlFor="timezone"><b>Select Timezone</b></label>
                      <div>
                        <b-form-select v-model="timezone" :options="options" @change='getAvailableSlots($event)'></b-form-select>
                      </div>                      
                    </div>
                </div>
            </form>
        </div>
    </div>
      <div class="row justify-content-center">
        <div v-if="timings.length > 0" class="form-group col-md-6 mt-4">
          <label htmlFor="startDate"><b>Select Time</b></label>
          <b-form-select  v-model="timing" :options="timings" ></b-form-select>
        </div>        
      </div>
       <div class="row justify-content-center">
        <div v-if="timings.length > 0" class="form-group col-md-6 mt-4">
          <label htmlFor="startDate"><b>Enter Duration</b></label>
          <b-form-input :type="numberType"  v-model="duration" placeholder="Enter duration in minutes"></b-form-input>
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

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)

    return {
      alertVariant:'success',
      alertMessage: '',
      dismissCountDown: 0,
      showDismissibleAlert: false,
      numberType:'number',
      min: minDate,
      startDate: '',
      duration: '',
      events:'',
      timezone: null,
      options: [
        { value: null, text: 'Please select a timezone', disabled: true },
        { value: "America/Los_Angeles", text: 'America/Los_Angeles' },
        { value: 'Asia/Kolkata', text: 'Asia/Kolkata' },
      ],
      timing:null,
      timings:[
      ]
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      addEvent(){
        addEvent(this.timing, this.duration).then(response => {
          this.alertMsg = response
          this.alertMessage = response
          this.alertVariant = 'success'
          this.showDismissibleAlert = true
          this.clearForm();
        })
        .catch(error => {
          this.alertVariant = 'danger'
          this.alertMessage = error.response.data
          this.showDismissibleAlert = true
        })
        
      },
      getAvailableSlots(){
        if(this.startDate && this.timezone){
            getFreeSlots(this.startDate,this.timezone).then(response => {
              this.timings = response.map(res => { 
                return {value: res, text: new Date(res).toLocaleTimeString()}
              })
              this.timings.unshift({ value: null, text: 'Please select a time', disabled: true })
              this.timing = null
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