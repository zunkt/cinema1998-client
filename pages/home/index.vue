<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="d-lg-flex pb-4 px-0 flex-column align-items-center"
        style="min-height: 100vh"
      >
        <div
          style="max-width: 1440px"
          class="justify-content-center w-100 p-4 d-md-flex d-none"
        >
          <HomeNavbar />
        </div>
        <!-- <div class="d-flex justify-content-center align-items-center"></div> -->
        <div class="el-carousel-style">
          <el-carousel
            class="el-carousel-style-content"
            indicator-position="outside"
            :interval="7000"
            :height="`${heightCarousel}px`"
          >
            <el-carousel-item
              v-for="(itemCarousel, indexCarousel) in dataSlide"
              :key="`${indexCarousel} Carousel`"
              style="width: 100%; max-width: 1440px"
              class="el-carousel-style-item"
              v-bind:style="{ height: heightCarousel }"
            >
              <div
                class="slide-carousel__item"
                :style="`background-image: url(${itemCarousel.url}); background-size: cover;`"
              ></div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="text-selection">movie selection</div>
        <div class="d-flex justify-content-center w-100">
          <div class="selection-content px-2">
            <swiper
              ref="movieSelectorSwipe"
              v-bind:style="{
                width: windowWidth > 1024 ? '1010px' : windowWidth - 32 + 'px',
              }"
              :slides-per-view="4"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              slideToClickedSlide="{true}"
              :options="swiperOption"
            >
              <swiper-slide
                @click.native="openTrailer(item)"
                v-for="(item, index) in movieSelection"
                :key="index"
              >
                <el-card
                  :style="`background-image: url(${item.imgUrl}); background-size: cover;`"
                  shadow="hover"
                  class="card-selection"
                >
                </el-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="text-selection">Phim đang chiếu</div>
        <div class="d-flex justify-content-center w-100">
          <div class="selection-content px-2">
            <swiper
              v-bind:style="{
                width: windowWidth > 1024 ? '1010px' : windowWidth - 32 + 'px',
              }"
              :slides-per-view="4"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              :options="swiperOption"
            >
              <swiper-slide
                @click.native="openTrailer(item)"
                v-for="(item, index) in movieNowShowing"
                :key="index"
              >
                <el-card
                  :style="`background-image: url(${item.imgUrl}); background-size: cover;`"
                  shadow="hover"
                  class="card-selection"
                >
                </el-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="text-selection">Phim sắp chiếu</div>
        <div class="d-flex justify-content-center w-100">
          <div class="selection-content px-2">
            <swiper
              v-bind:style="{
                width: windowWidth > 1024 ? '1010px' : windowWidth - 32 + 'px',
              }"
              :slides-per-view="4"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              :options="swiperOption"
            >
              <swiper-slide
                @click.native="openTrailer(item)"
                v-for="(item, index) in movieUpComing"
                :key="`movieUpComing ${index} ${item.id}`"
              >
                <el-card
                  :style="`background-image: url(${item.imgUrl}); background-size: cover;`"
                  shadow="hover"
                  class="card-selection"
                >
                </el-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>
    <el-dialog
      :close-on-press-escape="false"
      id="popup-youtube"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :width="windowWidth < 768 ? `100%` : `80%`"
    >
      <youtube
        :video-id="youtubeId"
        :player-vars="{ autoplay: 1 }"
        @ready="ready"
        :player-width="
          windowWidth < 768 ? windowWidth : (windowWidth * 80) / 100
        "
        :player-height="windowWidth < 414 ? 366 : 480"
      ></youtube>
      <div class="btn-action">
        <el-button class="btn-booking" @click="onBooking">Đặt vé</el-button>
        <el-button class="btn-booking" @click="onSeeMovieDetail"
          >Xem chi tiết</el-button
        >
        <el-button class="btn-cancel" @click="onCloseDialog">Hủy</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import HomeNavbar from "@/components/HomeNavbar";
import { mapState } from "vuex";
import { moviesDataLocal } from "@/pages/data";
export default {
  components: {
    HomeNavbar,
  },
  computed: {
    movieSelectorSwipe() {
      return this.$refs.movieSelectorSwipe;
    },
    ...mapState({
      moviesData: (state) => state.movie.moviesData,
    }),
  },
  data() {
    return {
      dialogVisible: false,
      youtubeId: "",
      windowWidth: window.innerWidth,
      swiperOption: {
        // lazy: true,
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        // loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
        },
      },
      dataSlide: [
        {
          url: "https://wallpapercave.com/wp/wp1945912.jpg",
        },
        {
          url: "https://wallpapercave.com/wp/wp1946040.jpg",
        },
        {
          url: "https://www.bhmpics.com/download/fury_movie_poster-1920x1080.jpg",
        },
        {
          url: "https://wallpapercave.com/wp/0RQMsOD.jpg",
        },
      ],
      player: "",
      movieSelection: [],
      movieUpComing: [],
      movieNowShowing: [],
      heightCarousel: 550,
      movieDetails: {},
    };
  },
  async created() {
    const _this = this;
    _this.getCarouselHeight();
    window.addEventListener("resize", _this.onResize);
    const movieUpComingSort =
      _.orderBy([..._this.movieUpComing], ["slot"], ["asc"]) || [];
    _this.movieUpComing = movieUpComingSort;
    await _this.$store.commit("movie/SET_MOVIES_DATA", moviesDataLocal);
    this.getData();
  },
  mounted() {
    this.getData();
  },
  watch: {
    moviesData: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log("mapData", this.moviesData);
        this.movieSelection =
          _.filter([...newValue] || [], (o) => o.type == "selection") || [];
        this.movieNowShowing =
          _.filter([...newValue] || [], (o) => o.type == "showing") || [];
        this.movieUpComing =
          _.filter([...newValue] || [], (o) => o.type == "up-coming") || [];
        // this.movieSelection = newValue;
        // this.movieNowShowing = newValue;
        // this.movieUpComing = newValue;
      },
    },
  },
  methods: {
    async getData() {
      const response = await this.$axios.$get(`/user/movie/all`, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNjQuOTAuMTQxLjQ2XC9hcGlcL3VzZXJcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjI3Mzg1ODkyLCJuYmYiOjE2MjczODU4OTIsImp0aSI6Im9kMk5oZ041eHdIZmpCbmkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.g7rrzYbVIoA6YeVgalB-wrft4vfOvDP5xY6UEdNEwlE",
        },
      });
      if (response.status) {
        // await this.$store.commit(
        //   "movie/SET_MOVIES_DATA",
        //   response?.data?.movie?.data || []
        // );
      } else {
        this.$message.error(response.message);
      }
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    onResize() {
      const _this = this;
      _this.windowWidth = window.innerWidth;
      _this.getCarouselHeight();
    },
    openTrailer(item) {
      const _this = this;
      _this.youtubeId = item.ytbId;
      _this.dialogVisible = true;
      _this.movieDetails = item;
    },
    ready(event) {
      this.player = event.target;
    },
    async onBooking() {
      const _this = this;
      _this.player.stopVideo();
      _this.dialogVisible = false;
      await _this.$store.commit("movie/SET_MOVIE_DETAILS", _this.movieDetails);
      _this.$router.push(_this.localePath("/booking"));
    },
    async onSeeMovieDetail() {
      const _this = this;
      _this.player.stopVideo();
      _this.dialogVisible = false;
      console.log("====================================");
      console.log("Home", _this.movieDetails);
      console.log("====================================");
      await _this.$store.commit("movie/SET_MOVIE_DETAILS", _this.movieDetails);
      _this.$router.push(_this.localePath("/movie"));
    },
    onCloseDialog() {
      const _this = this;
      _this.player.stopVideo();
      _this.dialogVisible = false;
    },
    getCarouselHeight() {
      const _this = this;
      if (window.innerWidth > 1439) {
        _this.heightCarousel = 650;
      } else if (window.innerWidth > 1023) {
        _this.heightCarousel = 550;
      } else if (window.innerWidth > 414 && window.innerWidth < 1024) {
        _this.heightCarousel = 320;
      } else {
        _this.heightCarousel = 290;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.slide-carousel__item {
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.text-selection {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 24px;
}
.selection-content {
  max-width: 1024px;
  flex: 1;
  height: 400px;
}
.card-selection {
  height: 400px;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.card-selection:hover {
  transform: scale(1.03);
}
.button-trailer {
  background: linear-gradient(to bottom, #12151a 0%, #182a3a 100%) !important;
}
/* .button-trailer-title {
  color : '#'
} */
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

@media screen and (max-width: 760px) {
  .text-selection {
    font-size: 24px !important;
  }
  .card-selection {
    height: 290px !important;
  }
  .selection-content {
    height: 290px !important;
  }
  .el-carousel-style {
    padding-inline: 0px !important;
  }
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  .text-selection {
    font-size: 24px !important;
  }
  .card-selection {
    height: 320px !important;
  }
  .selection-content {
    height: 320px !important;
  }
}
</style>
