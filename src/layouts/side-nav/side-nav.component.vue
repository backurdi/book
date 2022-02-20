<template>
  <div class="nav-container flex flex-col w-0 h-full md:w-4/12">
    <div
      class="side-nav-wrapper fixed w-6/12 transform duration-200 md:w-3/12 md:opacity-100 md:translate-x-0"
      :class="{ 'opacity-100 -translate-x-0 z-50': isNavOpen, 'opacity-0 -translate-x-full z-auto': !isNavOpen }"
    >
      <!-- Top boks, profile and club selector -->
      <div class="side-nav-top mb-10 py-5 h-1/2 text-dark bg-white rounded-lg shadow-md">
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
      <div class="site-nav-bottom shadow-mdrounded py-5 h-2/5 text-dark bg-white rounded-lg overflow-scroll">
        <div class="mb-10">
          <!-- Books in the current club -->
          <ClubBooks></ClubBooks>
        </div>
        <div>
          <ClubMembers></ClubMembers>
        </div>
      </div>
      <div>
        <div
          class="color-reaflect hover:text-reaflect flex mt-3 text-white cursor-pointer md:text-black"
          @click="goToIdea()"
        >
          <LightBulbIcon class="w-6 h-6"></LightBulbIcon>
          <p class="text-lg">Ide central</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ClubList from "./top-part/ClubList.vue";
import ProfilePicture from "./top-part/ProfilePicture.vue";
import ClubBooks from "./bottom-part/ClubBooks.vue";
import ClubMembers from "./bottom-part/ClubMembers.vue";
import { LightBulbIcon } from "@heroicons/vue/solid";
export default {
  name: "side-nav",
  components: {
    ClubList,
    ProfilePicture,
    ClubBooks,
    ClubMembers,
    LightBulbIcon,
  },
  data: () => ({
    showSideNavButton: true,
  }),
  computed: {
    ...mapState("otherStore", ["isNavOpen"]),
    ...mapState("clubStore", ["clubs"]),
  },
  methods: {
    ...mapMutations("otherStore", ["toggleNav"]),
    goToIdea() {
      this.toggleNav();
      this.$router.push("/contact");
    },
  },
};
</script>

<style scoped>
.site-nav-bottom {
  max-height: 400px;
}
.side-nav-wrapper {
  max-width: 250px;
}
.nav-container {
  max-width: 300px;
}
@media only screen and (max-width: 700px) {
  .side-nav-wrapper {
    max-width: 350px;
  }
  .nav-container {
    max-width: 350px;
  }
  .site-nav-bottom {
    max-height: 250px;
  }
}
</style>
