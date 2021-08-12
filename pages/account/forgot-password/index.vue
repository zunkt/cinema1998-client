<template>
  <div class="account-container">
    <section class="container mw-100 px-0 align-items-center">
      <b-row style="max-width: 768px; width: 100%">
        <b-col cols="12" md="12">
          <div
            class="d-lg-flex pb-4 px-0 flex-column align-items-center w-100"
            style="margin-top: 120px; min-height: 100vh"
          >
            <div class="page-title">{{ $t("ForgotPassword") }}</div>
            <div class="page-description">
              {{ $t("ForgotPasswordDescription") }}
            </div>
            <div>
              <el-form
                id="form-login"
                :model="requestEmailForm"
                :rules="rules"
                ref="requestEmailForm"
                status-icon
                label-width="120px"
              >
                <div class="form-input-content"></div>
                <div class="form-input-content">
                  <el-form-item prop="email">
                    <div>
                      <span class="form-title">Email</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      type="email"
                      v-model="requestEmailForm.email"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </div>
                <el-form-item class="btn-action">
                  <el-button
                    class="btn-booking"
                    type="primary"
                    @click="submitForm('requestEmailForm')"
                    >{{ $t("SendRequest") }}</el-button
                  >
                  <el-button class="btn-cancel" @click="onCancel()">{{
                    $t("Cancel")
                  }}</el-button>
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
      requestEmailForm: {
        email: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: this.$t("Errors.EmailRequired"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.$t("Errors.Invalid"),
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  async created() {},
  watch: {},
  methods: {
    submitForm(formName) {
      console.log(formName);
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.onForgotPassword();
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
    onRequest() {
      const _this = this;
      _this.$router.push(_this.localePath("/account"));
    },
    async onForgotPassword() {
      const _this = this;
      try {
        const response = await _this.$axios.$post(
          `/user/auth/forgot-password`,
          {
            email: _this.requestEmailForm.email,
          }
        );
        if (response.status) {
          await this.onAlertMessageBox(
            "success",
            response.message || this.$t("PleaseCheckYourMail")
          );
          setTimeout(() => {
            _this.$router.push(_this.localePath("/account"));
          }, 1000);
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
