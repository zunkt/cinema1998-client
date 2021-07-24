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
                    Bắp tự chọn
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    80.000 VNĐ
                  </div>
                  <el-input-number
                    v-model="cornNumber"
                    @change="onBuyCorn()"
                    :min="1"
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
                    Nước ngọt
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    80.000 VNĐ
                  </div>
                  <el-input-number
                    v-model="cornNumber"
                    @change="onBuyCorn()"
                    :min="1"
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
                    Combo 1 bắp + 1 nước
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    120.000 VNĐ
                  </div>
                  <el-input-number
                    v-model="cornNumber"
                    @change="onBuyCorn()"
                    :min="1"
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
                    Combo 1 bắp + 2 nước
                  </div>
                  <div
                    class="corn-corn-price h4 text-white font-weight-bold my-2"
                  >
                    150.000 VNĐ
                  </div>
                  <el-input-number
                    v-model="cornNumber"
                    @change="onBuyCorn()"
                    :min="1"
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
                  Cinema TP Tuy Hòa
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
                  Spider Man Far From Home
                </div>
                <div class="ticket-content-time h5 text-white mt-2">
                  <span class="font-weight-bold">Giờ chiếu:</span>
                  7h20 pm - 10h20 pm
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
                    v-for="(item, index) in [1, 2, 3, 4]"
                    :key="index"
                    id="seat"
                    class="
                      d-flex
                      justify-content-center
                      align-items-center
                      mr-2
                    "
                  >
                    G12
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
                  Tổng tiền vé: 990.000 VNĐ
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
                  Tổng tiền thêm: 990.000 VNĐ
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
                  Tổng tiền: 990.000 VNĐ
                </div>
                <div class="text-right">
                  <el-button class="btn-default" style="width: auto">
                    Thanh toán
                  </el-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  data() {
    return {
      cornNumber: "",
      drinkNumber: "",
    };
  },
  async created() {},
  watch: {},
  methods: {
    onBuyCorn() {},
    onBuyDrink() {},
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
