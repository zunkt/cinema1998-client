<template>
  <div class="bg-container">
    <section class="container mw-100 px-0 align-items-center">
      <div class="d-lg-flex pb-4 px-0 flex-column page-content page">
        <div class="page-header">{{ $t("HistoryBooked") }}</div>
        <div
          class="page-content-style"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <div
            class="page-row"
            v-for="(item, index) in ticketData"
            :key="index"
          >
            <div class="row-content">
              {{ $t("Movie") }}:
              <div>
                {{
                  mapLabel(
                    item.schedule && item.schedule.movie_id,
                    moviesData,
                    "id",
                    "name"
                  )
                }}
              </div>
            </div>
            <div class="row-content">
              {{ $t("Theater") }}:
              <div>
                {{
                  getTheaterDetails(
                    item.schedule && item.schedule.room_id,
                    roomData,
                    "id",
                    "name"
                  )
                }}({{ $t("Room") }}:
                {{
                  mapLabel(
                    item.schedule && item.schedule.room_id,
                    roomData,
                    "id",
                    "name"
                  )
                }})
              </div>
            </div>
            <div class="row-content">
              {{ $t("GameShow") }}:
              <div>{{ item.schedule && item.schedule.date_start }}</div>
            </div>
            <div style="text-align: right">
              {{
                formatTime(item.schedule && item.schedule.time_start, "HH:mm a")
              }}
              -
              {{
                formatTime(item.schedule && item.schedule.time_end, "HH:mm a")
              }}
            </div>
            <div class="row-content">
              Code :
              <div>{{ item.name }}</div>
            </div>
            <div class="row-content">
              {{ $t("Price") }}:
              <div>{{ item.bill && item.bill.price | currency }} VNĐ</div>
            </div>

            <div
              class="row-content"
              v-if="item.bill && item.bill.status === 'success'"
            >
              {{ $t("Status") }}:
              <div style="color: #00c48c" class="font-weight-bold">
                {{ $t("Success") }}
              </div>
            </div>
            <div v-else class="row-content">
              {{ $t("Status") }}:
              <div style="color: #fe4a49" class="font-weight-bold">
                {{ $t("Cancelled") }}
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
import * as _ from "lodash";
import moment from "moment";

export default {
  components: {},
  computed: {
    ...mapState({
      account: (state) => state.account.account,
      accountInfo: (state) => state.account.accountInfo,
      moviesData: (state) => state.movie.moviesData,
    }),
  },
  data() {
    return {
      ticketData: [],
      roomData: [],
    };
  },
  async created() {
    const _this = this;
    setTimeout(async () => {
      if (!_this.account.isLoggedIn) {
        _this.$router.push(_this.localePath("/account/login"));
      } else {
        await _this.getData();
        console.log(this.moviesData);
      }
    }, 500);
  },
  mounted() {
    const _this = this;
    setTimeout(async () => {
      if (!_this.account.isLoggedIn) {
        _this.$router.push(_this.localePath("/account/login"));
      } else {
        await _this.getData();
      }
    }, 500);
  },
  watch: {},
  methods: {
    async getData() {
      try {
        const response = await this.$axios.$get(`/user/ticket/all?&size=999`, {
          headers: {
            Authorization: "Bearer " + this.account.token,
          },
        });
        if (response.code === 200) {
          const ticketResponse = response.data?.ticket?.data;
          this.ticketData = _.filter(
            [...ticketResponse] || [],
            (o) => this.accountInfo.id === o?.user?.id
          );
        } else {
          this.$message.error(response.message);
        }
        const responseRoom = await this.$axios.$get(
          `/user/room/all?&size=999`,
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        if (responseRoom.status) {
          this.roomData = responseRoom.data.room.data;
        } else {
          this.$message.error(responseRoom.message);
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
    mapLabel(value, list, keyValue, keyLabel) {
      const keyIndex = _.findIndex(
        [...list] || [],
        (o) => o[keyValue] === value
      );
      if (keyIndex > -1) {
        return list[keyIndex][keyLabel];
      } else {
        return value;
      }
    },
    getTheaterDetails(value, list, keyValue, keyLabel) {
      const keyIndex = _.findIndex(
        [...list] || [],
        (o) => o[keyValue] === value
      );
      if (keyIndex > -1) {
        return list[keyIndex]["theater"][keyLabel];
      } else {
        return value;
      }
    },
    formatTime(value, type) {
      return moment(value).format(type);
    },
    onAlertMessageBox(type, message) {
      const _this = this;
      _this.$message({
        message: message,
        type: type,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  &-header {
    margin-top: 32px;
    font-weight: bold;
    color: #ffffff;
    font-size: 32px;
    font-family: BalooTammudu2;
    border-bottom: 2px solid #ffffff;
    text-align: center;
  }
  &-content-style {
    padding-top: 24px;
    padding-inline: 12px;
    color: #ffffff;
    font-size: 14px;
  }
  &-label {
    font-weight: bold;
    color: #ffffff;
    font-size: 24px;
    font-family: BalooTammudu2;
    margin-bottom: 12px;
    margin-top: 12px;
  }
  &-row {
    margin-top: 12px;
    background-color: #1c262f;
    padding: 24px;
    border-radius: 16px;
    max-width: 414px;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }
  a:hover {
    color: #dd474f;
  }
}
.row-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
