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
            @click="inviteUsersOpen=!inviteUsersOpen"
          >
            <span class="font-bold">Invite users</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Club site settings',
    computed:{
    club(){
      return this.$store.state.activeClub;
    },
    user(){
      return this.$store.state.user
    }
  },

}
</script>

<style>

</style>