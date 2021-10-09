<template>
  <div class="cursor-pointer relative" @click="showDropdown = !showDropdown" v-if="club.owner === user.id">
      <div
        class="border-grey-100 w-full bg-gray-600 border rounded top-12 z-30 text-white"
      >
        <ul>
          <li
            class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer"
            @click="addBookOpen=!addBookOpen"
          >
            <span class="font-bold">Add book</span>
          </li>
          <li
            class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer"
            @click="openInviteUsers()"
          >
            <span class="font-bold">Invite users</span>
          </li>
        </ul>
      </div>
    </div>
    <Popup @closePopUp="addBookOpen = false" :open="addBookOpen" :buttonText="'Add post'">
    <AddBook></AddBook>
  </Popup>
  <Popup @closePopUp="inviteUsersOpen = false" :open="inviteUsersOpen" :buttonText="'Add post'">
    <MultiSelectDropdown :dropdownData="usersToInviteArr" @inviteFriendsChanged="usersToInvite = $event"></MultiSelectDropdown>
    <button @click="inviteUsers">Invite</button>
  </Popup>
</template>

<script>
import Popup from '@/components/shared/popup/popup.component';
import AddBook from '../add-book/addBook.component.vue';
import MultiSelectDropdown from '../shared/multiselect-dropdown/multiselectDropdown.component.vue'
export default {
    name: 'Club site settings',
    data:()=>({
        addBookOpen:false,
        inviteUsersOpen:false,
        usersToInvite:[],
        showDropdown: false,
    }),
    components:{
    AddBook,
    MultiSelectDropdown,
    Popup
  },
    computed:{
    club(){
      return this.$store.state.activeClub;
    },
    user(){
      return this.$store.state.user
    },
    usersToInviteArr(){
      return this.$store.state.usersForInvite
    },
  },
  methods:{
      openInviteUsers(){
          this.$store.dispatch('getUsersForInvite');
          this.inviteUsersOpen = true;
      },
      inviteUsers(){
      this.$store.dispatch('inviteUsers', {invites: this.usersToInvite});
    },
  }

}
</script>

<style>

</style>