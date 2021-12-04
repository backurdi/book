<template>
  <div>
    <div
      class="club-list flex items-center px-5 py-2 hover:bg-blue-400 cursor-pointer"
      v-for="(club, index) in clubs"
      :key="index"
      @click="selectClub(club._id)"
    >
      <router-link
        :to="'/' + club._id"
        class="mr-2 w-6 h-6 bg-cover rounded-full"
        :style="{
          'background-image': `url(${club.photo ? club.photo : require('@/assets/images/default-img.png')})`,
        }"
      >
      </router-link>
      <p class="text-white text-sm">{{ club.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Club list",
  props: ["clubs"],
  methods: {
    ...mapActions("clubStore", ["selectClub"]),
    goToCreateClub() {
      this.$router.push("club");
    },
  },
};
</script>

<style></style>
