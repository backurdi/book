<template>
  <div class="flex justify-between p-2 bg-white">
    <div class="w-1/6">
      <img class="w-8 h-8 rounded-full" :src="invite.photo" :alt="invite.name + ' club profile picture'" />
    </div>
    <div class="w-4/6">
      <h4>{{ invite.name }}</h4>
    </div>
    <div class="flex justify-between w-1/6">
      <button><CheckIcon class="w-4 h-4" @click="$emit('accept', invite._id)"></CheckIcon></button>
      <button><XIcon class="w-4 h-4" @click="$emit('decline', invite._id)"></XIcon></button>
    </div>
  </div>
</template>

<script>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";
export default {
  name: "invite-dropdown",
  props: ["invite"],
  components: { CheckIcon, XIcon },
};
</script>

<style></style>
