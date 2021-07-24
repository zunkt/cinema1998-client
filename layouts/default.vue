<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <PageLoader v-if="isloaded" />
    <NavBar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { subtitleData, categoryData } from "@/pages/data";

export default {
  components: {
    NavBar,
    Footer,
    PageLoader,
  },
  computed: {
    ...mapState({}),
  },
  data() {
    return {
      isloaded: true,
    };
  },
  async created() {
    const _this = this;
    _this.isLoading();
    await _this.$store.commit("masterData/SET_SUBTITLE_DATA", subtitleData);
    await _this.$store.commit("masterData/SET_CATEGORY_DATA", categoryData);
  },
  mounted() {
    const _this = this;
    _this.isLoading();
    document.addEventListener("readystatechange", () => _this.isLoading());
  },
  methods: {
    isLoading() {
      const _this = this;
      console.log("readyState --->>>>>", document.readyState);
      if (document.readyState === "complete") {
        _this.isloaded = false;
      }
    },
  },
};
</script>
<style>
