<template>
  <div id="nav" class="p-4">
    <!--  |
    <router-link to="/about">About</router-link> |
    <router-link to="/contacts">Contacts</router-link>-->
    <div class="flex flex-1 flex-col">
      <nav class="flex justify-between px-4 h-16 bg-white rounded">
        <!-- top bar left -->
        <ul class="flex items-center">
          <!-- add button -->
          <li class="w-9 h-12">
            <img class="mx-auto w-full h-full" src="@/assets/logo.png" alt="svelte logo" />
          </li>
        </ul>

        <!-- to bar right  -->
        <ul class="flex items-center">
          <li class="pr-6">
            <router-link to="/" class="hover:text-readee">
              <HomeIcon class="w-6 h-6 duration-150"></HomeIcon>
            </router-link>
          </li>
          <li class="pr-6">
            <router-link to="/contact" class="hover:text-readee">
              <LightBulbIcon class="w-6 h-6 duration-150"></LightBulbIcon>
            </router-link>
          </li>
          <li class="w-10 h-10 hidden lg:block">
            <div
              class="hover-trigger relative mx-auto w-full h-full bg-cover rounded-full"
              :style="{
                'background-image': `url(${require('@/assets/images/default-avatar.png')})`,
              }"
            >
              <div class="h-12"></div>
              <div
                class="border-grey-100 hover-target absolute right-0 w-150 bg-white border rounded"
              >
                <ul>
                  <li
                    class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer"
                    @click="logOut()"
                  >
                    <span class="font-bold">log out</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="w-10 h-10 lg:hidden">
            <div
              class="relative mx-auto w-full h-full bg-cover rounded-full"
              :style="{
                'background-image': `url(${require('@/assets/images/default-avatar.png')})`,
              }"
              @click="showDropdown = !showDropdown"
            >
              <div class="h-12"></div>
              <div
                class="border-grey-100 absolute right-0 w-150 bg-white border rounded"
                v-if="showDropdown"
              >
                <ul>
                  <li
                    class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer"
                    @click="logOut()"
                  >
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
import { LightBulbIcon, HomeIcon } from "@heroicons/vue/solid";

export default {
  name: "AppLayoutLinks",
  components: { LightBulbIcon, HomeIcon },
  data:()=>({
    showDropdown:false,
  }),
  methods: {
    logOut() {
      this.$store.dispatch("logout");
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
