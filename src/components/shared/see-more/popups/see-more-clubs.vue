<template>
  <div class="flex flex-col">
    <button @click="$emit('close')" class="self-end mb-10">Close</button>
    <router-link :to="'/' + club._id" class="flex items-center px-5 py-2" v-for="(club, index) in clubs" :key="index">
      <div
        class="mr-2 w-10 h-10 bg-cover rounded-full"
        :style="{
          'background-image': `url(${club.photo ? club.photo : clubImage})`,
        }"
      ></div>
      <p class="text-xs">{{ club.name }}</p>
    </router-link>
  </div>
</template>

<script>
import clubImage from "@/assets/images/default-img.png";
export default {
  name: "see-more-clubs",
  props: ["clubs"],
  data: () => ({
    clubImage,
  }),
};
</script>

<style></style>
