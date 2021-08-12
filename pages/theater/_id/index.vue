<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
      >
        <div class="page">
          <div class="page-header">{{ theater.name }}</div>
          <div class="page-content-style">
            <div class="el-carousel-style">
              <el-carousel
                class="el-carousel-style-content"
                indicator-position="outside"
                :interval="7000"
                height="300px"
              >
                <el-carousel-item
                  v-for="(itemCarousel, indexCarousel) in dataSlide"
                  :key="`${indexCarousel} Carousel`"
                  style="width: 100%; max-width: 1440px"
                  class="el-carousel-style-item"
                  v-bind:style="{ height: '300px' }"
                >
                  <div
                    class="slide-carousel__item"
                    style="height: 100%"
                    :style="`background-image: url(${itemCarousel.url}); background-size: cover;`"
                  ></div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="contact">
              <div class="location">
                {{ theater.address }}
              </div>
              <div class="hotline">
                <div class="hotline-label h5 font-weight-bold">
                  Fax:
                  <a
                    class="h6 hotline-content"
                    style="font-weight: 400"
                    href="tel:0922993996"
                    >{{ theater.phone }}</a
                  >
                </div>
              </div>
            </div>
            <!-- *** Phòng *** -->
            <div class="page-header">{{ $t("Room") }}</div>
            <div class="schedule mb-4 mt-2">
              <b-row class="w-100 mx-0">
                <b-col
                  v-for="(itemRoom, indexRoom) in theater.room"
                  :key="`Room ${indexRoom}`"
                  lg="3"
                  md="4"
                  cols="6"
                  class="schedule-box"
                >
                  <el-button
                    v-on:click="onSelectedRoom(itemRoom)"
                    class="w-100 mt-4 p-3 button-time"
                    v-bind:class="{
                      roomActive: itemRoom.name === selectedRoom.name,
                    }"
                  >
                    {{ itemRoom.name }}
                  </el-button>
                </b-col>
              </b-row>
            </div>

            <!-- *** Lịch chiếu theo phòng *** -->
            <div v-if="!emptyRoom">
              <div class="page-header">{{ $t("ShowTimes") }}</div>
              <div
                class="schedule mb-4 mt-2"
                v-for="(item, index) in scheduleData"
                :key="index"
              >
                <b-row class="mx-0">
                  <b-col
                    cols="12"
                    class="text-left pt-4 h4 font-weight-bold text-white"
                    style="font-family: BalooTammudu2"
                  >
                    {{ item }}
                  </b-col>
                  <b-row
                    class="w-100 mx-0"
                    v-for="(itemMovie, indexMovie) in groupDataByMovie(item)"
                    :key="indexMovie"
                  >
                    <b-col
                      cols="12"
                      style="font-family: BalooTammudu2"
                      class="h4 font-weight-bold text-white pt-4 pb-2"
                    >
                      {{ mapMoviesLabel(itemMovie[0].movie_id) }}
                    </b-col>
                    <b-col
                      v-for="(itemTime, indexTime) in itemMovie"
                      :key="indexTime"
                      lg="3"
                      md="4"
                      cols="6"
                      class="schedule-box"
                    >
                      <el-button
                        v-on:click="onBooking(itemMovie[0].movie_id, itemTime)"
                        class="w-100 mt-4 p-3 button-time"
                        >{{ formatTime(itemTime.time_start, "HH:mm a") }} -
                        {{
                          formatTime(itemTime.time_end, "HH:mm a")
                        }}</el-button
                      >
                    </b-col>
                  </b-row>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import * as _ from "lodash";

export default {
  components: {},
  computed: {
    ...mapState({
      booking: (state) => state.booking.booking,
      account: (state) => state.account.account,
      moviesData: (state) => state.movie.moviesData,
    }),
    emptyRoom() {
      return _.isEmpty(this.selectedRoom);
    },
  },
  watch: {
    booking: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("newValue", newValue);
        console.log("oldValue", oldValue);
        this.theater = newValue?.theater || {};
      },
    },
  },
  data() {
    return {
      dataSlide: [
        {
          url: "http://d279m997dpfwgl.cloudfront.net/wp/2020/12/GettyImages-1150049038-1000x630.jpg",
        },
        {
          url: "https://cdn.sukhacnhau.com/wp-content/uploads/2019/09/cinema.jpg",
        },
        {
          url: "https://thienvu.com.vn/image/catalog/tin-tuc/toi-uu-thiet-ke-home-theater.jpg",
        },
        {
          url: "https://fastly.4sqi.net/img/general/699x268/11247_zSavy-Zij3yfP8EZXdV5zlh2oOkET2lUPjPemKBDMqI.jpg",
        },
      ],
      theater: {},
      schedule: [
        {
          date: "2021-07-23T21:08:02+07:00",
          movie: [
            {
              name: "King Kong",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
            {
              name: "Spider Man Far From Home",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
          ],
        },
        {
          date: "2021-07-24T21:08:02+07:00",
          movie: [
            {
              name: "King Kong",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
          ],
        },
        {
          date: "2021-07-25T21:08:02+07:00",
          movie: [
            {
              name: "King Kong",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
            {
              name: "Spider Man Far From Home",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
            {
              name: "Avengar End Game",
              time: [
                {
                  timeStart: "2021-07-23T18:30:02+07:00",
                  timeEnd: "2021-07-23T18:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T14:30:02+07:00",
                  timeEnd: "2021-07-23T16:30:02+07:00",
                  duration: 2,
                },
                {
                  timeStart: "2021-07-23T20:30:02+07:00",
                  timeEnd: "2021-07-23T22:00:02+07:00",
                  duration: 2,
                },
              ],
            },
          ],
        },
      ],
      selectedRoom: {},
      scheduleData: [],
      scheduleDataGroupByDate: [],
      seatGroupbySchedule: [],
      seatAllData: [],
    };
  },
  async created() {
    setTimeout(async () => {
      try {
        /// *** theater details *** ///
        const response = await this.$axios.$get(
          `user/theater/show/${this.booking.theater.id}`
        );
        console.log("response:", response);
        if (response.status) {
          this.theater = response.data.theater;
          await this.$store.commit("booking/SET_BOOKING", {
            ...this.booking,
            theater: {
              ...response.data.theater,
            },
          });
        } else {
          this.$message.error(response.message);
        }
      } catch (error) {
        if (error.response) {
          console.log("Error:", error.response.data);
          this.onAlertMessageBox(
            "error",
            error.response.data.message || "Response message null"
          );
        }
      }
    }, 500);
  },
  mounted() {},
  methods: {
    getData() {},
    async onBooking(movieId, schedule) {
      console.log(this.booking, movieId, schedule);
      try {
        const responseSeat = await this.$axios.$get(`user/seat/all?size=1000`, {
          headers: {
            Authorization: "Bearer " + this.account.token,
          },
        });
        if (responseSeat.data) {
          this.seatAllData = responseSeat.data.seat.data;
        } else {
          this.$message.error(responseSeat.message);
        }

        const seatGroupbySchedule =
          _.filter(
            [...this.seatAllData] || [],
            (o) =>
              o.schedule.id === schedule.id &&
              o.schedule.room_id === schedule.room_id
          ) || [];

        const newSeatGroupbySchedule = _.map(
          [...seatGroupbySchedule] || [],
          (o) => {
            return {
              id: o.id,
              status: o.status,
              price: o.price,
              value: o.seat_room.value,
              schedule_id: o.schedule.id,
              room_id: o.schedule.room_id,
            };
          }
        );

        console.log("seatGroupbySchedule", newSeatGroupbySchedule);

        this.seatGroupbySchedule = newSeatGroupbySchedule;

        await this.$store.commit("booking/SET_BOOKING", {
          ...this.booking,
          movie: {
            ...this.getMoviesData(movieId),
          },
          schedule: {
            ...schedule,
          },
          seatBooked: this.seatGroupbySchedule,
        });

        this.$router.push(
          this.localePath(`/booking?${this.getMoviesData(movieId)?.name}`)
        );
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log("Error:", error.response.data);
          this.onAlertMessageBox(
            "error",
            error.response.data.message || "Response message null"
          );
        }
      }
    },
    formatTime(value, type) {
      return moment(value).format(type);
    },
    async onSelectedRoom(value) {
      console.log(value);
      this.selectedRoom = value;

      try {
        /// *** room details *** ///
        const response = await this.$axios.$get(`/user/room/show/${value.id}`, {
          headers: {
            Authorization: "Bearer " + this.account.token,
          },
        });
        if (response.status) {
          let dateNow = moment().subtract(1, "d").format("YYYY/MM/DD");
          /// *** Create 5 days from now to see schedule *** ///
          this.scheduleData = _.map([1, 2, 3, 4, 5], (o) => {
            dateNow = moment(dateNow, "YYYY/MM/DD")
              .add(1, "days")
              .format("YYYY/MM/DD");
            return dateNow;
          });

          /// *** Data schedule group by date start ***///
          this.scheduleDataGroupByDate = this.groupByParams(
            response.data.room.schedule,
            "date_start"
          );

          // this.seatGroupbySchedule = newSeatGroupbySchedule;
          // _.filter(
          //   [...response.data.room.seat] || [],
          //   (o) => o.schedule_id === value.id
          // ) || [];
        } else {
          this.$message.error(response.message);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log("Error:", error.response.data);
          this.onAlertMessageBox(
            "error",
            error.response.data.message || "Response message null"
          );
        }
      }
    },
    groupDataByMovie(date) {
      if (this.scheduleDataGroupByDate) {
        console.log(
          this.groupByParams(
            this.scheduleDataGroupByDate[date] || [],
            "movie_id"
          )
        );
        return this.groupByParams(
          this.scheduleDataGroupByDate[date] || [],
          "movie_id"
        );
      }
    },
    onAlertMessageBox(type, message) {
      const _this = this;
      _this.$message({
        message: message,
        type: type,
      });
    },
    groupByParams(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    mapMoviesLabel(movie_id) {
      const keyIndex = _.findIndex(
        [...this.moviesData] || [],
        (o) => o.id === movie_id
      );
      if (keyIndex > -1) {
        return this.moviesData[keyIndex].name;
      }
    },
    getMoviesData(movie_id) {
      const keyIndex = _.findIndex(
        [...this.moviesData] || [],
        (o) => o.id === movie_id
      );
      if (keyIndex > -1) {
        return this.moviesData[keyIndex];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  &-header {
    margin-top: 32px;
    font-weight: bold;
    color: #ffffff;
    font-size: 32px;
    font-family: BalooTammudu2;
    border-bottom: 2px solid #ffffff;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }
  &-content-style {
    padding-top: 24px;
    padding-inline: 12px;
    color: #ffffff;
    font-size: 14px;
    max-width: 768px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .contact {
    .location {
      color: #ffffff;
      text-align: left;
      padding: 8px;
    }
    .hotline {
      padding: 8px;
      color: #ffffff;
      text-align: left;
      &-label {
        color: #ffffff;
      }
      &-content {
        color: #ffffff;
        text-decoration: none;
      }
      &-content:hover {
        color: #dd474f;
      }
    }
  }
  .roomActive {
    color: #dd474f !important;
  }
  .button-time {
    background: url("assets/images/Background_Sub_Menu.png") !important;
    color: #ffffff;
    font-size: 14px;
  }
  .button-time:hover {
    font-weight: 700;
    color: #dd474f;
  }

  .el-carousel-style {
    display: flex;
    width: 100%;
    padding: 16px;
    justify-content: center;
    &-content {
      border-radius: 20px;
      width: 100%;
      max-width: 1440px;
      box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
      padding: 8px;
      background: #1c262f;
    }
    &-item {
      border-radius: 20px;
      // box-shadow: -1px -2px 11px 4px rgba(0, 0, 0, 0.46);
      box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
    }
  }
}

@media screen and (max-width: 414px) {
  .el-carousel-style {
    padding: 0px !important;
  }
}
</style>
