<template>
  <div class="top-5 flex flex-row self-start mb-10 mr-10 p-5 bg-gray-600 rounded md:sticky md:flex-col md:h-70-screen">
    <div class="flex" v-for="(club, index) in clubs" :key="index" @click="selectClub(club._id)">
      <router-link
        :to="'/' + club._id"
        class="hover-trigger relative mx-auto w-12 h-12 bg-cover rounded-full md:mb-5"
        :style="{
          'background-image': `url(${club.photo ? club.photo : require('@/assets/images/default-img.png')})`,
        }"
      >
        <p class="hover-target p-2 text-gray-600 bg-white rounded">{{ club.name }}</p>
      </router-link>
    </div>
    <div class="flex cursor-pointer" @click="goToCreateClub">
      <div class="hover-trigger relative flex w-12 h-12 bg-cover md:mb-5">
        <div class="absolute flex items-center justify-center w-full h-full bg-white rounded-full">
          <PlusIcon class="w-8 h-8"></PlusIcon>
        </div>
        <p class="hover-target p-2 text-gray-600 bg-white rounded">Create new club</p>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/solid";
export default {
  name: "ClubSideComponent",
  components: { PlusIcon },
  computed: {
    clubs() {
      return this.$store.state.clubs;
    },
  },
  methods: {
    selectClub(clubId) {
      this.$store.dispatch("selectClub", clubId);
    },
    goToCreateClub() {
      this.$router.push("club");
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link-active {
  border: 3px solid rgb(12, 111, 204);
}

.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}

.hover-target {
  margin-left: 130%;
  white-space: nowrap;
  width: fit-content;

  &:before {
    content: "\A";
    border-style: solid;
    border-width: 10px 15px 10px 0;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: 50px;
  }
}
</style>
