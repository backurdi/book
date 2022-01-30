<template>
  <div class="h15 flex flex-col items-center mb-4 w-full">
    <div class="w-full">
      <div class="relative flex flex-col items-center">
        <div class="svelte-1l8159u w-full">
          <div class="svelte-1l8159u flex p-1 h-full bg-white border border-gray-200 rounded">
            <div class="flex flex-auto flex-wrap">
              <div
                class="
                  text-teal-700
                  flex
                  items-center
                  justify-center
                  m-1
                  px-2
                  py-1
                  font-medium
                  bg-green-100
                  border border-green-300
                  rounded-full
                "
                v-for="(friend, index) in selectedFriends"
                :key="index"
              >
                <div class="flex-initial max-w-full text-xs font-normal leading-none">{{ friend.name }}</div>
                <div class="flex flex-auto flex-row-reverse">
                  <XIcon class="ml-2 w-3 h-3 cursor-pointer" @click="removeSelectedFriend(friend)"></XIcon>
                </div>
              </div>
              <div class="flex-1">
                <input
                  :placeholder="selectedFriends.length ? '' : 'Invite people to join the club'"
                  @keyup="onShowDropdown(true)"
                  v-model="friendsSearchInput"
                  class="p-1 px-2 w-full h-full text-gray-800 bg-transparent outline-none appearance-none"
                />
              </div>
            </div>
            <div
              class="
                svelte-1l8159u
                flex
                items-center
                pl-2
                pr-1
                py-1
                w-8
                text-gray-300
                border-l border-gray-200
                cursor-pointer
              "
            >
              <ChevronDownIcon v-if="!showDropdown" @click="onShowDropdown(false)"></ChevronDownIcon>
              <ChevronUpIcon v-if="showDropdown" @click="showDropdown = false"></ChevronUpIcon>
            </div>
          </div>
        </div>
        <div
          class="top-100 lef-0 max-h-select svelte-5uyqqj absolute z-40 w-full bg-white rounded shadow overflow-y-auto"
          v-if="showDropdown"
        >
          <div class="flex flex-col w-full">
            <div
              class="w-full hover:text-white hover:bg-green-400 border-b border-gray-100 rounded-t cursor-pointer"
              v-for="(friend, index) in friendsList"
              :key="index"
              @click="selectFriend(friend)"
            >
              <div
                class="hover:border-teal-100 relative flex items-center p-2 pl-2 w-full border-l-2 border-transparent"
              >
                <div class="flex items-center w-full">
                  <div class="mx-2 leading-6">{{ friend.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
export default {
  name: "multiselect-dropdown",
  props: ["dropdownData"],
  components: {
    XIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },
  data: () => ({
    friendsList: [],
    selectedFriends: [],
    showDropdown: false,
    friendsSearchInput: "",
  }),
  methods: {
    onShowDropdown(filterList) {
      this.friendsList = [...this.dropdownData];
      if (filterList && this.friendsSearchInput.length) {
        setTimeout(() => {
          this.friendsList = this.friendsList.filter((friend) => friend.name.trim().includes(this.friendsSearchInput));
        }, 500);
      }
      this.showDropdown = !!this.friendsList.length;
    },
    selectFriend(friend) {
      const selectedFriend = this.selectedFriends.find((selectedFriend) => selectedFriend === friend);
      if (!selectedFriend) {
        this.selectedFriends.push(friend);
      } else {
        this.removeSelectedFriend(friend);
      }
      this.friendsSearchInput = "";

      this.$emit("inviteFriendsChanged", this.selectedFriends);
    },
    removeSelectedFriend(friend) {
      const selectedFriend = this.selectedFriends.find((selectedFriend) => selectedFriend === friend);
      this.selectedFriends.splice(this.selectedFriends.indexOf(selectedFriend), 1);
    },
  },
};
</script>

<style>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
