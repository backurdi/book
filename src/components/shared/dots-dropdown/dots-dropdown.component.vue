<template>
  <div class="relative mt-2" v-click-outside="clickOutsideHandler">
    <div class="text-dark" @click="showDropdown = !showDropdown">
      <DotsVerticalIcon class="w-6 h-6 cursor-pointer" v-if="!showDropdown"></DotsVerticalIcon>
      <XIcon class="w-6 h-6 cursor-pointer" v-if="showDropdown"></XIcon>
    </div>
    <div
      class="border-grey-100 absolute z-10 right-1 top-8 w-150 text-gray-600 bg-white border rounded"
      v-if="showDropdown"
    >
      <ul>
        <li class="p-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="emitAction('update')">
          <span class="text-xs font-bold">Update {{ dropdownContext }}</span>
        </li>
        <li class="p-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="emitAction('delete')">
          <span class="text-xs font-bold">Delete {{ dropdownContext }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { DotsVerticalIcon, XIcon } from "@heroicons/vue/solid";
import vClickOutside from "click-outside-vue3";
export default {
  name: "dots-dropdown",
  props: ["commentIndex", "dropdownContext"],
  data: () => ({
    showDropdown: false,
  }),
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: { DotsVerticalIcon, XIcon },
  methods: {
    emitAction(action) {
      let argument;
      if (action === "update") {
        argument = this.commentIndex;
      }
      this.$emit(action, argument);
      this.showDropdown = false;
    },
    clickOutsideHandler() {
      this.showDropdown = false;
    },
  },
};
</script>

<style></style>
