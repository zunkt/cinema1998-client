<template>
  <footer
    style="
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, #12151a 0%, #182a3a 100%) !important;"
    class="pb-3 py-lg-4"
  >
    <div
      class="align-items-center py-3 mb-2"
      style="
      max-width: 1440px;
      flex: 1;
      background: linear-gradient(to bottom, #12151a 0%, #182a3a 100%) !important;"
    >
      <b-container>
        <b-row>
          <b-col class="pl-4">
            <nuxt-link :to="localePath('/')">
              <div
                v-bind:style="{
                  backgroundImage:
                    'url(' + require('@/assets/images/logo_short.png') + ')'
                }"
                class="logo-style"
              />
            </nuxt-link>
          </b-col>
          <b-col cols="auto" class="text-right pl-0 pr-3">
            <p
              class="working-time mb-0 text-white"
              style="font-size: 12px; line-height: 1.4"
            >
              Thời gian làm việc: Từ T2 đến Chủ nhật <br />Từ 7h30 – 23h00
              (không nghỉ trưa)
            </p>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </footer>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.logo-style {
  width: 100px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
}
.div-icon {
  width: 37px;
  height: 37px;
  background: linear-gradient(
    205.24deg,
    #fff337 19.11%,
    #fbc743 54.27%,
    #f3a346 89.15%,
    #ee8a46 119.68%,
    #ec7b46 144.66%,
    #eb7646 161%
  );
  border-radius: 10px;
}

.h5 {
  color: #ffffff;
  font-weight: bold;
  line-height: 1.6;
}

.h6 {
  color: #ffffff;
  font-weight: 300;
}

.working-time {
  padding-left: 12px;
}

@media screen and (max-width: 375px) {
  .working-time {
    font-size: 11px !important;
  }
}
@media screen and (max-width: 320px) {
  .working-time {
    font-size: 10px !important;
  }
}
@media screen and (min-width: 992px) {
  .h5 {
    font-size: 16px;
  }

  .h6 {
    font-size: 14px;
  }
}
</style>
