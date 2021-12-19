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
    <div class="px-5 py-2">
      <router-link to="/club" class="flex justify-center py-1 bg-blue-300 rounded-md">
        <p class="flex items-center text-white"><PlusIcon class="mr-2 w-4 h-4"></PlusIcon> Create club</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { PlusIcon } from "@heroicons/vue/solid";
export default {
  name: "Club list",
  props: ["clubs"],
  components: { PlusIcon },
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
