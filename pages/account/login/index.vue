<template>
  <div class="account-container">
    <section class="container mw-100 px-0 align-items-center">
      <b-row style="max-width: 768px; width: 100%">
        <b-col cols="12" md="6">
          <div style="margin-top: 120px; padding-right: 16px">
            <div class="page-title">Quyền lợi Đăng nhập/ đăng ký</div>
            <div class="page-description">
              Đăng nhập vào Tài Khoản Cinema 1998, bạn có thể dễ dàng quản lý
              tài khoản thành viên của mình như:
              <div>- Kiểm tra và chỉnh sửa thông tin tài khoản.</div>
              <div>
                - Tra cứu điểm thưởng, tổng chi tiêu và lịch sử giao dịch.
              </div>
              <div>
                - Kiểm tra thẻ quà tặng, voucher hoặc coupon hiện có trong tài
                khoản thành viên. Mỗi tuần, các thành viên sẽ nhận được Bản tin
                điện ảnh Cinema 1998 qua email, cập nhật những tin tức mới nhất
                về phim ảnh, sự kiện và khuyến mãi. Cập nhật ngay email, điện
                thoại và địa chỉ của bạn để luôn nhận được những thông báo mới
                nhất từ Cinema 1998!
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <div
            class="d-lg-flex pb-4 px-0 flex-column align-items-center w-100"
            style="margin-top: 120px; min-height: 100vh"
          >
            <div>
              <el-form
                id="form-login"
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                status-icon
                label-width="120px"
              >
                <div class="form-input-content">
                  <el-form-item prop="email">
                    <div>
                      <span class="form-title">Email</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      v-model="loginForm.email"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="form-input-content">
                  <el-form-item prop="password">
                    <div>
                      <span class="form-title">Password</span>
                    </div>
                    <el-input
                      class="input-form-style"
                      type="password"
                      v-model="loginForm.password"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="register-text">
                  Bạn chưa có tài khoản ?
                  <a @click="onRegister()">Đăng ký ngay</a>
                </div>
                <el-form-item class="btn-action">
                  <el-button
                    class="btn-booking"
                    type="primary"
                    @click="submitForm('loginForm')"
                    >Đăng nhập</el-button
                  >
                  <el-button class="btn-cancel" @click="resetForm('loginForm')"
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
      loginForm: {
        email: "tiendang212@gmail.com",
        password: "12345678",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập Email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Email không hợp lệ",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "blur",
          },
          {
            min: 3,
            message: "Mật khẩu phải có ít nhất 4 ký tự",
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
          _this.onLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onRegister() {
      const _this = this;
      _this.$router.push(_this.localePath("/account/register"));
    },
    async onLogin() {
      const _this = this;
      await _this.$axios
        .$post(`/user/auth/login`, {
          email: _this.loginForm?.email,
          password: _this.loginForm?.password,
        })
        .then(async (response) => {
          if (response.code === 200 && response.status) {
            await _this.$store.commit("account/SET_ACCOUNT", {
              email: _this.loginForm?.email,
              token: response.data?.token,
              isLoggedIn: true,
            });
            await this.onAlertMessageBox("success", "Đăng nhập thành công");
            _this.$router.push(_this.localePath("/account"));
          } else {
            this.onAlertMessageBox("error", response.message);
          }
        })
        .catch(async (err) => {
          await _this.$store.commit("account/SET_ACCOUNT", {
            email: _this.loginForm?.email,
            token: "",
            isLoggedIn: false,
          });
          this.onAlertMessageBox("error", err?.message || err);
        });
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
