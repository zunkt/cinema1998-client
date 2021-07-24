<template>
  <div class="bg-container">
    <section class="container mw-100 px-0 align-items-center">
      <div class="d-lg-flex pb-4 px-0 flex-column page-content page">
        <div class="page-header">QUY ĐỊNH THÀNH VIÊN</div>
        <div class="page-content-style">
          <div class="page-label">1.CÁCH THỨC ĐĂNG KÝ TÀI KHOẢN</div>
          <div class="page-row">
            -Khách hàng có thể đăng ký tài khoản thành viên miễn phí
            <a @click="onRegister()">tại đây</a>
          </div>
          <div class="page-row">
            -Vui lòng kiểm tra và đảm bảo thông tin cá nhân chính xác trước khi
            hoàn tất đăng ký tài khoản. Tất cả thông tin ngoại trừ mật khẩu sẽ
            không thể chỉnh sửa sau khi đăng ký.
          </div>
          <div class="page-row">
            -Nếu có nhu cầu điều chỉnh thông tin cá nhân, quý khách vui lòng gửi
            email bằng địa chỉ đã đăng ký thành viên đến
            <a>cskh@cine1998.vn</a> để được hỗ trợ.
          </div>
          <div class="page-row">
            -Tài khoản thành viên có thể sử dụng ngay sau khi đăng ký.
          </div>
          <div class="page-row page-label">
            2.QUY ĐỊNH VÀ QUYỀN LỢI VỀ CẤP BẬC THÀNH VIÊN
          </div>
          <div class="page-row">
            -Cinema 1998 xếp hạng thành viên dựa trên số lần mua vé (sau đây gọi
            là Visit) trong vòng 01 năm kể từ ngày đăng ký tài khoản
          </div>
          <div>
            <img
              class="w-100 mt-4 mb-4"
              src="https://www.bhdstar.vn/wp-content/uploads/2019/06/MEMBER01.jpg"
            />
          </div>
          <div class="page-row">
            -Cấp bậc thành viên được duy trì trong vòng 12 tháng tính từ ngày
            cập nhật cấp bậc.
          </div>
          <div class="page-row">
            -BHD Star sẽ xét lại cấp bậc thành viên sau 12 tháng dựa trên số
            Visit tích lũy được trong 12 tháng trước đó.
          </div>
          <div class="page-row page-label">3.QUY ĐỊNH VỀ ĐIỂM THƯỞNG</div>
          <div class="page-row">
            Với mỗi giao dịch phát sinh có dùng tài khoản thành viên bao gồm
            giao dịch mua vé hoặc mua bắp, nước… (trực tiếp tại rạp hoặc giao
            dịch online), khách hàng thành viên sẽ được tích luỹ được điểm
            thưởng (RP).
          </div>
          <div>
            <img
              class="w-100 mt-4 mb-4"
              src="https://www.bhdstar.vn/wp-content/uploads/2019/06/member02.jpg"
            />
          </div>
          <div class="page-row">
            Ví dụ: Với giao dịch 100,000VNĐ bạn sẽ tích lũy được:
          </div>
          <div class="page-row font-weight-bold">Hạng Star: 10</div>
          <div class="page-row font-weight-bold">RP Hạng Gold: 12.5</div>
          <div class="page-row font-weight-bold">RP Hạng Diamond: 15 RP</div>
          <div class="page-row font-weight-bold">
            Quà tặng có thể đổi được từ RP
          </div>
          <div>
            <img
              class="w-100 mt-4 mb-4"
              src="https://www.bhdstar.vn/wp-content/uploads/2019/06/MEMBER3.jpg"
            />
          </div>
          <div class="page-row">
            – Điểm thưởng sẽ không thể quy đổi thành tiền mặt hoặc chuyển nhượng
            sang cho tài khoản khác.
          </div>
          <div class="page-row">
            – Quà thưởng sau khi đã đổi sẽ không thể đổi hoặc trả.
          </div>
          <div class="page-row">
            – Khách hàng thành viên chỉ có thể đổi quà thưởng và hưởng ưu đãi
            khi xuất trình tài khoản.
          </div>
          <div class="page-row page-label">4.LƯU Ý KHÁC</div>
          <div class="page-row">
            -Khách hàng thành viên phải xuất trình tài khoản thành viên trước
            khi thanh toán tại quầy vé và đồ ăn thức uống để được tích điểm.
          </div>
          <div class="page-row">
            -Khi mua vé online trên website hoặc ứng dụng di động BHD Star, vui
            lòng đăng nhập thành viên trước khi chọn phim hoặc suất chiếu để
            được tích điểm. -BHD Star Cineplex có quyền thay đổi bất kỳ điều
            khoản nào và sẽ có thông báo chi tiết trên website, tại rạp và email
            cá nhân cho khách hàng trước ngày chính thức áp dụng thay đổi.
          </div>
          <div class="page-row">
            -Mọi thắc mắc liên quan đến tài khoản thành viên, khách hàng vui
            lòng liên hệ hotline 1900 2099 hoặc email cskh@bhdstar.vn để được hỗ
            trợ.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  data() {
    return {};
  },
  async created() {},
  watch: {},
  methods: {
    onRegister() {
      const _this = this;
      _this.$router.push(_this.localePath("/account/register"));
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
