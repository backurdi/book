<template>
  <!--content-->
  <div class="flex-col items-center justify-center text-center text-black bg-white">
    <!--body-->
    <TrashIcon class="mx-auto w-16 h-16 text-red-500"></TrashIcon>
    <h3 class="py-4 text-xl font-bold">Are you sure?</h3>
    <!--footer-->
    <div class="flex justify-center mt-2 p-3 text-center space-x-4">
      <button
        class="
          mb-2
          px-5
          py-2
          text-gray-600 text-sm
          font-medium
          tracking-wider
          hover:bg-gray-100
          bg-white
          border
          rounded
          hover:shadow-lg
          shadow-sm
          md:mb-0
        "
        @click="cancelClicked"
      >
        Cancel
      </button>
      <button
        class="
          mb-2
          px-5
          py-2
          text-white text-sm
          font-medium
          tracking-wider
          bg-red-500
          hover:bg-red-600
          border border-red-500
          rounded
          hover:shadow-lg
          shadow-sm
          md:mb-0
        "
        @click="deleteClicked"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/solid";
export default {
  name: "Delete modal",
  components: { TrashIcon },
  methods: {
    cancelClicked() {
      this.$emit("cancle");
    },
    deleteClicked() {
      this.$emit("delete-click");
    },
  },
};
</script>

<style></style>
