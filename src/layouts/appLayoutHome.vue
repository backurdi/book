<template>
  <div>
    <header class="header" />
    <AppLayoutLinks />
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
      this.getMe().then(() => {
        this.subscribeForNotifications();
      });
    }
  },
  methods: {
    ...mapActions("userStore", ["getMe"]),
    ...mapActions("otherStore", ["subscribeForNotifications"]),
  },
};
</script>

<style scoped></style>
