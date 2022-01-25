<template>
  <div class="nav-container w-4/12 h-0 md:h-screen">
    <div
      class="fixed transform duration-200 md:opacity-100 md:translate-x-0"
      :class="{ 'opacity-100 -translate-x-0 z-50': isNavOpen, 'opacity-0 -translate-x-full z-auto': !isNavOpen }"
    >
      <!-- Top boks, profile and club selector -->
      <div class="site-nav-top mb-10 py-5 h-1/2 text-dark bg-white rounded-lg shadow-md">
        <!-- Top part -->
        <div class="mb-5 px-5">
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
      <div class="site-nav-bottom shadow-mdrounded py-5 text-dark bg-white rounded-lg overflow-scroll">
        <div class="mb-10">
          <!-- Books in the current club -->
          <ClubBooks></ClubBooks>
        </div>
        <div>
          <ClubMembers></ClubMembers>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClubList from "./top-part/ClubList.vue";
import ProfilePicture from "./top-part/ProfilePictore.vue";
import ClubBooks from "./bottom-part/ClubBooks.vue";
import ClubMembers from "./bottom-part/ClubMembers.vue";
export default {
  name: "Side nav",
  components: {
    ClubList,
    ProfilePicture,
    ClubBooks,
    ClubMembers,
  },
  computed: {
    ...mapState("otherStore", ["isNavOpen"]),
    ...mapState("clubStore", ["clubs"]),
  },
};
</script>

<style scoped>
.site-nav-bottom {
  height: 50vh;
  width: 231px;
}
</style>
