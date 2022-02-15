<template>
  <div
    class="mobile-nav-bg fixed z-40 top-16 w-full h-full bg-black bg-opacity-30"
    @click="toggleNav"
    :class="{ hidden: !isNavOpen }"
  ></div>
  <div id="nav" class="relative z-50 mb-5 h-16 bg-primary-light">
    <div class="nav-container fixed w-full">
      <div class="flex flex-1 flex-col">
        <nav class="flex justify-between px-4 h-16 bg-dark rounded-b">
          <!-- top bar left -->
          <ul class="flex items-center">
            <!-- add button -->
            <li class="w-9 h-12">
              <img class="mx-auto w-full h-full" src="@/assets/logo.png" alt="Reaflect logo" />
            </li>
            <li class="ml-4 cursor-pointer md:hidden" v-if="hasSiteNav">
              <XIcon v-if="isNavOpen" class="w-8 h-8 text-white" @click="toggleNav"></XIcon>
              <MenuIcon v-else class="w-8 h-8 text-white" @click="toggleNav()"></MenuIcon>
            </li>
          </ul>

          <!-- to bar right  -->
          <ul class="flex items-center">
            <li class="pr-6" v-if="user.role === 'Student'">
              <div class="md:relative">
                <div class="relative p-3 hover:bg-gray-600 rounded-full cursor-pointer" @click="notificationClicked()">
                  <div
                    class="absolute right-3 top-3 w-2 h-2 bg-red-600 rounded-full"
                    v-if="isUnreadNotifications()"
                  ></div>
                  <BellIcon class="w-6 h-6 text-white duration-150"></BellIcon>
                </div>
                <div class="absolute right-0 mt-4 w-full md:w-80" v-if="showNotificationDropwdown">
                  <div>
                    <notification-dropdown
                      :invites="invites"
                      :notifications="notifications"
                      :notificationCount="notificationCount"
                      @showMoreNotifications="getNotifications(++notificationPage)"
                      @hideNotifications="showNotificationDropwdown = false"
                    ></notification-dropdown>
                  </div>
                </div>
              </div>
            </li>
            <li class="pr-6">
              <router-link :to="'/' + clubs[0]?._id">
                <div class="p-3 hover:bg-gray-600 rounded-full">
                  <HomeIcon class="w-6 h-6 text-white duration-150"></HomeIcon>
                </div>
              </router-link>
            </li>
            <li class="flex items-center justify-center w-10 h-10 text-dark">
              <div
                class="p-3 text-white hover:bg-gray-600 rounded-full cursor-pointer"
                @click="clickHandler"
                v-click-outside="clickOutsideUserSettingHandler"
              >
                <ChevronDownIcon class="w-6 h-6"></ChevronDownIcon>
                <div
                  class="border-grey-200 absolute z-20 right-8 mt-4 w-150 bg-white border rounded"
                  v-if="showDropdown"
                >
                  <ul class="text-black">
                    <li
                      class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer"
                      @click="goToProfile()"
                    >
                      <span class="font-bold">Profile</span>
                    </li>
                    <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="logOut()">
                      <span class="font-bold">log out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon, BellIcon, MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import vClickOutside from "click-outside-vue3";
import { mapActions, mapState, mapMutations } from "vuex";
import defaultAvatar from "@/assets/images/default-avatar.png";
import NotificationDropdown from "../components/shared/notification-dropdown.vue";

export default {
  name: "AppLayoutLinks",
  components: { HomeIcon, BellIcon, NotificationDropdown, MenuIcon, XIcon, ChevronDownIcon },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapState("userStore", ["user", "invites"]),
    ...mapState("clubStore", ["clubs"]),
    ...mapState("otherStore", ["isNavOpen", "hasSiteNav", "notifications", "socket", "notificationCount"]),
  },
  watch: {
    user(user) {
      this.socket?.on(`notification ${user.id}`, (notification) => {
        this.setNotifications(notification);
      });
    },
  },
  mounted() {
    this.getNotifications(this.notificationPage);
  },
  data: () => ({
    showDropdown: false,
    showNotificationDropwdown: false,
    defaultAvatar,
    notificationPage: 1,
  }),
  methods: {
    ...mapMutations("otherStore", ["toggleNav", "setNotifications"]),
    ...mapActions("userStore", ["logout", "answerInvite"]),
    ...mapActions("otherStore", ["setNotificationRead", "getNotifications"]),
    logOut() {
      this.logout();
    },
    goToProfile() {
      this.$router.push({ path: "/me" });
    },
    clickHandler() {
      this.showDropdown = !this.showDropdown;
    },
    notificationClicked() {
      this.showNotificationDropwdown = !this.showNotificationDropwdown;
      this.notifications.forEach((notification) => {
        if (!notification.read) {
          this.setNotificationRead(notification._id);
        }
      });
    },
    isUnreadNotifications() {
      return !!this.notifications.find((notification) => !notification?.read);
    },
    clickOutsideUserSettingHandler() {
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
/* .nav-container {
  width: calc(100% - 2rem);
} */

.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}
</style>
