<template>
  <div class="bg-container">
    <section class="container mw-100 px-0">
      <div
        class="
          d-lg-flex
          pb-4
          px-0
          flex-column
          align-items-center
          page-container
        "
      >
        <el-form
          class="form"
          id="form-login"
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          status-icon
          label-width="120px"
        >
          <div class="form-title">Đăng ký tài khoản cinema 1998</div>
          <el-form-item prop="email">
            <div>
              <span class="form-label">Email*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <div>
              <span class="form-label">Password*</span>
            </div>
            <el-input
              class="form-input"
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <div>
              <span class="form-label">Confirm password*</span>
            </div>
            <el-input
              class="form-input"
              type="password"
              v-model="registerForm.confirmPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="fullName">
            <div>
              <span class="form-label">Họ và tên*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.fullName"
            ></el-input>
          </el-form-item>
          <el-form-item prop="birthday">
            <div>
              <span class="form-label">Ngày sinh*</span>
            </div>
            <el-date-picker
              class="form-input"
              v-model="registerForm.birthday"
              type="date"
              placeholder="Pick a day"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="phone">
            <div>
              <span class="form-label">Số điện thoại*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="identityNumber">
            <div>
              <span class="form-label">CMND*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.identityNumber"
            ></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <div>
              <span class="form-label">Địa chỉ*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.address"
            ></el-input>
          </el-form-item>
          <div class="d-flex flex-row">
            <el-form-item
              id="checkbox-form"
              prop="confirmPolicy"
              class="d-flex"
            >
              <div>
                <el-checkbox
                  v-model="registerForm.confirmPolicy"
                  fill="#dd474f"
                ></el-checkbox>
              </div>
              <div class="form-policy">
                Tôi đã đọc,hiểu và đồng ý với các
                <a @click="onSeePolicy()">điều khoản của Cinema 1998</a>
              </div>
            </el-form-item>
          </div>
          <el-form-item class="btn-action">
            <el-button
              class="btn-booking"
              type="primary"
              @click="submitForm('registerForm')"
              >Đăng ký</el-button
            >
            <el-button class="btn-cancel" @click="resetForm('registerForm')"
              >Hủy</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  data() {
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập lại mật khẩu"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("Mật khẩu nhập lại không chính xác"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      const regexPhone = /^(03|05|07|08|09)+([0-9]{8})\b/g;
      if (value === "") {
        callback(new Error("Vui lòng nhập số điện thoại"));
      } else if (!regexPhone.test(value)) {
        callback(new Error("Số điện thoại không chính xác"));
      } else {
        callback();
      }
    };
    var validateConfirmPolicy = (rule, value, callback) => {
      if (value === false) {
        callback(new Error("Vui lòng đồng ý với điều khoản của CIN 1998"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        fullName: "",
        birthday: "",
        identityNumber: "",
        address: "",
        confirmPolicy: false,
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
        phone: [{ validator: validatePhone, trigger: "blur" }],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
        fullName: [
          {
            required: true,
            message: "Vui lòng nhập họ và tên",
            trigger: "blur",
          },
        ],
        birthday: [
          {
            required: true,
            message: "Vui lòng nhập ngày sinh",
            trigger: "blur",
          },
        ],
        identityNumber: [
          {
            required: true,
            message: "Vui lòng nhập số CMND",
            trigger: "blur",
          },
          {
            min: 8,
            max: 12,
            message: "CMND phải có độ dài tự 8 - 12 ký tự",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Vui lòng nhập địa chỉ",
            trigger: "blur",
          },
        ],
        confirmPolicy: [{ validator: validateConfirmPolicy, trigger: "blur" }],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
          _this.onRegister();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async onRegister() {
      const _this = this;
      await _this.$axios
        .$post(`/user/auth/register`, {
          email: _this.registerForm.email,
          name: _this.registerForm.fullName,
          full_name: _this.registerForm.fullName,
          phone: _this.registerForm.phone,
          password: _this.registerForm.password,
        })
        .then(async (response) => {
          console.log("response", response);
          if (response.code === 200) {
            // await _this.$store.commit("account/SET_ACCOUNT", {
            //   email: _this.loginForm?.email,
            //   token: response.data?.token,
            //   isLoggedIn: true,
            // });
            await this.onAlertMessageBox(
              "success",
              "Đăng ký thành công thành công"
            );
            _this.$router.push(_this.localePath("/account"));
          }
        })
        .catch(async (err) => {
          // await _this.$store.commit("account/SET_ACCOUNT", {
          //   email: _this.loginForm?.email,
          //   token: "",
          //   isLoggedIn: false,
          // });
          this.onAlertMessageBox("error", err?.message || err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSeePolicy() {
      const _this = this;
      _this.$router.push(_this.localePath("/policy"));
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
<style scoped>
</style>
