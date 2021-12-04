<template>
  <div class="w-3/12 h-full invisible md:visible">
    <div class="fixed">
      <!-- Top boks, profile and club selector -->
      <div class="site-nav-top mb-10 py-5 h-1/2 bg-dark rounded">
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
      <div class="site-nav-bottom py-5 h-1/2 bg-dark rounded">
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
    ...mapState("clubStore", ["clubs"]),
  },
};
</script>

<style></style>
