<template>
  <div class="p-2 w-60 bg-white border border-gray-200 rounded">
    <p class="mb-2 border-b border-gray-200">invites</p>
    <div class="flex justify-between mb-2" v-for="(invite, index) in invites" :key="index">
      <div class="w-1/6">
        <img class="w-8 h-8 rounded-full" :src="invite.photo" :alt="invite.name + ' club profile picture'" />
      </div>
      <div class="w-4/6">
        <h4>{{ invite.name }}</h4>
      </div>
      <div class="flex justify-between w-1/6">
        <button>
          <CheckIcon class="w-4 h-4" @click="answerInvite({ club: invite._id, accepted: true })"></CheckIcon>
        </button>
        <button><XIcon class="w-4 h-4" @click="answerInvite({ club: invite._id, accepted: false })"></XIcon></button>
      </div>
    </div>
    <div v-if="!invites.length" class="mt-2">You have no invites</div>
  </div>
</template>

<script>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";
import { mapActions } from "vuex";
export default {
  name: "invite-dropdown",
  props: ["invites"],
  components: { CheckIcon, XIcon },
  methods: {
    ...mapActions("userStore", ["answerInvite"]),
  },
};
</script>

<style></style>
