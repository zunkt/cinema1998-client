<template>
  <div>
  </div>
</template>
<script>
  export default {
    fetch({ redirect }) {
      return redirect("/home");
    },
    methods:{
      openNewTab(){
        window.open('','_blank');
      },
    }
  };
</script>
<style scoped>
</style>
