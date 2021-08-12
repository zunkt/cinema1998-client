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
          <!-- <el-form-item prop="phone">
            <div>
              <span class="form-label">Số điện thoại*</span>
            </div>
            <el-input
              class="form-input"
              v-model="registerForm.phone"
            ></el-input>
          </el-form-item> -->
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
          <el-form-item class="btn-action">
            <el-button class="btn-booking" @click="submitForm('registerForm')"
              >Cập nhật</el-button
            >
            <el-button class="btn-cancel" @click="onCancel()">Hủy</el-button>
          </el-form-item>
        </el-form>
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
    return {
      registerForm: {
        email: "",

        // phone: "",
        fullName: "",
        birthday: "",
        identityNumber: "",
        address: "",
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

        // phone: [{ validator: validatePhone, trigger: "blur" }],

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
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  async created() {
    this.registerForm = {
      email: this.accountInfo.email,
      // phone: this.accountInfo.phone,
      fullName: this.accountInfo.full_name,
      birthday: "10/1/1998",
      identityNumber: this.accountInfo.identityNumber,
      address: this.accountInfo.address,
      password: this.accountInfo.password,
    };
  },
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async onUpdate() {
      try {
        const response = await this.$axios.$post(
          `/user/user/update`,
          {
            email: this.registerForm.email,
            name: this.registerForm.fullName,
            full_name: this.registerForm.fullName,
            // phone: this.registerForm.phone,
            address: this.registerForm.address,
            identityNumber: this.registerForm.identityNumber,
            birthday: this.registerForm.birthday,
          },
          {
            headers: {
              Authorization: "Bearer " + this.account.token,
            },
          }
        );
        if (response.status) {
          await this.onAlertMessageBox("success", this.$t("UpdateSuccess"));
          this.$router.push(this.localePath("/account"));
        } else {
          this.onAlertMessageBox(response.message || "Response message null");
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
    onCancel() {
      const _this = this;
      _this.$router.push(_this.localePath("/account"));
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
