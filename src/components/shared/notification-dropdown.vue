<template>
  <div class="notification-wrapper w-80 bg-white border border-gray-200 rounded">
    <div class="club-invite-wrapper py-2">
      <p class="mb-2 pl-2 w-fit-content text-dark text-xs font-bold border-b-2 border-readee">invites</p>
      <div class="flex justify-between mb-2 p-2" v-for="(invite, index) in invites" :key="index">
        <div class="w-1/6">
          <img class="w-8 h-8 rounded-full" :src="invite.photo" :alt="invite.name + ' club profile picture'" />
        </div>
        <div class="w-4/6 text-sm">
          <h4>{{ invite.name }}</h4>
        </div>
        <div class="flex justify-between w-1/6">
          <button>
            <CheckIcon class="w-4 h-4" @click="answerInvite({ club: invite._id, accepted: true })"></CheckIcon>
          </button>
          <button><XIcon class="w-4 h-4" @click="answerInvite({ club: invite._id, accepted: false })"></XIcon></button>
        </div>
      </div>
      <div v-if="!invites.length" class="mt-2 pl-2 text-sm">You have no invites</div>
    </div>
    <div class="activity-notification-wrapper">
      <p class="mb-2 pl-2 w-fit-content text-dark text-xs font-bold border-b-2 border-readee">Notifications</p>
      <div
        v-for="notification in notifications"
        :key="notification._id"
        @click="goToNotification(notification)"
        class="flex items-center px-2 py-1 hover:text-white hover:bg-blue-400 cursor-pointer"
        :class="{ 'bg-blue-100': !notification.read }"
      >
        <div class="circle mr-2 bg-blue-500 rounded-full" v-if="!notification.read"></div>
        <div class="mr-2 w-1/6">
          <img
            class="w-8 h-8 rounded-full"
            :src="notification.createdBy?.photo ? notification.createdBy?.photo : defaultAvatar"
          />
        </div>
        <p class="text-sm">{{ notification.createdBy?.name }} has commented on a post that you are following</p>
      </div>
      <button v-if="notificationCount > notifications.length" @click="showMoreNotifications()">Show more</button>
    </div>
  </div>
</template>

<script>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";
import { mapActions } from "vuex";
import defaultAvatar from "@/assets/images/default-avatar.png";
export default {
  name: "invite-dropdown",
  props: ["invites", "notifications", "notificationCount"],
  components: { CheckIcon, XIcon },
  data: () => ({
    defaultAvatar,
  }),
  methods: {
    ...mapActions("userStore", ["answerInvite"]),
    showMoreNotifications() {
      this.$emit("showMoreNotifications");
    },
    goToNotification(notification) {
      this.$router.push(`/${notification.post?.club}/post/${notification.post?._id}`);
      this.$emit("hideNotifications");
    },
  },
};
</script>

<style scoped>
.circle {
  width: 8px;
  height: 5px;
}
</style>
