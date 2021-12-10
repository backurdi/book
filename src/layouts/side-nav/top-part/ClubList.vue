<template>
  <div>
    <div
      class="club-list flex items-center px-5 py-2 hover:bg-blue-400 cursor-pointer"
      v-for="(club, index) in clubs"
      :key="index"
      @click="handleClick(club)"
    >
      <router-link
        :to="'/' + club._id"
        class="mr-2 w-6 h-6 bg-cover rounded-full"
        :style="{
          'background-image': `url(${club.photo ? club.photo : require('@/assets/images/default-img.png')})`,
        }"
      >
      </router-link>
      <p class="text-sm">{{ club.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Club list",
  props: ["clubs"],
  computed: {
    ...mapState("otherStore", ["isNavOpen"]),
  },
  methods: {
    ...mapActions("clubStore", ["selectClub"]),
    ...mapMutations("otherStore", ["toggleNav"]),
    goToCreateClub() {
      this.$router.push("club");
    },
    handleClick(club) {
      this.selectClub(club._id);
      this.toggleNavHandler();
    },
    toggleNavHandler() {
      if (this.isNavOpen) {
        this.toggleNav();
      }
    },
  },
};
</script>

<style></style>
