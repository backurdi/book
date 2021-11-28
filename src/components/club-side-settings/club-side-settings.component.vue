<template>
  <div class="relative" @click="showDropdown = !showDropdown" v-if="club.owner === user.id">
    <div class="border-grey-100 z-30 top-12 w-full text-white border rounded">
      <div class="current-books flex justify-between text-gray-600">
        <p class="font-bold">Books</p>
        <button><PlusCircleIcon class="w-6 h-6" @click="addBookOpen = true"></PlusCircleIcon></button>
      </div>
      <ul class="scroll mb-10 h-60 bg-gray-600 overflow-scroll">
        <li class="w-full h-16" v-for="(book, index) in books" :key="index" @click="displayBookInfo(book)">
          <span class="flex p-2" :class="{ 'bg-blue-400': index === 0 }">
            <img :src="book.image" class="mr-2 w-8" alt="" />
            <div class="flex flex-col">
              <p class="text-xs">{{ setSubStr(book.title) }}</p>
              <BookOpenIcon class="self-end w-4 h-4" v-if="index === 0"></BookOpenIcon>
            </div>
          </span>
        </li>
      </ul>

      <div class="current-books flex justify-between text-gray-600">
        <p class="font-bold">Memebers</p>
        <button><PlusCircleIcon class="w-6 h-6" @click="openInviteUsers()"></PlusCircleIcon></button>
      </div>
      <ul class="mb-10 bg-gray-600">
        <li class="w-full" v-for="(member, index) in members" :key="index">
          <span class="flex items-center p-2">
            <div
              class="mr-2 w-10 h-10 bg-cover rounded-full"
              :style="{
                'background-image': `url(${
                  member.photo ? member.photo : require('@/assets/images/default-avatar.png')
                })`,
              }"
            ></div>
            <p class="text-xs">{{ member.name }}</p>
          </span>
        </li>
      </ul>
    </div>
  </div>
  <Popup @closePopUp="bookDescriptionOpen = false" :open="bookDescriptionOpen" :buttonText="'close'">
    <BookInfo @close="bookDescriptionOpen = false"></BookInfo>
  </Popup>
  <Popup @closePopUp="addBookOpen = false" :open="addBookOpen">
    <AddBook @bookAdded="addBookOpen = false"></AddBook>
  </Popup>
  <Popup @closePopUp="inviteUsersOpen = false" :open="inviteUsersOpen">
    <MultiSelectDropdown
      :dropdownData="usersToInviteArr"
      @inviteFriendsChanged="usersToInvite = $event"
    ></MultiSelectDropdown>
    <button @click="inviteUsers">Invite</button>
  </Popup>
</template>

<script>
import Popup from "@/components/shared/popup/popup.component";
import AddBook from "../add-book/addBook.component.vue";
import BookInfo from "../book-info/book-info.component.vue";
import MultiSelectDropdown from "../shared/multiselect-dropdown/multiselectDropdown.component.vue";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/vue/solid";
export default {
  name: "Club site settings",
  data: () => ({
    addBookOpen: false,
    inviteUsersOpen: false,
    usersToInvite: [],
    showDropdown: false,
    bookDescriptionOpen: false,
  }),
  components: {
    AddBook,
    MultiSelectDropdown,
    Popup,
    PlusCircleIcon,
    BookOpenIcon,
    BookInfo,
  },
  computed: {
    club() {
      return this.$store.state.activeClub;
    },
    user() {
      return this.$store.state.user;
    },
    usersToInviteArr() {
      return this.$store.state.usersForInvite;
    },
    books() {
      return this.$store.state.books;
    },
    members() {
      return this.$store.state.activeClub.members;
    },
  },
  methods: {
    openInviteUsers() {
      this.$store.dispatch("getUsersForInvite");
      this.inviteUsersOpen = true;
    },
    inviteUsers() {
      this.$store.dispatch("inviteUsers", { invites: this.usersToInvite });
    },
    setSubStr(str) {
      let subStr = 20;

      if (str) {
        while (str?.substring(subStr - 1, subStr).trim() !== "" && str?.substring(subStr - 1, subStr) !== " ") {
          subStr++;
        }

        return str?.substring(0, subStr).trim() + "...";
      }
      return str;
    },
    async displayBookInfo(book) {
      debugger;
      await this.$store.commit("setFocusedBook", book);
      this.bookDescriptionOpen = true;
    },
  },
};
</script>

<style></style>
