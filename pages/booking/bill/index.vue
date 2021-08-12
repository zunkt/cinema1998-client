<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
        id="normalPage"
      >
        <div class="page">
          <div class="page-header">{{ $t("MovieScreen.BillInformation") }}</div>
          <div class="content mt-2 mt-md-4">
            <div class="content-background">
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("Movie") }}
                </div>
                <div class="h5 text-white">
                  {{ booking.movie && booking.movie.name }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("Theater") }}
                </div>
                <div class="h4 text-white">
                  Cinema {{ booking.theater && booking.theater.name }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("Time") }}:
                </div>
                <div class="h5 text-white">
                  {{
                    formatTime(
                      booking.time && booking.time.timeStart,
                      "HH:mm a"
                    )
                  }}
                  -
                  {{
                    formatTime(booking.time && booking.time.timeEnd, "HH:mm a")
                  }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Vé</div>
                <div class="h5 text-white">
                  <span v-for="(item, index) in booking.ticket" :key="index">
                    {{ item.value }}
                  </span>
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Food:</div>
                <div class="h5 text-white">
                  <span v-for="(item, index) in booking.corn" :key="index">
                    {{ item.label }}({{ item.quantity }})
                  </span>
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("Phone") }}:
                </div>
                <div class="h6 text-white">
                  {{
                    (this.accountInfo && this.accountInfo.phone) || "0000000000"
                  }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("TotalMoney") }}:
                </div>
                <div class="h4 text-white">
                  {{ booking && booking.totalTicket | currency }} VNĐ
                </div>
              </div>
              <div class="d-flex content-row content-random">
                <div class="h4 text-white font-weight-bold">
                  {{ this.randomText }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">
                  {{ $t("VerifyCode") }}:
                </div>
                <div class="h4 text-white">
                  <el-input v-model="confirmText"></el-input>
                </div>
              </div>
              <div v-if="isError" class="h5 mt-2" style="color: #dd474f">
                {{ $t("VerifyCodeNotSuccess") }}
              </div>
              <div class="d-flex content-row justify-content-end">
                <div>
                  <el-button
                    @click="onConfirm()"
                    class="btn-default mr-2"
                    style="width: auto"
                  >
                    {{ $t("Payment") }}
                  </el-button>
                </div>
                <div>
                  <el-button
                    @click="onCancel()"
                    class="btn-default"
                    style="width: auto"
                  >
                    {{ $t("Cancel") }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        id="dialogCustom"
        :title="$t('ConfirmPayment')"
        :visible.sync="dialogVisible"
      >
        <span style="word-break: break-word">{{
          $t("ConfirmPaymentContent")
        }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn-default"
            style="width: auto"
            @click="onDone()"
            >{{ $t("Confirm") }}</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  components: {},
  computed: {
    ...mapState({
      bill: (state) => state.bill.bill,
      booking: (state) => state.booking.booking,
      accountInfo: (state) => state.account.accountInfo,
      account: (state) => state.account.account,
    }),
    isError() {
      if (this.isSubmit) {
        if (this.confirmText !== "") {
          if (this.confirmText === this.randomText) {
            this.error = false;
          } else {
            this.error = true;
          }
        } else {
          this.error = true;
        }
      }
      return this.error;
    },
  },
  data() {
    return {
      dialogVisible: false,
      randomText: "",
      confirmText: "",
      errors: false,
      isSubmit: false,
      seatErrors: false,
    };
  },
  async created() {
    this.randomString(10);
    setTimeout(() => {
      console.log("ssssssssssss", this.booking);
    }, 500);
    if (_.isEmpty(this.booking)) {
      this.$router.push(this.localePath(`/home`));
    }
  },
  watch: {
    confirmText: {
      immediate: true,
      handler(newValue, oldValue) {
        if (this.isSubmit) {
          console.log(newValue);
          if (newValue !== this.randomText) {
            this.errors = true;
          } else {
            this.errors = false;
          }
        }
      },
    },
  },
  methods: {
    randomString() {
      var chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = 10; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      this.randomText = result;
      return this.randomText;
    },
    onConfirm() {
      this.isSubmit = true;
      if (
        !this.errors &&
        this.confirmText !== "" &&
        this.confirmText === this.randomText
      ) {
        this.dialogVisible = true;
      }
    },
    formatTime(value, type) {
      return moment(value).utc().format(type);
    },
    async onCancel() {
      const updateAllSeat = _.map([...this.booking.ticket] || [], (o, i) => {
        return this.onUpdateSeat(o, i, "available");
      });

      await Promise.all(updateAllSeat);
      await this.$store.commit("booking/SET_BOOKING", {});

      setTimeout(() => {
        if (!this.seatErrors) {
          this.$router.push(this.localePath(`/home`));
        }
      }, 2000);
    },
    async onDone() {
      try {
        const response = await this.$axios.$post(
          `user/bill/store`,
          {
            price: this.booking.totalTicket,
            status: "success",
            ticket_id: this.booking.ticketDetails.id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        if (response.status) {
          this.onAlertMessageBox("success", this.$t("PaymentSuccess"));
          this.dialogVisible = false;
          const updateAllSeat = _.map(
            [...this.booking.ticket] || [],
            (o, i) => {
              return this.onUpdateSeat(o, i, "sold");
            }
          );

          await Promise.all(updateAllSeat);

          await this.$store.commit("booking/SET_BOOKING", {});
          setTimeout(() => {
            if (!this.seatErrors) {
              this.$router.push(this.localePath(`/home`));
            }
          }, 2000);
        } else {
          this.$message.error(response.message);
        }
      } catch (error) {
        console.log(error);
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
    async onUpdateSeat(seatData, index, value) {
      try {
        const response = await this.$axios.$post(
          `/user/seat/update/${this.booking.seatId[index]["id"]}`,
          {
            status: value,
            price: seatData.price,
            ticket_id: this.booking.ticketDetails.id,
            seat_id: this.booking.seatRoomId[index]["id"],
            schedule_id: seatData.schedule_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        if (response.status) {
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
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 400px;
  background: url("./assets/images/Background_Sub_Menu.png") !important;
  padding: 48px 24px 24px 24px;
  border-radius: 24px;
  &-background {
    background: linear-gradient(
      90deg,
      rgba(35, 37, 38, 1) 0%,
      rgba(65, 67, 69, 1) 100%
    ) !important;
    padding: 12px 20px;
    border-radius: 24px;
  }
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 8px;
    border-bottom: 1px solid #ffffff;
  }
  &-random {
    background: url("./assets/images/Background_Sub_Menu.png") !important;
  }
}
</style>
