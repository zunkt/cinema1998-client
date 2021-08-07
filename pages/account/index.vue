<template>
  <div class="bg-container">
    <section class="container mw-100 px-0 align-items-center">
      <div class="d-lg-flex pb-4 px-0 flex-column page-content page">
        <div class="page-header">
          {{ $t("Member").toUpperCase() }}
        </div>
        <div class="page-content-style">
          <b-row>
            <b-col md="6" cols="12">
              <div class="page-avatar">
                <img :src="imageUrl" />
              </div>
              <div class="page-avatar-action">
                <el-upload
                  action="#"
                  class="page-avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button class="btn-default">{{
                    $t("ChangeImage")
                  }}</el-button>
                </el-upload>
              </div>
            </b-col>
            <b-col md="6" cols="12">
              <div class="page-row">
                {{ $t("FullName") }}:
                <span class="page-info"> {{ accountInfo.full_name }} </span>
              </div>
              <div class="page-row">
                Email :
                <span class="page-info"> {{ accountInfo.email }} </span>
              </div>
              <div class="page-row">
                {{ $t("Phone") }}:
                <span class="page-info"> {{ accountInfo.phone }} </span>
              </div>
              <div class="page-row page-info">
                {{ $t("Hello") }} {{ accountInfo.full_name }},
              </div>
              <div class="page-row">
                {{ $t("Address") }} :
                <span class="page-info">
                  {{ accountInfo.address }}
                </span>
              </div>
              <div class="page-row">
                {{ $t("AccountDescription") }}
              </div>
              <!-- <div class="page-row">
                Ngày sinh :
                <span class="page-info"> 10/1/1998 </span>
              </div>
              <div class="page-row">
                Địa chỉ :
                <span class="page-info"> 63 Võ Văn Tần </span>
              </div>
              <div class="page-row">
                Điểm thưởng :
                <a class="page-info" @click="onExchangeGift()"> 120 </a>
              </div> -->
            </b-col>
          </b-row>
        </div>
        <div class="page-header">
          {{ $t("AccountInformation").toUpperCase() }}
        </div>
        <div class="page-content-style">
          <div class="page-row justify-content-start d-flex flex-row">
            <el-button class="btn-default" @click="onSeeDetails()"
              ><div>{{ $t("Details") }}</div>
            </el-button>
            <el-button class="btn-default" @click="onChangePassword()"
              ><div>{{ $t("ChangePassword") }}</div>
            </el-button>
            <el-button class="btn-default" @click="onLogout()"
              ><div>{{ $t("Logout") }}</div>
            </el-button>
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
      account: (state) => state.account.account,
      accountInfo: (state) => state.account.accountInfo,
    }),
  },
  data() {
    return {
      imageUrl:
        "https://i.pinimg.com/474x/38/59/b9/3859b97b40b39af061876a73583f7078.jpg",
    };
  },
  async created() {
    const _this = this;
    setTimeout(async () => {
      if (!_this.account.isLoggedIn) {
        _this.$router.push(_this.localePath("/account/login"));
      } else {
        await _this.getData();
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
      const response = await this.$axios.$get(`/user/auth/me`, {
        headers: {
          Authorization: "Bearer " + this.account.token,
        },
      });
      console.log("response :", response);
      if (response.code === 200) {
        await this.$store.commit(
          "account/SET_ACCOUNT_INFO",
          response.data.user
        );
      } else {
        this.$message.error(response.message);
      }
    },
    onExchangeGift() {
      const _this = this;
      _this.$router.push(_this.localePath("gift-exchange"));
    },
    async onSeeDetails() {
      const _this = this;
      _this.$router.push(_this.localePath("/account/update"));
    },
    onChangePassword() {
      const _this = this;
      _this.$router.push(_this.localePath("/account/change-password"));
    },
    async onLogout() {
      const _this = this;
      await this.onAlertMessageBox("success", "Đăng xuất thành công");
      await _this.$store.commit("account/SET_ACCOUNT", {
        email: "",
        token: "",
        isLoggedIn: false,
      });
      _this.$router.push(_this.localePath("/account/login"));
    },
    onAlertMessageBox(type, message) {
      const _this = this;
      _this.$message({
        message: message,
        type: type,
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log("file", file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
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
    font-family: BalooTammudu2;
  }
  &-avatar {
    border-radius: 20px;
    height: 300px;
    padding-inline: 40px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: -1px -2px 11px 4px rgba(64, 63, 66, 0.46);
    }
  }
  &-avatar-action {
    padding: 16px 40px;
  }
  &-avatar-uploader {
    width: 100%;
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
  }
  &-info {
    font-size: 16px;
    font-weight: bold;
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
</style>
