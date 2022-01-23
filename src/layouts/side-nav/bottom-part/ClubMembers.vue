<template>
  <div>
    <div class="current-books flex justify-between px-5">
      <p class="font-bold">Memebers</p>
      <button><PlusCircleIcon class="w-6 h-6" @click="openInviteUsers()"></PlusCircleIcon></button>
    </div>
    <ul>
      <li class="w-full" v-for="(member, index) in club.members" :key="index">
        <span class="flex items-center px-5 py-2">
          <div
            class="mr-2 w-10 h-10 bg-cover rounded-full"
            :style="{
              'background-image': `url(${member.photo ? member.photo : require('@/assets/images/default-avatar.png')})`,
            }"
          ></div>
          <p class="text-xs">{{ member.name }}</p>
        </span>
      </li>
    </ul>
  </div>
  <Popup @closePopUp="inviteUsersOpen = false" :open="inviteUsersOpen">
    <MultiSelectDropdown
      :dropdownData="usersForInvite"
      @inviteFriendsChanged="usersToInvite = $event"
    ></MultiSelectDropdown>
    <button @click="inviteUsers">Invite</button>
  </Popup>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import MultiSelectDropdown from "@/components/shared/multiselect-dropdown/multiselectDropdown.component.vue";
import Popup from "@/components/shared/popup";
import { PlusCircleIcon } from "@heroicons/vue/solid";
export default {
  name: "Club members",
  data: () => ({
    inviteUsersOpen: false,
    usersToInvite: [],
    showDropdown: false,
  }),
  components: {
    MultiSelectDropdown,
    PlusCircleIcon,
    Popup,
  },
  computed: {
    ...mapState("userStore", ["user", "usersForInvite"]),
    ...mapState("clubStore", { club: "activeClub" }),
    ...mapState("otherStore", ["isNavOpen"]),
  },
  methods: {
    ...mapActions("userStore", ["getUsersForInvite", "inviteUsers"]),
    ...mapMutations("otherStore", ["toggleNav"]),
    async openInviteUsers() {
      await this.getUsersForInvite();
      this.toggleNavHandler();
      this.inviteUsersOpen = true;
    },
    inviteUsers() {
      this.inviteUsers({ invites: this.usersToInvite });
    },
    toggleNavHandler() {
      if (this.isNavOpen) {
        this.toggleNav();
      }
    },
  },
};
</script>

<style></style>
