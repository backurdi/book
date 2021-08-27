<template>
  <div class="mx-auto w-5/6">
    <div class="flex w-full h-auto" v-if="clubs.length">
      <ClubSideComponent></ClubSideComponent>
      <div class="flex-col flex-grow">
        <AddPostPopUp></AddPostPopUp>
        <ClubFeed></ClubFeed>
      </div>
    </div>
    <div v-else>
      No clubs !
    </div>
  </div>
</template>

<script>
import ClubSideComponent from "../components/club-side-nav/clubSideNav.component.vue";
import ClubFeed from "../components/club-feed/clubFeed.component.vue";
import AddPostPopUp from "../components/add-post-popup/addPostPopup.component.vue";

export default {
  name: "Home",
  components: { ClubSideComponent, ClubFeed, AddPostPopUp },
  computed:{
    clubs(){
      return this.$store.state.clubs;
    }
  }
};
</script>

<style></style>
