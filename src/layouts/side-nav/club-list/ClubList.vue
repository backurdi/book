<template>
  <div>
    <div class="club-list flex" v-for="(club, index) in clubs" :key="index" @click="selectClub(club._id)">
      <router-link
        :to="'/' + club._id"
        class="relative mx-auto w-12 h-12 bg-cover rounded-full md:mb-5"
        :style="{
          'background-image': `url(${club.photo ? club.photo : require('@/assets/images/default-img.png')})`,
        }"
      >
        <p class="p-2 text-gray-600 bg-white rounded">{{ club.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Club list",
  props: ["club"],
};
</script>

<style></style>
