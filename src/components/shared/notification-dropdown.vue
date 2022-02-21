<template>
  <div
    class="notification-wrapper px-2 w-full bg-white border border-gray-200 rounded overflow-scroll"
    :class="{ 'h-70-screen': notifications.length > 7 }"
  >
    <div class="club-invite-wrapper py-2">
      <p class="mb-2 pl-2 w-fit-content text-dark text-xs font-bold border-b-2 border-reaflect">invites</p>
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
      <p class="mb-2 pl-2 w-fit-content text-dark text-xs font-bold border-b-2 border-reaflect">Notifications</p>
      <div
        v-for="notification in notifications"
        :key="notification._id"
        @click="goToNotification(notification)"
        class="group flex items-center mb-2 px-2 py-1 hover:bg-blue-100 rounded-lg cursor-pointer"
        :class="{
          'border-2': notification.isAssignment,
          'border-red-500': !notification.isAssignmentDone,
          'border-green-500': notification.isAssignmentDone,
        }"
      >
        <div class="notification-image mr-2 w-1/6">
          <img
            class="w-12 h-12 border-2 border-white rounded-full"
            :src="notification.createdBy?.photo ? notification.createdBy?.photo : defaultAvatar"
          />
        </div>
        <div>
          <p class="w-11/12 text-sm">
            {{ notification.createdBy?.name }} {{ notification.type === "post" ? postText : commentText }}
          </p>
          <p class="text-gray-500 text-xs">{{ postDateFormat(notification.createdAt) }}</p>
        </div>
        <div class="w-8" v-if="notification.isAssignment">
          <ExclamationIcon class="w-6 h-6 text-red-500" v-if="!notification.isAssignmentDone"></ExclamationIcon>
          <BadgeCheckIcon class="w-6 h-6 text-green-500" v-else></BadgeCheckIcon>
        </div>
        <div class="w-8" v-else>
          <div class="circle mr-2 bg-blue-500 rounded-full" v-if="!notification.read"></div>
          <div v-else></div>
        </div>
      </div>
      <div class="flex justify-center mb-2" @click="showMoreNotifications()">
        <button v-if="notificationCount > notifications.length">Show more</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon, XIcon, ExclamationIcon, BadgeCheckIcon } from "@heroicons/vue/solid";
import { mapActions, mapMutations } from "vuex";
import defaultAvatar from "@/assets/images/default-avatar.png";
import { postDateFormat } from "@/utils/helpers/date-format.js";
export default {
  name: "invite-dropdown",
  props: ["invites", "notifications", "notificationCount"],
  components: { CheckIcon, XIcon, ExclamationIcon, BadgeCheckIcon },
  data: () => ({
    defaultAvatar,
    postText: "has made a new post in a club you are part of",
    commentText: "has commented on a post that you are following",
  }),
  methods: {
    ...mapMutations("postStore", ["incrementPostCount", "resetPostPage"]),
    ...mapActions("userStore", ["answerInvite"]),
    ...mapActions("postStore", ["getPostsForClub"]),
    postDateFormat,
    showMoreNotifications() {
      this.$emit("showMoreNotifications");
    },
    goToNotification(notification) {
      this.incrementPostCount();
      this.resetPostPage();
      this.getPostsForClub(notification.club);
      this.$emit("hideNotifications");
      if (notification.type === "post") {
        this.$router.push(`/${notification?.club}`);
      } else {
        this.$router.push(`/${notification?.club}/post/${notification?.post}`);
      }
    },
  },
};
</script>

<style scoped>
.circle {
  width: 10px;
  height: 10px;
}

.notification-image {
  min-width: 50px;
}
</style>
