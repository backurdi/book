<template>
  <div>
    <header class="header" />
    <AppLayoutLinks class="pb-10" />
    <slot />
  </div>
</template>

<script>
import AppLayoutLinks from "./appLayoutLinks.vue";

export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutLinks,
  },
  mounted(){
    if(localStorage.getItem("jwt")){
      this.getMe();
    }
  },
  methods:{
    getMe(){
      return this.$store.dispatch('getMe');
    }
  }
};
</script>

<style scoped></style>
