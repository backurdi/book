<template>
  <div class="py-5 w-3/12 bg-dark rounded">
    <!-- Top boks, profile and club selector -->
    <div class="site-nav-top">
      <!-- Top part -->
      <div class="mb-10 px-5">
        <!-- Profile picture -->
        <!-- Notification for invites -->
        <ProfilePicture></ProfilePicture>
      </div>
      <!-- Select club part -->
      <div>
        <ClubList :clubs="clubs"></ClubList>
      </div>
    </div>
    <!-- Bottom boks, books and memeber in selected club -->
    <div class="site-nav-bottom"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClubList from "./top-part/ClubList.vue";
import ProfilePicture from "./top-part/ProfilePictore.vue";
export default {
  name: "Side nav",
  components: {
    ClubList,
    ProfilePicture,
  },
  computed: {
    ...mapState("clubStore", ["clubs"]),
  },
};
</script>

<style></style>
