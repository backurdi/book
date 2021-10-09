<template>
  <div
    class="px-12 text-white bg-red-400 rounded duration-300"
    :class="{ 'h-0 mb-0': !displayError, 'h-full py-2 mb-10': displayError }"
  >
    <p
      class="font-bold"
      :class="{ visible: displayError, invisible: !displayError }"
    >{{errorMessage}}</p>
  </div>
  <div class="flex justify-between mb-5">
    <div class="bg-gray-600 text-white py-4 px-10 w-full rounded-full" @click="addPostPopup()">
      <h3>Make a post</h3>
    </div>
  </div>
  <Popup @closePopUp="open = false" :open="open" :buttonText="'Add post'">
    <h3 class="text-black text-3xl font-bold mb-5">Create post</h3>
    <TextField></TextField>
  </Popup>
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
// import CommentTextField from '@/components/shared/comment-text-field/comment-text-field.component';
import TextField from '@/components/shared/text-field/text-field.component'
import AddBook from '../add-book/addBook.component.vue';
import MultiSelectDropdown from '../shared/multiselect-dropdown/multiselectDropdown.component.vue'

export default {
  name:'Add post popup',
  components: {
    Popup,
    // CommentTextField,
    TextField,
    AddBook,
    MultiSelectDropdown
  },
  data: () => ({
    searchText: "",
    booksData: [],
    open: false,
    addBookOpen:false,
    inviteUsersOpen:false,
    errorMessage: '',
    displayError: false,
    showDropdown: false,
    usersToInvite:[]
  }),
  computed:{
    usersToInviteArr(){
      return this.$store.state.usersForInvite
    },
    club(){
      return this.$store.state.activeClub
    },
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    addPostPopup() {
      this.open = !this.open;
    },
    inviteUsers(){
      this.$store.dispatch('inviteUsers', {invites: this.usersToInvite});
    }
  },
};
</script>
<style lang="scss" scoped>
.create-post-title{

}
</style>
