<template>
  <div>
    <div
      class="club-list flex items-center px-5 py-2 hover:bg-blue-400 cursor-pointer"
      v-for="(club, index) in clubs.slice(0, 3)"
      :key="index"
      @click="handleClick(club)"
    >
      <div
        class="mr-2 w-6 h-6 bg-cover rounded-full"
        :style="{
          'background-image': `url(${club.photo ? club.photo : clubImage})`,
        }"
      ></div>
      <p class="text-sm">{{ club.name }}</p>
    </div>
    <div v-if="clubs.length > 3">
      <see-more seeMoreType="club"></see-more>
    </div>
    <div class="px-5 py-2">
      <router-link to="/club" class="flex justify-center py-1 bg-blue-300 rounded-md">
        <p class="flex items-center text-white"><PlusIcon class="mr-2 w-4 h-4"></PlusIcon> Create club</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import clubImage from "@/assets/images/default-img.png";
import { mapMutations, mapState } from "vuex";
import { PlusIcon } from "@heroicons/vue/solid";
import SeeMore from "@/components/shared/see-more/see-more.vue";
export default {
  name: "club-list",
  props: ["clubs"],
  components: { PlusIcon, SeeMore },
  data: () => ({
    clubImage,
  }),
  computed: {
    ...mapState("otherStore", ["isNavOpen"]),
  },
  methods: {
    ...mapMutations("otherStore", ["toggleNav"]),
    goToCreateClub() {
      this.$router.push("club");
    },
    handleClick(club) {
      this.toggleNavHandler();
      this.$router.push("/" + club._id);
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
