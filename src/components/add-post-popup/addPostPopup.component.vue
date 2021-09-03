<!-- This example requires Tailwind CSS v2.0+ -->
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
    <div class="bg-gray-600 text-white py-4 px-10 w-10/12 rounded-full" @click="addPostPopup()">
      <h3>Make a post</h3>
    </div>
    <div class="cursor-pointer relative" @click="showDropdown = !showDropdown" v-if="club.owner === user.id">
      <div
        class="self-center rounded-full flex items-center justify-center text-gray-600 border border-gray-600 w-12 h-12 hover:text-white hover:bg-gray-600"
      >
        <DotsVerticalIcon class="w-8 h-8"></DotsVerticalIcon>
      </div>
      <div
        class="border-grey-100 absolute right-0 w-150 bg-white border rounded top-12 z-30"
        v-if="showDropdown"
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
            @click="inviteUsersOpen=!inviteUsersOpen"
          >
            <span class="font-bold">Invite users</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Popup @closePopUp="open = false" :open="open" :buttonText="'Add post'">
    <CommentTextField class="overflow-visible" @emitBody="addPost" buttonText="Add post"></CommentTextField>
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
import CommentTextField from '@/components/shared/comment-text-field/comment-text-field.component';
import AddBook from '../add-book/addBook.component.vue';
import MultiSelectDropdown from '../shared/multiselect-dropdown/multiselectDropdown.component.vue'
import {
  DotsVerticalIcon,
} from '@heroicons/vue/solid';

export default {
  name:'Add post popup',
  components: {
    DotsVerticalIcon,
    Popup,
    CommentTextField,
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
    addPost(body) {
      this.$store.dispatch("addPost", body).then(()=>{
        this.text = "";
        this.pagesFrom = 0;
        this.pagesTo = 0;
        this.open = false;
      })
      .catch(err=>{
        this.errorMessage = err.message;
        this.displayError = true;

        setTimeout(()=>{
          this.errorMessage = '';
          this.displayError = false;
        }, 5000)
      });
    },
    addPostPopup() {
      this.open = !this.open;
    },
    inviteUsers(){
      this.$store.dispatch('inviteUsers', {invites: this.usersToInvite});
    }
  },
};
</script>
