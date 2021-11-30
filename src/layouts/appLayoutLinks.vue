<template>
  <div id="nav" class="p-4">
    <!--  |
    <router-link to="/about">About</router-link> |
    <router-link to="/contacts">Contacts</router-link>-->
    <div class="flex flex-1 flex-col">
      <nav class="bg-dark flex justify-between px-4 h-16 rounded">
        <!-- top bar left -->
        <ul class="flex items-center">
          <!-- add button -->
          <li class="w-9 h-12">
            <img class="mx-auto w-full h-full" src="@/assets/logo.png" alt="svelte logo" />
          </li>
        </ul>

        <!-- to bar right  -->
        <ul class="flex items-center">
          <li class="pr-6" v-if="user.role === 'Student'">
            <div class="relative" @click="showInviteDropwdown = !showInviteDropwdown">
              <UserAddIcon class="w-6 h-6 text-white duration-150"></UserAddIcon>
              <div class="absolute right-0 mt-2 w-80" v-if="showInviteDropwdown">
                <div v-if="invites.length">
                  <InviteDropdown
                    v-for="(invite, index) in invites"
                    :invite="invite"
                    :key="index"
                    @accept="answerInvite($event, true)"
                    @decline="answerInvite($event, false)"
                  ></InviteDropdown>
                </div>
                <div v-else class="bg-white">No invites</div>
              </div>
            </div>
          </li>
          <li class="pr-6">
            <router-link :to="'/' + clubs[0]?._id" class="hover:text-readee">
              <HomeIcon class="w-6 h-6 text-white duration-150"></HomeIcon>
            </router-link>
          </li>
          <li class="pr-6">
            <router-link to="/contact" class="hover:text-readee">
              <LightBulbIcon class="w-6 h-6 text-white duration-150"></LightBulbIcon>
            </router-link>
          </li>
          <li class="hidden w-10 h-10 lg:block">
            <div
              class="hover-trigger relative mx-auto w-full h-full bg-cover rounded-full"
              :style="{
                'background-image': `url(${user.photo ? user.photo : require('@/assets/images/default-avatar.png')})`,
              }"
            >
              <div class="h-12"></div>
              <div class="border-grey-100 hover-target absolute z-10 right-0 w-150 bg-white border rounded">
                <ul>
                  <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="goToProfile()">
                    <span class="font-bold">Profile</span>
                  </li>
                  <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="logOut()">
                    <span class="font-bold">Log out</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="w-10 h-10 lg:hidden">
            <div
              v-if="user"
              class="relative mx-auto w-full h-full bg-cover rounded-full"
              :style="{
                'background-image': `url(${user.photo ? user.photo : require('@/assets/images/default-avatar.png')})`,
              }"
              @click="showDropdown = !showDropdown"
              v-click-outside="clickOutsideUserSettingHandler"
            >
              <div class="h-12"></div>
              <div class="border-grey-100 absolute z-20 right-0 w-150 bg-white border rounded" v-if="showDropdown">
                <ul>
                  <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="goToProfile()">
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
</template>

<script>
import { LightBulbIcon, HomeIcon, UserAddIcon } from "@heroicons/vue/solid";
import InviteDropdown from "../components/shared/invite-dropdown/inviteDropdown.component.vue";
import vClickOutside from "click-outside-vue3";
import { mapActions, mapState } from "vuex";

export default {
  name: "AppLayoutLinks",
  components: { LightBulbIcon, HomeIcon, UserAddIcon, InviteDropdown },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapState("userStore", ["user", "invites"]),
    ...mapState("clubStore", ["clubs"]),
  },
  data: () => ({
    showDropdown: false,
    showInviteDropwdown: false,
  }),
  methods: {
    ...mapActions("userStore", ["logout", "answerInvite"]),
    logOut() {
      this.logout();
    },
    goToProfile() {
      this.$router.push("me");
    },
    answerInvite(club, accepted) {
      this.answerInvite({ accepted, club });
    },
    clickOutsideUserSettingHandler() {
      this.showDropdown = false;
    },
    clickOutsideUserInviteHandler() {
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}
</style>
