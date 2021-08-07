<template>
  <div class="bg-container movie-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
      >
        <div
          class="page-header"
          :style="`background-image: url('${movieDetails.backgroundImage}');`"
        >
          <div class="header-overlay">
            <b-row class="w-100 h-100 header-container">
              <b-col
                cols="12"
                md="6"
                class="header-poster-card-container pt-5 pt-lg-0 px-5 px-lg-0"
              >
                <div
                  :style="`background-image: url('${movieDetails.imageText}');`"
                  class="header-poster-card"
                ></div>
              </b-col>
              <b-col
                cols="12"
                md="6"
                class="header-poster-card-container pt-5 pt-lg-0 px-5 px-lg-0"
              >
                <div class="header-poster-card-content">
                  <div class="name-style">{{ movieDetails.name }}</div>
                  <div>
                    <div class="content-tile">
                      {{ $t("MovieScreen.Director") }}:
                      <span class="content-label">{{
                        movieDetails.director
                      }}</span>
                    </div>
                    <div class="content-tile">
                      {{ $t("MovieScreen.Actor") }}:
                      <span class="content-label">{{
                        movieDetails.actor
                      }}</span>
                    </div>
                    <div class="content-tile">
                      {{ $t("MovieScreen.Category") }}:
                      <span class="content-label">
                        <span
                          v-for="(item, index) in movieDetails.category"
                          :key="index"
                        >
                          {{ mapLabel(item, categoryData) }}
                          <span
                            v-if="index !== movieDetails.category.length - 1"
                            >,</span
                          >
                        </span>
                      </span>
                    </div>
                    <div class="content-tile">
                      {{ $t("MovieScreen.ReleaseDate") }}:
                      <span class="content-label">{{
                        getDate(movieDetails.releaseDate)
                      }}</span>
                    </div>
                    <div class="content-tile">
                      {{ $t("MovieScreen.Subtitle") }}:
                      <span class="content-label">
                        <span
                          v-for="(item, index) in movieDetails.language"
                          :key="index"
                        >
                          {{ mapLabel(item, subtitleData) }}
                          <span
                            v-if="
                              index !==
                              (movieDetails.language &&
                                movieDetails.language.length - 1)
                            "
                          >
                            -
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div class="btn-action justify-content-start pl-0">
                    <el-button
                      class="btn-booking"
                      @click="dialogVisible = true"
                      >{{ $t("MovieScreen.Booking") }}</el-button
                    >
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="content-movie-label px-5 px-lg-0">
          {{ $t("MovieScreen.MovieContent") }}
        </div>
        <div class="content-movie px-5 px-lg-0">
          {{ movieDetails.descriptionContent }}
        </div>
      </div>

      <el-dialog
        id="dialogCustom"
        width="80%"
        :title="$t('MovieSchedule')"
        :visible.sync="dialogVisible"
      >
        <vue-horizontal-calendar
          lang="en"
          v-on:change="onSelectedDate"
          choosedItemColor="rgb(150, 0, 0)"
          todayItemColor="rgb(150, 0, 0, .1)"
          choosedDatePos="center"
        ></vue-horizontal-calendar>
        <div v-if="haveSchedule">
          <b-row class="w-100 mx-0">
            <b-col
              v-for="(itemMovie, indexMovie) in scheduleData"
              :key="indexMovie"
              lg="3"
              md="4"
              cols="6"
              class="schedule-box"
            >
              <el-button
                class="w-100 mt-4 p-3 button-time"
                v-on:click="onBooking(itemMovie)"
                >{{ formatTime(itemMovie.time_start, "HH:mm a") }} -
                {{ formatTime(itemMovie.time_end, "HH:mm a'") }}</el-button
              >
            </b-col>
          </b-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="btn-default"
            style="width: auto"
            @click="dialogVisible = false"
            >{{ $t("Cancel") }}</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as _ from "lodash";
import moment from "moment";
import VueHorizontalCalendar from "vue-horizontal-calendar";

export default {
  components: {
    VueHorizontalCalendar,
  },
  computed: {
    ...mapState({
      movieDetails: (state) => state.movie.movieDetails,
      subtitleData: (state) => state.masterData.subtitleData,
      categoryData: (state) => state.masterData.categoryData,
    }),
  },
  data() {
    return {
      dialogVisible: false,
      haveSchedule: false,
      scheduleData: [],
    };
  },
  async created() {
    const _this = this;
    setTimeout(() => {
      _this.getData();
    }, 500);
  },
  mounted() {},
  watch: {},
  methods: {
    async getData() {
      const _this = this;
      try {
        const response = await this.$axios.$get(
          `/user/movie/show/${_this.movieDetails.id}`
        );
        if (response.status) {
          await _this.$store.commit(
            "movie/SET_MOVIE_DETAILS",
            response.data.movie
          );
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
    mapLabel(value, list) {
      const keyIndex = _.findIndex([...list] || [], (o) => o.value === value);
      console.log("key", keyIndex);
      if (keyIndex > -1) {
        return list[keyIndex].label;
      } else {
        return value;
      }
    },
    formatTime(value, type) {
      return moment(value).format(type);
    },
    getDate(date) {
      return moment(date).format("DD/MM/YYYY") || "";
    },
    onSelectedDate(value) {
      console.log(value.dateFormat);
      console.log(this.movieDetails);
      const keyIndex = _.findIndex(
        [...this.movieDetails.schedule] || [],
        (o) => o.date_start === value.dateFormat
      );
      console.log(keyIndex);
      if (keyIndex > -1) {
        this.haveSchedule = true;
        this.scheduleData = _.filter(
          [...this.movieDetails.schedule] || [],
          (o) => o.date_start === value.dateFormat
        );
      } else {
        this.scheduleData = [];
      }
    },
    onBooking() {},
  },
};
</script>
<style scoped>
.movie-container {
  background: #141e27 !important;
}
.page-header {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90vh;
  min-height: 850px;
  background-size: cover;
}
.header-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(7, 24, 34, 0.8);
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(14%, rgb(199, 199, 199)),
    to(#141e27)
  );
  background-image: linear-gradient(180deg, rgb(24, 42, 58, 0) 14%, #141e27);
  color: #fff;
  /* opacity: 0.7; */
  padding-bottom: 100px;
}
.header-container {
  max-width: 1024px;
}
.header-poster-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-poster-card {
  width: 340px;
  height: 510px;
  border-radius: 10px;
  background-position: 50% 100%;
  background-size: cover;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 20%),
    8px 8px 60px -10px rgb(0 0 0 / 40%);
}
.header-poster-card-content {
  height: 510px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.name-style {
  font-family: BalooTammudu2;
  font-size: 60px;
  font-weight: 700;
}
.content-label {
  font-family: BalooTammudu2;
  font-size: 14px;
  font-weight: 400;
}
.content-title {
  font-family: BalooTammudu2;
  font-size: 16px;
  font-weight: 700;
}
.content-movie {
  max-width: 768px;
  text-align: left;
  font-family: BalooTammudu2;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #fff;
}
.content-movie-label {
  max-width: 768px;
  text-align: left;
  font-family: BalooTammudu2;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  width: 100%;
  border-bottom: 2px solid;
  margin-bottom: 24px;
}
@media screen and (max-width: 414px) {
  .page-header {
    height: auto;
  }
  .name-style {
    font-size: 49px;
  }
  .header-poster-card-content {
    height: auto;
  }
}
</style>
