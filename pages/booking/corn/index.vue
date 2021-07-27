<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
        id="normalPage"
      >
        <div class="page">
          <div class="page-header">BẮP SIÊU NGON ĐẾN ĐÂY</div>
          <b-row class="d-flex flex-row justify-content-around w-100 my-4 pt-4">
            <b-col cols="12" md="6" class="d-flex flex-column corn">
              <div class="corn-corn d-flex flex-row my-4 w-100">
                <div class="corn-corn-image">
                  <img
                    src="https://thumbs.dreamstime.com/b/popcorn-drink-cinema-food-vector-illustration-cartoon-style-isolated-white-background-popcorn-drink-cinema-food-vector-168770356.jpg"
                  />
                </div>
                <div class="pl-4" id="elInputNumber">
                  <div
                    class="corn-corn-name h4 text-white font-weight-bold my-2"
                  >
                    {{ corn.label }}
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    {{ corn.price | currency }} VNĐ
                  </div>
                  <el-input-number
                    v-model="corn.quantity"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </div>
              </div>
              <div class="corn-corn d-flex flex-row my-4 w-100">
                <div class="corn-corn-image">
                  <img
                    src="https://thumbs.dreamstime.com/b/popcorn-drink-cinema-food-vector-illustration-cartoon-style-isolated-white-background-popcorn-drink-cinema-food-vector-168770356.jpg"
                  />
                </div>
                <div class="pl-4" id="elInputNumber">
                  <div
                    class="corn-corn-name h4 text-white font-weight-bold my-2"
                  >
                    {{ drink.label }}
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    {{ drink.price | currency }} VNĐ
                  </div>
                  <el-input-number
                    v-model="drink.quantity"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </div>
              </div>
              <div class="corn-corn d-flex flex-row my-4 w-100">
                <div class="corn-corn-image">
                  <img
                    src="https://thumbs.dreamstime.com/b/popcorn-drink-cinema-food-vector-illustration-cartoon-style-isolated-white-background-popcorn-drink-cinema-food-vector-168770356.jpg"
                  />
                </div>
                <div class="pl-4" id="elInputNumber">
                  <div
                    class="corn-corn-name h4 text-white font-weight-bold my-2"
                  >
                    {{ comboOne.label }}
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    {{ comboOne.price | currency }} VNĐ
                  </div>
                  <el-input-number
                    v-model="comboOne.quantity"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </div>
              </div>
              <div class="corn-corn d-flex flex-row my-4 w-100">
                <div class="corn-corn-image">
                  <img
                    src="https://thumbs.dreamstime.com/b/popcorn-drink-cinema-food-vector-illustration-cartoon-style-isolated-white-background-popcorn-drink-cinema-food-vector-168770356.jpg"
                  />
                </div>
                <div class="pl-4" id="elInputNumber">
                  <div
                    class="corn-corn-name h4 text-white font-weight-bold my-2"
                  >
                    {{ comboTwo.label }}
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    {{ comboOne.price | currency }} VNĐ
                  </div>
                  <el-input-number
                    v-model="comboTwo.quantity"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </div>
              </div>
            </b-col>
            <b-col
              cols="12"
              md="6"
              class="d-flex flex-column ticket mt-4 mt-md-0"
            >
              <div class="ticket-poster">
                <img
                  src="https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/b/t/btdq_main_poster_1.jpg"
                />
              </div>
              <div class="ticket-content">
                <div
                  class="ticket-content-theater h4 font-weight-bold text-white"
                >
                  Cinema {{ theater && theater.name }}
                </div>
                <div
                  class="
                    ticket-content-movie
                    h4
                    font-weight-bold
                    text-white
                    mt-4
                  "
                >
                  {{ movie && movie.name }}
                </div>
                <div class="ticket-content-time h5 text-white mt-2">
                  <span class="font-weight-bold">Giờ chiếu:</span>
                  {{ formatTime(time && time.timeStart, "HH:mm a") }} -
                  {{ formatTime(time && time.timeEnd, "HH:mm a") }}
                </div>
                <div
                  class="
                    ticket-content-seat
                    h4
                    font-weight-bold
                    text-white
                    mt-3
                    d-flex
                  "
                >
                  <div
                    v-for="(item, index) in ticket"
                    :key="index"
                    id="seat"
                    class="
                      d-flex
                      justify-content-center
                      align-items-center
                      mr-2
                    "
                  >
                    {{ item.seat }}
                  </div>
                </div>
                <div
                  class="
                    ticket-content-total
                    h4
                    text-white
                    font-weight-bold
                    my-4
                  "
                >
                  Tổng tiền vé:
                  {{ booking && booking.totalTicket | currency }} VNĐ
                </div>
                <div
                  class="
                    ticket-content-total
                    h4
                    text-white
                    font-weight-bold
                    my-4
                  "
                >
                  Tổng tiền thêm: {{ getTotalCorn | currency }} VNĐ
                </div>
                <div
                  class="
                    ticket-content-total
                    h4
                    text-white
                    font-weight-bold
                    my-4
                  "
                >
                  Tổng tiền:
                  {{
                    getTotal(
                      getTotalCorn,
                      (booking && booking.totalTicket) || 0
                    ) | currency
                  }}
                  VNĐ
                </div>
                <div class="text-right">
                  <el-button
                    @click="dialogVisible = true"
                    class="btn-default"
                    style="width: auto"
                  >
                    Thanh toán
                  </el-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <el-dialog
        id="dialogCustom"
        title="Thông báo xác nhận"
        :visible.sync="dialogVisible"
      >
        <span>Bạn có xác nhận mua?</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn-default"
            style="width: auto"
            @click="onPayment()"
            >Xác nhận</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  components: {},
  computed: {
    ...mapState({
      booking: (state) => state.booking.booking,
    }),
    getTotalCorn() {
      this.totalCorn =
        this.corn.price * this.corn.quantity +
        this.drink.price * this.drink.quantity +
        this.comboOne.price * this.comboOne.quantity +
        this.comboTwo.price * this.comboTwo.quantity;
      return (
        this.corn.price * this.corn.quantity +
        this.drink.price * this.drink.quantity +
        this.comboOne.price * this.comboOne.quantity +
        this.comboTwo.price * this.comboTwo.quantity
      );
    },
  },
  watch: {
    booking: {
      immediate: true,
      handler(newValue, oldValue) {
        this.movie = newValue.movie;
        this.theater = newValue.theater;
        this.time = newValue.time;
        this.ticket = newValue.ticket;
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      theater: {},
      movie: {},
      time: {},
      ticket: [],
      bookingCorn: [],
      totalCorn: 0,
      corn: {
        price: 80000,
        label: "Bắp tự chọn",
        quantity: 0,
      },
      drink: {
        price: 50000,
        label: "Nước ngọt tự chọn",
        quantity: 0,
      },
      comboOne: {
        price: 120000,
        label: "Combo 1 bắp + 1 nước",
        quantity: 0,
      },
      comboTwo: {
        price: 150000,
        label: "Combo 1 bắp + 2 nước",
        quantity: 0,
      },
    };
  },
  async created() {},
  mounted() {
    console.log(this.booking);
  },
  methods: {
    formatTime(value, type) {
      return moment(value).format(type);
    },
    getTotal(value1, value2) {
      return value1 + value2;
    },
    async onPayment() {
      this.dialogVisible = false;
      let newCorn = [];
      if (this.corn.quantity > 0) {
        newCorn.push(this.corn);
      }
      if (this.drink.quantity > 0) {
        newCorn.push(this.drink);
      }
      if (this.comboOne.quantity > 0) {
        newCorn.push(this.comboOne);
      }
      if (this.comboTwo.quantity > 0) {
        newCorn.push(this.comboTwo);
      }

      await this.$store.commit("booking/SET_BOOKING", {
        ...this.booking,
        corn: [...newCorn],
        totalCorn: this.totalCorn,
        total: this.totalCorn + this.booking.totalTicket,
      });
      this.$router.push(this.localePath(`/booking/bill`));
    },
  },
};
</script>
<style lang="scss" scoped>
.corn {
  &-corn {
    &-name {
      font-family: BalooTammudu2;
    }
    &-image {
      border-radius: 20px;
      height: 200px;
      width: 200px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
      }
    }
  }
}

.ticket {
  &-poster {
    border-radius: 20px;
    height: 300px;
    max-width: 300px;
    padding-inline: 40px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
    }
  }
  &-content {
    padding-inline: 40px;
    padding-top: 24px;
    &-theater {
      font-family: BalooTammudu2;
      border-bottom: 2px solid #ffffff;
    }
    &-movie {
      font-family: BalooTammudu2;
    }
    &-seat {
      #seat {
        height: 40px;
        width: 50px;
        background-color: #444451;
        border: 1px solid #ffffff;
      }
    }
  }
}
</style>
