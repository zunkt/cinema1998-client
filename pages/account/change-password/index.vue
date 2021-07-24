<template>
  <div class="account-container">
    <section class="container mw-100 px-0 align-items-center">
      <b-row style="max-width: 768px; width: 100%">
        <b-col cols="12" md="12">
          <div
            class="d-lg-flex pb-4 px-0 flex-column align-items-center w-100"
            style="margin-top: 120px; min-height: 100vh"
          >
            <div class="page-title">Đổi mật khẩu</div>
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
                  <el-form-item prop="password">
                    <div>
                      <span class="form-title">Password</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      type="password"
                      v-model="changePasswordForm.password"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
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
                <div class="register-text">
                  <a @click="onForgotPassword()">Quên mặt khẩu</a>
                </div>
                <el-form-item class="btn-action">
                  <el-button
                    class="btn-booking"
                    type="primary"
                    @click="submitForm('changePasswordForm')"
                    >Đổi mặt khẩu</el-button
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
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập lại mật khẩu"));
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error("Mật khẩu nhập lại không chính xác"));
      } else {
        callback();
      }
    };
    return {
      changePasswordForm: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
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
  watch: {},
  methods: {
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
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
    onForgotPassword() {
      const _this = this;
      _this.$router.push(_this.localePath("/account/forgot-password"));
    },
    onChangePassword() {
      const _this = this;
      _this.$router.push(_this.localePath("/account"));
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
