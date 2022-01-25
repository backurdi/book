<template>
  <div class="mx-auto w-11/12">
    <div class="flex flex-col w-full h-auto md:flex-row" v-if="clubs.length">
      <SideNav></SideNav>
      <div class="flex-col flex-grow mx-auto w-full md:w-7/12 lg:px-16">
        <AddPostPopUp></AddPostPopUp>
        <ClubFeed></ClubFeed>
      </div>
      <!-- <div class="w-2/12">
        <ClubSideSettings></ClubSideSettings>
      </div> -->
    </div>
    <div v-else>
      <router-link class="px-6 py-4 text-white bg-readee border-2 border-white rounded" to="/club"
        >Create club</router-link
      >
    </div>
  </div>
</template>

<script>
import SideNav from "../layouts/side-nav/side-nav.component.vue";
import ClubFeed from "../components/club-feed/clubFeed.component.vue";
import AddPostPopUp from "../components/add-post-popup/addPostPopup.component.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { SideNav, ClubFeed, AddPostPopUp },
  computed: {
    ...mapState("clubStore", ["clubs"]),
  },
};
</script>

<style></style>
