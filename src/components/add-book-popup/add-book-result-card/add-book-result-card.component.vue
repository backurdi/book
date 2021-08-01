<template>
  <div
    v-for="(data, index) in cardData"
    :key="index"
    class="
      flex
      p-4
      w-full
      max-w-sm
      leading-normal
      bg-white
      border-b border-l border-r border-gray-400
      rounded-b
      lg:flex
      lg:max-w-full
      lg:border-l-0
      lg:border-t
      lg:border-gray-400
      lg:rounded-b-none
      lg:rounded-r
    "
  >
    <img
      v-if="data.volumeInfo.imageLinks"
      class="mr-7 h-150 rounded"
      :src="data.volumeInfo.imageLinks.thumbnail"
      alt="book cover"
    />
    <img
      v-else
      class="mr-7 h-150 rounded"
      src="../../../assets/images/default-img.png"
    />
    <div class="w-full">
      <div class="mb-8">
        <div class="mb-2 text-gray-900 text-xl font-bold">
          {{ data.volumeInfo.title }}
        </div>
        <p class="text-gray-700 text-base">{{ data.volumeInfo.description }}</p>
      </div>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm">
          <p
            v-for="(author, index) in data.volumeInfo.authors"
            :key="index"
            class="text-gray-900 leading-none"
          >
            {{ author }}
          </p>
          <p class="text-gray-600">{{ data.volumeInfo.publishedDate }}</p>
        </div>

        <button
          class="
            px-2
            py-2
            text-blue-500
            hover:text-white
            font-bold
            hover:bg-blue-700
            border border-blue-500
            rounded
          "
          @click="addBook(data.volumeInfo)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add book result card",
  props: ["cardData"],
  methods: {
    addBook(bookData) {
      this.$emit("addBook", bookData);
    },
  },
};
</script>

<style></style>
