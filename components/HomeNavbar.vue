<template>
  <div
    style="flex: 1"
    v-bind:style="{
      backgroundImage:
        'url(' +
        require('@/assets/images/backgrounds/background_sub.jpg') +
        ')',
    }"
    class="navbar-background-image"
  >
    <div class="container navbar-container">
      <el-row>
        <el-col :span="8">
          <!-- <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button
                class="cinema-submenu"
                @click="goToPage('/movie?now-showing')"
                >Phim đang chiếu</el-button
              >
              <el-button
                class="cinema-submenu"
                @click="goToPage('/movie?up-coming')"
                >Phim sắp chiếu</el-button
              >
            </div>
            <div slot="reference" class="menu--title">Phim</div>
          </el-popover> -->
          <div class="menu--title" @click="goToPage('/theater')">
            {{ $t("Theater") }}
          </div>
        </el-col>
        <el-col :span="8">
          <!-- <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button
                class="cinema-submenu"
                @click="goToPage('/theater?all')"
                >Tất cả rạp</el-button
              >
              <el-button
                class="cinema-submenu"
                @click="goToPage('/theater?special')"
                >Rạp đặc biệt</el-button
              >
              <el-button
                class="cinema-submenu"
                @click="goToPage('/theater?up-coming')"
                >Rạp sắp mở</el-button
              >
            </div>
            <div slot="reference" class="menu--title">Rạp</div>
          </el-popover> -->
          <div @click="goToPage('/account')" class="menu--title">
            {{ $t("Member") }}
          </div>
        </el-col>
        <el-col :span="8">
          <!-- <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button class="cinema-submenu" @click="goToPage('/account')"
                >Tài khoản</el-button
              >
              <el-button class="cinema-submenu" @click="goToPage('/policy')"
                >Quyền lợi</el-button
              >
            </div>
            <div slot="reference" class="menu--title">Thành viên</div>
          </el-popover> -->
          <div class="menu--title" @click="goToPage('/policy')">
            {{ $t("Benefit") }}
          </div>
        </el-col>

        <!-- <el-col :span="6"> -->
        <!-- <el-popover
            id="cinema-menu"
            placement="bottom"
            width="200"
            :visible-arrow="false"
            trigger="hover"
          >
            <div>
              <el-button
                class="cinema-submenu"
                @click="goToPage('/cultureplex?online')"
                >Quầy Online</el-button
              >
              <el-button
                class="cinema-submenu"
                @click="goToPage('/cultureplex?event')"
                >Sự kiện & Vé nhóm</el-button
              >
              <el-button
                class="cinema-submenu"
                @click="goToPage('/cultureplex?gift')"
                >Thẻ quà tặng</el-button
              >
            </div>
            <div slot="reference" class="menu--title">Cultureplex</div>
          </el-popover> -->
        <!-- <div class="menu--title" @click="goToPage('/cultureplex')">
            {{ $t("GiftCard") }}
          </div> -->
        <!-- </el-col> -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToPage(value) {
      const _this = this;
      _this.$router.push(_this.localePath(value));
    },
  },
};
</script>
<style scoped>
.navbar-container {
}
.navbar-background-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: inherit;
  height: 268px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: -1px -2px 19px 4px rgba(64, 63, 66, 1);
  -moz-box-shadow: -1px -2px 19px 4px rgba(64, 63, 66, 1);
  box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
}
.menu--title {
  font-weight: bold;
  font-size: 20px !important;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  font-family: cursive;
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
