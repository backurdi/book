<template>
  <div class="home-wrapper flex mx-auto w-11/12" v-if="clubs.length">
    <SideNav></SideNav>
    <router-view />
  </div>
  <div v-else class="flex flex-col items-center mt-16">
    <h1 class="text-md w-4/6 text-center md:text-4xl">You are not part of any club yet, check if you got an invite</h1>
    <h1 class="text-md my-5 md:text-xl">Or</h1>
    <router-link class="bg-reaflect px-6 py-4 text-white border-2 border-white rounded" to="/club"
      >Create club</router-link
    >
  </div>
</template>

<script>
import SideNav from "../layouts/side-nav/side-nav.component.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "home-view",
  components: { SideNav },
  computed: {
    ...mapState("clubStore", ["clubs"]),
  },
  watch: {
    $route(to) {
      if (to.params.clubId) {
        this.selectClub(to.params.clubId);
      }
    },
  },
  methods: {
    ...mapActions("clubStore", ["selectClub"]),
  },
};
</script>

<style>
.home-wrapper {
  max-width: 1200px;
}

.home-content {
  max-width: 900px;
}
</style>
