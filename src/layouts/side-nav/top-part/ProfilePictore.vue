<template>
  <div class="hover-trigger flex items-center">
    <div
      class="relative mr-4 w-10 h-10 bg-cover rounded-full"
      :style="{
        'background-image': `url(${user.photo ? user.photo : defaultAvatar})`,
      }"
    >
      <div class="border-grey-100 hover-target absolute z-10 left-12 top-10 w-150 bg-white border rounded">
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
    <p>{{ user.name }}</p>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/images/default-avatar.png";
import { mapState } from "vuex";
export default {
  name: "Profile picture",
  data: () => ({ defaultAvatar }),
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
