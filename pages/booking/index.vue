<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
        id="normalPage"
      >
        <div class="page">
          <div class="page-header">
            {{ bookingPage.movie && bookingPage.movie.name }}
            <div>
              (
              {{
                formatTime(
                  bookingPage.schedule && bookingPage.schedule.time_start,
                  "HH:mm a"
                )
              }}
              -
              {{
                formatTime(
                  bookingPage.schedule && bookingPage.schedule.time_end,
                  "HH:mm a"
                )
              }}
              )
            </div>
          </div>
          <div class="d-flex flex-row justify-content-around w-100 my-4 pt-4">
            <div>
              <div class="example-box-available"></div>
              <div class="text-center text-white h5 font-weight-bold pt-4">
                Available
              </div>
            </div>
            <div>
              <div class="example-box-booked"></div>
              <div class="text-center text-white h5 font-weight-bold pt-4">
                Booked
              </div>
            </div>
            <div>
              <div class="example-box-selected"></div>
              <div class="text-center text-white h5 font-weight-bold pt-4">
                Selected
              </div>
            </div>
            <div>
              <div class="example-box-sold"></div>
              <div class="text-center text-white h5 font-weight-bold pt-4">
                Sold
              </div>
            </div>
          </div>
        </div>
        <div class="page-movie px-0 px-md-4">
          <div class="container-screen">
            <div class="screen"></div>
          </div>
          <div class="container-seat tablet">
            <div class="d-flex flex-column w-100 mt-4">
              <div v-for="(itemRow, indexRow) in seatData" :key="indexRow">
                <div class="d-flex flex-row" style="flex: 18">
                  <div
                    class="d-flex"
                    style="flex: 1"
                    v-for="(itemColumn, indexColumn) in itemRow.seat"
                    :key="indexColumn"
                  >
                    <div
                      @click="onBooked(itemColumn, indexRow, indexColumn)"
                      v-if="itemColumn.value !== 'none'"
                      class="button-seat"
                      v-bind:class="{
                        'seat-booked': itemColumn.status === 'booked',
                        'seat-sold': itemColumn.status === 'sold',
                        'seat-selected': itemColumn.status === 'selected',
                      }"
                    >
                      {{ itemColumn.value }}
                    </div>
                    <div v-else></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-seat mobile">
            <div class="d-flex flex-column w-100">
              <div v-for="(itemRow, indexRow) in seatData" :key="indexRow">
                <div class="d-flex flex-row" style="flex: 12">
                  <div
                    class="d-flex"
                    style="flex: 1"
                    v-for="(itemColumn, indexColumn) in [
                      3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                    ]"
                    :key="indexColumn"
                  >
                    <div
                      @click="
                        onBooked(
                          itemRow['seat'][itemColumn],
                          indexRow,
                          itemColumn
                        )
                      "
                      v-if="itemRow['seat'][itemColumn]['status'] !== 'none'"
                      class="button-seat"
                      v-bind:class="{
                        'seat-booked':
                          itemRow['seat'][itemColumn]['status'] === 'booked',
                        'seat-sold':
                          itemRow['seat'][itemColumn]['status'] === 'sold',
                        'seat-selected':
                          itemRow['seat'][itemColumn]['status'] === 'selected',
                      }"
                    >
                      {{ itemRow["seat"][itemColumn]["value"] }}
                    </div>
                    <div v-else></div>
                  </div>
                </div>
              </div>
              <div class="m-4">
                <div v-for="(itemRow, indexRow) in seatData" :key="indexRow">
                  <div class="d-flex flex-row" style="flex: 2">
                    <div class="d-flex" style="flex: 1">
                      <div
                        class="d-flex"
                        style="flex: 1"
                        v-for="(itemColumn1, indexColumn1) in [0, 1, 2]"
                        :key="indexColumn1"
                      >
                        <div
                          @click="
                            onBooked(
                              itemRow['seat'][itemColumn1],
                              indexRow,
                              itemColumn1
                            )
                          "
                          v-if="
                            itemRow['seat'][itemColumn1]['status'] !== 'none'
                          "
                          class="button-seat"
                          v-bind:class="{
                            'seat-booked':
                              itemRow['seat'][itemColumn1]['status'] ===
                              'booked',
                            'seat-sold':
                              itemRow['seat'][itemColumn1]['status'] === 'sold',
                            'seat-selected':
                              itemRow['seat'][itemColumn1]['status'] ===
                              'selected',
                          }"
                        >
                          {{ itemRow["seat"][itemColumn1]["value"] }}
                        </div>
                        <div v-else></div>
                      </div>
                    </div>
                    <div class="d-flex" style="flex: 1">
                      <div
                        class="d-flex"
                        style="flex: 1"
                        v-for="(itemColumn2, indexColumn2) in [15, 16, 17]"
                        :key="indexColumn2"
                      >
                        <div
                          @click="
                            onBooked(
                              itemRow['seat'][itemColumn2],
                              indexRow,
                              itemColumn2
                            )
                          "
                          v-if="
                            itemRow['seat'][itemColumn2]['status'] !== 'none'
                          "
                          class="button-seat"
                          v-bind:class="{
                            'seat-booked':
                              itemRow['seat'][itemColumn2]['status'] ===
                              'booked',
                            'seat-sold':
                              itemRow['seat'][itemColumn2]['status'] === 'sold',
                            'seat-selected':
                              itemRow['seat'][itemColumn2]['status'] ===
                              'selected',
                          }"
                        >
                          {{ itemRow["seat"][itemColumn2]["value"] }}
                        </div>
                        <div v-else></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-row class="h6 text-white font-weight-bold w-100 my-4 px-md-0 px-4">
            <b-col cols="12" md="6">
              <div>
                {{ $t("MovieScreen.TicketInformation") }}:
                <div>- {{ $t("MovieScreen.TicketInfo1") }}</div>
                <div>- {{ $t("MovieScreen.TicketInfo2") }}</div>
                <div>- {{ $t("MovieScreen.TicketInfo3") }}</div>
                <div>- {{ $t("MovieScreen.TicketInfo4") }}</div>
              </div>
            </b-col>
          </b-row>

          <div class="container-result px-md-0 px-4">
            <div class="h4 text-white font-weight-bold">
              {{ $t("YouAreBooked") }}: {{ this.ticket.length }} vé
            </div>
            <div class="h4 text-white font-weight-bold mt-2">
              {{ $t("TotalMoney") }}: {{ this.total | currency }} VNĐ
            </div>
            <el-button
              :disabled="ticket.length === 0 ? true : false"
              v-on:click="dialogVisible = true"
              class="btn-default my-4"
              style="width: auto"
              >{{ $t("Payment") }}</el-button
            >
          </div>
        </div>
      </div>
      <el-dialog
        id="dialogCustom"
        title="Thông báo xác nhận"
        :visible.sync="dialogVisible"
      >
        <span
          >{{ $t("MovieScreen.SeatConfirm1") }} {{ this.ticket.length }}
          {{ $t("MovieScreen.SeatConfirm2") }} {{ this.total }} VNĐ?</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn-default"
            style="width: auto"
            @click="onConfirmBooked()"
            >{{ $t("Confirm") }}</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { seatDataConfig } from "@/pages/booking/seat";
import moment from "moment";

export default {
  components: {},
  computed: {
    ...mapState({
      booking: (state) => state.booking.booking,
      account: (state) => state.account.account,
      accountInfo: (state) => state.account.accountInfo,
    }),
  },
  watch: {
    booking: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("newValue", newValue);
        console.log("oldValue", oldValue);
        this.bookingPage = { ...newValue } || {};
        console.log("bookingPage :", this.bookingPage);
      },
    },
    ticket: {
      immediate: true,
      handler(newValue, oldValue) {
        this.total = 0;
        _.forEach([...newValue] || [], (o) => {
          this.total = this.total + o?.price;
        });
        console.log("bookingPage :", this.total);
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      bookingPage: {},
      seatData: [],
      ticket: [],
      total: 0,
      seatErrors: false,
      ticketBooked: [],
    };
  },
  async created() {
    setTimeout(() => {
      this.seatData = seatDataConfig;
      _.forEach([...seatDataConfig] || [], (o, i) => {
        _.forEach([...o.seat] || [], (p, indexSeat) => {
          const keyIndex = _.findIndex(
            [...this.bookingPage.seatBooked] || [],
            (h) => p.value === h.value
          );
          if (keyIndex > -1) {
            this.seatData[i]["seat"][indexSeat] =
              this.bookingPage.seatBooked[keyIndex];
          }
        });
      });
    }, 500);
  },
  async mounted() {},
  methods: {
    onBooked(seat, indexRow, indexColumn) {
      if (seat.status !== "sold") {
        switch (seat.status) {
          case "available":
            this.seatData[indexRow]["seat"][indexColumn]["status"] = "selected";
            break;
          case "selected":
            this.seatData[indexRow]["seat"][indexColumn]["status"] =
              "available";
            break;
        }
        const keyIndex = _.findIndex(
          this.ticket || [],
          (o) => o.value === seat.value
        );
        console.log(keyIndex);

        if (keyIndex > -1) {
          let newTicket = [...this.ticket];
          newTicket = [
            ...newTicket.slice(0, keyIndex),
            ...newTicket.slice(keyIndex + 1),
          ];
          this.ticket = newTicket;
        } else {
          let newTicket = [...this.ticket];
          newTicket.push({
            value: seat?.value,
            status: "selected",
            price: seat?.price,
            room_id: this.bookingPage.schedule.room_id,
            schedule_id: this.bookingPage.schedule.id,
          });
          this.ticket = newTicket;
        }
        console.log("ticket", this.ticket);
      }
    },
    async onConfirmBooked() {
      this.dialogVisible = false;
      await this.$store.commit("booking/SET_BOOKING", {
        ...this.booking,
        ticket: this.ticket,
        totalTicket: this.total,
      });
      this.onAddTicket();
      // this.$router.push(this.localePath(`/booking/corn`));
    },
    formatTime(value, type) {
      return moment(value).utc().format(type);
    },
    async onAddSeat(seatValue, ticketId) {
      try {
        const response = await this.$axios.$post(
          `/user/seat/store`,
          {
            value: seatValue.value,
            status: "booked",
            price: seatValue.price,
            ticket_id: ticketId,
            room_id: seatValue.room_id,
            schedule_id: seatValue.schedule_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        if (response.status) {
          // this.ticketBooked.push({
          //   value: seat?.value,
          //   status: "selected",
          //   price: seat?.price,
          //   room_id: this.bookingPage.schedule.room_id,
          //   schedule_id: this.bookingPage.schedule.id,
          // })
        } else {
          this.$message.error(response.message);
          this.seatErrors = true;
        }
      } catch (error) {
        if (error.response) {
          this.seatErrors = true;
          console.log(error.response.data);
          this.onAlertMessageBox(
            "error",
            error.response.data.message || "Response message null"
          );
        }
      }
    },
    async onAddTicket() {
      try {
        const response = await this.$axios.$post(
          `/user/ticket/store`,
          {
            name: this.randomString(),
            schedule_id: this.bookingPage.schedule.id,
            user_id: this.accountInfo.id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        /// *** wait response status fix *** ///
        if (response) {
          const addAllSeat = _.map([...this.ticket] || [], (o) => {
            return this.onAddSeat(o, response.data.ticket.id);
          });
          await Promise.all(addAllSeat);
          await this.$store.commit("booking/SET_BOOKING", {
            ...this.booking,
            ticket: this.ticket,
            ticketDetails: response.data.ticket,
          });
          setTimeout(() => {
            if (!this.seatErrors) {
              this.$router.push(this.localePath(`/booking/bill`));
            }
          }, 1000);
        } else {
          this.$message.error(response.message);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          this.onAlertMessageBox(
            "error",
            error.response.data.message || "Response message null"
          );
        }
      }
    },
    onAlertMessageBox(type, message) {
      const _this = this;
      _this.$message({
        message: message,
        type: type,
      });
    },
    randomString() {
      var chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = 10; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.example-box {
  &-available {
    height: 50px;
    width: 60px;
    background-color: #444451;
    border: 1px solid #ffffff;
  }
  &-sold {
    height: 50px;
    width: 60px;
    background-color: #ee4e41;
    border: 1px solid #ffffff;
  }
  &-booked {
    height: 50px;
    width: 60px;
    background-color: #00c48c;
    border: 1px solid #ffffff;
  }
  &-selected {
    height: 50px;
    width: 60px;
    background-color: #ffce56;
    border: 1px solid #ffffff;
  }
}

.page-movie {
  width: 100%;
  max-width: 1024px;
  padding: 0px 24px;

  .container {
    &-screen {
      perspective: 1000px;
      margin-bottom: 30px;
      padding: 0px 80px;
      .screen {
        background-color: #fff;
        height: 120px;
        width: 100%;
        margin: 15px 0;
        transform: rotateX(-48deg);
        box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
      }
    }
    &-seat {
      flex-wrap: wrap;
      .button-seat {
        background-color: #444451;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
      .seat-sold {
        background-color: #ee4e41;
      }
      .seat-booked {
        background-color: #00c48c;
      }
      .seat-selected {
        background-color: #ffce56;
      }
    }
    &-result {
      margin-top: 44px;
      text-align: right;
    }
  }
}

.mobile {
  display: none;
}
.tablet {
  display: flex;
}

@media screen and (max-width: 760px) {
  .mobile {
    display: flex !important;
  }
  .tablet {
    display: none !important;
  }
}

@media screen and (max-width: 320px) {
  .button-seat {
    font-size: 10px !important;
  }
}
</style>
