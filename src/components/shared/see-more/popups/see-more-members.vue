<template>
  <div class="flex flex-col">
    <button @click="$emit('close')" class="self-end mb-10">Close</button>
    <span class="flex items-center px-5 py-2" v-for="(member, index) in members" :key="index">
      <div
        class="mr-2 w-10 h-10 bg-cover rounded-full"
        :style="{
          'background-image': `url(${member.photo ? member.photo : require('@/assets/images/default-avatar.png')})`,
        }"
      ></div>
      <p class="text-xs">{{ member.name }}</p>
    </span>
  </div>
</template>

<script>
export default {
  name: "See more members",
  props: ["members"],
};
</script>

<style></style>
