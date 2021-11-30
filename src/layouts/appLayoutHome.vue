<template>
  <div>
    <header class="header" />
    <AppLayoutLinks class="pb-10" />
    <slot />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppLayoutLinks from "./appLayoutLinks.vue";

export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutLinks,
  },
  created() {
    if (localStorage.getItem("jwt")) {
      this.getUser();
    }
  },
  methods: {
    ...mapActions("userStore", ["getMe"]),
    getUser() {
      return this.getMe();
    },
  },
};
</script>

<style scoped></style>
