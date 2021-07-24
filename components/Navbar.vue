<template>
  <div style="display: flex; justify-content: center" class="nav-container">
    <b-navbar
      style="max-width: 1440px; flex: 1"
      class="nav-bg"
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand href="/">
        <div
          v-bind:style="{
            backgroundImage:
              'url(' + require('@/assets/images/logo_short.png') + ')',
          }"
          class="logo-style"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="windowWidth < 998 || $route.name !== 'home___vi'">
          <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button class="cinema-submenu">Phim đang chiếu</el-button>
              <el-button class="cinema-submenu">Phim sắp chiếu</el-button>
            </div>
            <nuxt-link slot="reference" :to="localePath('/movie')">
              <div class="menu--title">Phim</div>
            </nuxt-link>
          </el-popover>
          <!-- <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button class="cinema-submenu">Tất cả rạp</el-button>
              <el-button class="cinema-submenu">Rạp đặc biệt</el-button>
              <el-button class="cinema-submenu">Rạp sắp mở</el-button>
            </div>
            <nuxt-link slot="reference" :to="localePath('/theater')">
              <div class="menu--title">Rạp</div>
            </nuxt-link>
          </el-popover> -->
          <nuxt-link slot="reference" :to="localePath('/theater')">
            <div class="menu--title">Rạp</div>
          </nuxt-link>
          <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <nuxt-link :to="localePath('/account')">
                <el-button class="cinema-submenu">Tài khoản</el-button>
              </nuxt-link>
              <nuxt-link :to="localePath('/policy')">
                <el-button class="cinema-submenu">Quyền lợi</el-button>
              </nuxt-link>
            </div>
            <div slot="reference" class="menu--title">Thành viên</div>
          </el-popover>
          <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button class="cinema-submenu">Quầy Online</el-button>
              <el-button class="cinema-submenu">Sự kiện & Vé nhóm</el-button>
              <el-button class="cinema-submenu">Thẻ quà tặng</el-button>
            </div>
            <nuxt-link slot="reference" :to="localePath('/cultureplex')">
              <div class="menu--title">Cultureplex</div>
            </nuxt-link>
          </el-popover>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
      </b-collapse>
      <b-navbar-nav class="ml-auto d-lg-block d-none">
        <el-dropdown :hide-on-click="true">
          <span class="language-title"> Languages </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <p class="language-item">Việt Nam</p>
            </el-dropdown-item>
            <el-dropdown-item>
              <p class="language-item">English</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      windowWidth: window.innerWidth,
    };
  },
  watch: {
    windowWidth: {
      handler() {
        const _this = this;
        // _this.textCenter(_this.sumChart);
      },
      deep: true,
    },
  },
  async created() {
    const _this = this;
    window.addEventListener("resize", _this.onResize);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onResize() {
      const _this = this;
      _this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style scoped>
.nav-container {
  background: linear-gradient(to bottom, #12151a 0%, #182a3a 100%) !important;
}
.nav-bg {
  background: linear-gradient(to bottom, #12151a 0%, #182a3a 100%) !important;
}
.logo-style {
  width: 100px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
}
.language-title {
  font-weight: bold;
  font-size: 14px !important;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  font-family: cursive;
}
.language-item {
  font-weight: bold;
  font-size: 14px !important;
  color: #fff;
  cursor: pointer;
  font-family: cursive;
}
.menu--title {
  font-weight: bold;
  font-size: 20px !important;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  font-family: cursive;
  margin-inline: 12px;
}
.cinema-submenu {
  width: 100%;
  margin: 5px 0px 5px 0px !important;
  text-align: left;
  font-weight: bold;
  background: transparent;
  color: #fff;
}
</style>
