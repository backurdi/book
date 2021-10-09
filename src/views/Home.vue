<template>
  <div class="mx-auto w-11/12">
    <div class="flex flex-col w-full h-auto md:flex-row" v-if="clubs.length">
      <ClubSideNav></ClubSideNav>
      <div class="flex-col flex-grow w-full mx-auto md:w-7/12 lg:px-16">
        <AddPostPopUp></AddPostPopUp>
        <ClubFeed></ClubFeed>
      </div>
      <div class="w-2/12">
        <ClubSideSettings></ClubSideSettings>
      </div>
    </div>
    <div v-else>
      <router-link class="border-2 border-white bg-readee rounded py-4 px-6 text-white" to="/club">Create club</router-link>
    </div>
  </div>
</template>

<script>
import ClubSideNav from "../components/club-side-nav/clubSideNav.component.vue";
import ClubSideSettings from "../components/club-side-settings/club-side-settings.component.vue";
import ClubFeed from "../components/club-feed/clubFeed.component.vue";
import AddPostPopUp from "../components/add-post-popup/addPostPopup.component.vue";

export default {
  name: "Home",
  components: { ClubSideNav, ClubSideSettings, ClubFeed, AddPostPopUp },
  computed:{
    clubs(){
      return this.$store.state.clubs;
    }
  },
};
</script>

<style></style>
