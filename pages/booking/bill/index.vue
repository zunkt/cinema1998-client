<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
        id="normalPage"
      >
        <div class="page">
          <div class="page-header">THÔNG TIN HÓA ĐƠN</div>
          <div class="content mt-2 mt-md-4">
            <div class="content-background">
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Phim</div>
                <div class="h5 text-white">
                  {{ booking.movie && booking.movie.name }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Rạp</div>
                <div class="h4 text-white">
                  Cinema {{ booking.theater && booking.theater.name }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Thời gian:</div>
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
                    {{ item.seat }}
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
                <div class="h4 text-white font-weight-bold">Số điện thoại:</div>
                <div class="h6 text-white">0922993996</div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Tổng tiền:</div>
                <div class="h4 text-white">
                  {{ booking && booking.total | currency }} VNĐ
                </div>
              </div>
              <div class="d-flex content-row content-random">
                <div class="h4 text-white font-weight-bold">
                  {{ this.randomText }}
                </div>
              </div>
              <div class="d-flex content-row">
                <div class="h4 text-white font-weight-bold">Mã xác nhận:</div>
                <div class="h4 text-white">
                  <el-input v-model="confirmText"></el-input>
                </div>
              </div>
              <div v-if="isError" class="h5 mt-2" style="color: #dd474f">
                Mã xác nhận không chính xác
              </div>
              <div class="d-flex content-row justify-content-end">
                <div>
                  <el-button
                    @click="onConfirm()"
                    class="btn-default mr-2"
                    style="width: auto"
                  >
                    Thanh toán
                  </el-button>
                </div>
                <div>
                  <el-button
                    @click="onCancel()"
                    class="btn-default"
                    style="width: auto"
                  >
                    Hủy
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        id="dialogCustom"
        title="Đặt vé thành công"
        :visible.sync="dialogVisible"
      >
        <span>Bạn có xác nhận thanh toán.</span>
        <span slot="footer" class="dialog-footer">
          <el-button class="btn-default" style="width: auto" @click="onDone()"
            >Xác nhận</el-button
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
    };
  },
  async created() {
    this.randomString(10);
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
      if (!this.errors && this.confirmText !== "") {
        this.dialogVisible = true;
      }
    },
    formatTime(value, type) {
      return moment(value).format(type);
    },
    onCancel() {
      this.$router.push(this.localePath(`/home`));
    },
    onDone() {
      this.$router.push(this.localePath(`/account`));
    },
    submitModal() {
      const form = { ...state.bill };

      axios
        .post(`user/bill/store`, form)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data.bill;
            console.log(data);
            alert("Success!");
            // this.$router.push(this.localePath(`/booking?${movie.name}`));
          }
        })
        .catch(() => {});
    },
    fetchData() {
      // Movie
      axios
        .get(`user/movie/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.movie;
            state.bill.movie = { ...data };
          }
        })
        .catch(() => {});

      // Schedule
      axios
        .get(`user/schedule/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.schedule;
            state.bill.schedule = { ...data };
          }
        })
        .catch(() => {});

      // User
      axios
        .get(`user/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.user;
            state.bill.user = { ...data };
          }
        })
        .catch(() => {});

      // Coupon
      axios
        .get(`user/coupon/show/${id.value}`)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data.coupon;
            state.bill.coupon = { ...data };
          }
        })
        .catch(() => {});
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
