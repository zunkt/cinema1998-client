<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
      >
        <div class="page">
          <div class="page-header">Hệ thống rạp</div>
          <div class="page-content-style">
            <div class="header-action">
              <div
                class="header-action-left"
                v-bind:class="{ 'header-action-active': active === 'north' }"
              >
                <el-button v-on:click="active = 'north'">Miền Bắc</el-button>
              </div>
              <div
                class="header-action-right"
                v-bind:class="{ 'header-action-active': active === 'south' }"
              >
                <el-button v-on:click="active = 'south'">Miền Nam</el-button>
              </div>
            </div>
            <div class="theater">
              <b-row>
                <b-col
                  v-for="(item, index) in theater[active]"
                  :key="index"
                  md="4"
                  cols="6"
                  class="theater-box"
                  v-on:click="goTheaterDetails(item)"
                >
                  <div class="theater-content">
                    <div>
                      <div class="theater-content-name h5 font-weight-bold">
                        {{ item.name }}
                      </div>
                      <div class="theater-content-location h6 font-weight-bold">
                        {{ item.address }}
                      </div>
                    </div>
                    <div class="hotline">
                      <div class="hotline-label h5 font-weight-bold">
                        Fax:
                        <a
                          class="h6 hotline-content"
                          style="font-weight: 400"
                          href="tel:0922993996"
                          >0922993996</a
                        >
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState({
      booking: (state) => state.booking.booking,
    }),
  },
  data() {
    return {
      theater: {
        north: [
          {
            id: "flskajflsjl",
            name: "TP HCM",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
          {
            id: "ljljliesjras",
            name: "TP Cần thơ",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
        ],
        south: [
          {
            id: "flskajflsjl",
            name: "TP Hà nội",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
          {
            id: "ljljliesjras",
            name: "TP Huế",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
          {
            id: "ljljliesjras",
            name: "TP Tuy Hòa",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
          {
            id: "ljljliesjras",
            name: "TP Nha Trang",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
          {
            id: "ljljliesjras",
            name: "TP Quy Nhon",
            fax: "0922993996",

            address:
              "Tầng 4, TTTM Vincom Plaza Hậu Giang, số 1, Đường 3 tháng 2, Khu vực 3, Phường 5, TP.Vị Thanh, Hậu Giang",
          },
        ],
      },
      active: "north",
    };
  },
  async created() {},
  mounted() {
    console.log(this.booking);
  },
  watch: {},
  methods: {
    async goTheaterDetails(data) {
      await this.$store.commit("booking/SET_BOOKING", {
        ...this.booking,
        theater: {
          ...data,
        },
      });
      this.$router.push(this.localePath(`/theater/${data.id}`));
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
    text-align: center;
    display: flex;
    flex-direction: column;
    .header-action {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      &-left {
        width: 140px;

        button {
          width: 100%;
          // background: rgb(91, 89, 117);
          // background: linear-gradient(
          //   90deg,
          //   rgba(91, 89, 117, 1) 0%,
          //   rgba(73, 70, 120, 1) 35%,
          //   rgba(53, 49, 115, 1) 100%
          // );
          background-color: #393939;
          color: #ffffff;
          font-weight: bold;
        }
      }
      &-right {
        width: 140px;
        button {
          width: 100%;
          // background: rgb(99, 119, 108);
          // background: linear-gradient(
          //   90deg,
          //   rgba(99, 119, 108, 1) 0%,
          //   rgba(97, 116, 105, 1) 49%,
          //   rgba(78, 85, 81, 1) 100%
          // );
          background-color: #393939;
          color: #ffffff;
          font-weight: bold;
        }
      }
      &-active {
        button {
          background-color: #dd474f;
        }
      }
    }
    .theater {
      margin-top: 100px;
      cursor: pointer;
      &-box {
        padding: 10px;
        min-height: 180px;
        border-radius: 10px;
        transition: transform 0.2s;
      }
      &-box:hover {
        transform: scale(1.05);
      }
      &-content {
        height: 100%;
        background-color: #393939;
        padding: 10px;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 20px -3px rgba(125, 125, 125, 0.44);
        box-shadow: 0px 0px 20px -3px rgba(125, 125, 125, 0.44);
        color: #ffffff;
        &-name {
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #ffffff;
          color: #ffffff;
        }
        &-location {
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
    }
  }
}
</style>
