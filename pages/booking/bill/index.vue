<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height : 100vh;"
      >
        <div style="width:400px">
          <h2 class="text-center text-white mt-3 font-weight-bold">Detail Ticket Bill</h2>
          <table class="table mt-3 table--sm">
            <tbody>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">Film Name</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                       style="background-color: lightgrey"
                       onkeydown="return false"
                />
<!--                v-model="state.movie.name"-->
              </td>
            </tr>
            <tr>
              <td class="w-1/3 border text-white-50 border-gray-600">Seats Number</td>
              <td class="border bg-gray border-gray-600">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.seat.number"-->

              </td>
            </tr>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">Schedule</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.schedule.time_start"-->
              </td>
            </tr>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">Theater</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.theater.address"-->
              </td>
            </tr>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">User Booking</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.user.name"-->
              </td>
            </tr>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">Phone</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.user.phone"-->
              </td>
            </tr>
            <tr>
              <td class="border text-white-50 border-gray-600 bg-gray-300">Combo</td>
              <td class="border border-gray-600 ">
                <input class="input form-control w-full border"
                   style="background-color: lightgrey"
                   onkeydown="return false"
                />
<!--                v-model="state.coupon.name"-->
              </td>
            </tr>
            </tbody>
          </table>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              class="btn w-24 border text-white-50 dark:border-dark-5 dark:text-gray-300 mr-1"
              @click="showModal = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn w-24 border text-white-50 dark:border-dark-5 dark:text-gray-300 mr-1"
              @click="submitModal()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import {mapState} from "vuex";
import axios from "axios";

export default {
  components: {},
  computed: {
    ...mapState({
      bill: (state) => state.bill.bill,
    }),
  },
  data() {
    return {};
  },
  async created() {
  },
  watch: {},
  methods: {
    submitModal() {
      const form = {...state.bill}

      axios.post(`user/bill/store`, form)
        .then((res) => {

          if (res.status === 200) {
            const data = res.data.data.bill
            console.log(data)
            alert("Success!")
            // this.$router.push(this.localePath(`/booking?${movie.name}`));
          }
        })
        .catch(() => {
        })
    },
    fetchData() {
      // Movie
      axios.get(`user/movie/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.movie
            state.bill.movie = {...data}
          }
        })
        .catch(() => {
        })

      // Schedule
      axios.get(`user/schedule/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.schedule
            state.bill.schedule = {...data}
          }
        })
        .catch(() => {
        })

      // User
      axios.get(`user/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.user
            state.bill.user = {...data}
          }
        })
        .catch(() => {
        })

      // Coupon
      axios.get(`user/coupon/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.coupon
            state.bill.coupon = {...data}
          }
        })
        .catch(() => {
        })
    }
  }
};
</script>
<style scoped></style>
