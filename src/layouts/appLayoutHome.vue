<template>
  <div>
    <header class="header" />
    <AppLayoutLinks />
    <slot />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppLayoutLinks from "./appLayoutLinks.vue";

export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutLinks,
  },
  async mounted() {
    if (localStorage.getItem("jwt")) {
      this.getMe().then(() => {
        this.subscribeForNotifications();
      });
    }
    await this.initiateSocket();
  },
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("userStore", ["getMe"]),
    ...mapActions("otherStore", ["subscribeForNotifications", "initiateSocket"]),
  },
};
</script>

<style scoped></style>
