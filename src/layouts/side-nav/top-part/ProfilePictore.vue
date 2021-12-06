<template>
  <div class="hover-trigger lg:block">
    <div
      class="relative w-10 h-10 bg-cover rounded-full"
      :style="{
        'background-image': `url(${user.photo ? user.photo : require('@/assets/images/default-avatar.png')})`,
      }"
    >
      <div class="border-grey-100 hover-target absolute z-10 left-12 top-0 w-150 bg-white border rounded">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile picture",
  computed: {
    ...mapState("userStore", ["user"]),
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
