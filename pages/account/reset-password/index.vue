<template>
  <div class="account-container">
    <section class="container mw-100 px-0 align-items-center">
      <b-row style="max-width: 768px; width: 100%">
        <b-col cols="12" md="12">
          <div
            class="d-lg-flex pb-4 px-0 flex-column align-items-center w-100"
            style="margin-top: 120px; min-height: 100vh"
          >
            <div class="page-title">Reset Mật Khẩu</div>
            <div>
              <el-form
                id="form-login"
                :model="changePasswordForm"
                :rules="rules"
                ref="changePasswordForm"
                status-icon
                label-width="120px"
              >
                <div class="form-input-content"></div>
                <div class="form-input-content">
                  <el-form-item prop="newPassword">
                    <div>
                      <span class="form-title">New password*</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      type="password"
                      v-model="changePasswordForm.newPassword"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="confirmPassword">
                    <div>
                      <span class="form-title">Confirm new password*</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      type="password"
                      v-model="changePasswordForm.confirmPassword"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </div>
                <el-form-item class="btn-action">
                  <el-button
                    class="btn-booking"
                    type="primary"
                    @click="submitForm('changePasswordForm')"
                    >Submit</el-button
                  >
                  <el-button class="btn-cancel" @click="onCancel()"
                    >Hủy</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </b-col>
      </b-row>
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
    }),
  },
  data() {
    return {
      changePasswordForm: {
        token: "",
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        newPassword: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {},
  mounted() {
    let that = this;
    var url = window.location;
    that.changePasswordForm.token = new URLSearchParams(url.search).get('token');
    that.changePasswordForm.email = new URLSearchParams(url.search).get('email');
  },
  watch: {},
  methods: {
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.changePasswordForm.newPassword === _this.changePasswordForm.confirmPassword)
            _this.onChangePassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      const _this = this;
      _this.$router.push(_this.localePath("/account"));
    },
    async onChangePassword() {
      const _this = this;
      try {
        const response = await _this.$axios.$post(`/user/reset-password`, {
          token: _this.changePasswordForm.token,
          email: _this.changePasswordForm.email,
          password: _this.changePasswordForm.confirmPassword,
        });
        if (response.status) {
          await this.onAlertMessageBox(
            "success",
            "Đã thay đổi Password thành công!"
          );
          _this.$router.push(_this.localePath("/account"));
        } else {
          console.log(response.message);
          this.onAlertMessageBox(
            "error",
            response.message || "Response message null"
          );
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
.account-container {
  background-color: #1c262f;
}
.input-form-style {
  width: "100%";
}

.form-input-content {
  margin: 24px 0px;
}
.form-title {
  font-weight: bold;
  color: #ffffff;
  font-size: 18px;
  font-family: BalooTammudu2;
}
.page-title {
  font-weight: bold;
  color: #ffffff;
  font-size: 24px;
  font-family: BalooTammudu2;
  border-bottom: 2px solid #ffffff;
}
.page-description {
  color: #ffffff;
  font-size: 16px;
  font-family: BalooTammudu2;
  margin-top: 12px;
}

.register-text {
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  a {
    text-decoration: none;
  }
  a:hover {
    color: #dd474f;
    cursor: pointer;
  }
}

@media screen and (min-width: 1024px) {
  .input-form-style {
    width: 300px !important;
  }
}
</style>
