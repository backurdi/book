<template>
  <div
    class="
      border-r border-b border-l border-gray-400
      lg:border-l-0 lg:border-t lg:border-gray-400
      bg-white
      rounded-b
      lg:rounded-b-none lg:rounded-r
      p-4
      flex
      leading-normal
      max-w-sm
      w-full
      lg:max-w-full lg:flex
    "
    v-for="(data, index) in cardData"
    :key="index"
  >
    <img
      v-if="data.volumeInfo.imageLinks"
      class="rounded h-150 mr-7"
      :src="data.volumeInfo.imageLinks.thumbnail"
      alt="book cover"
    />
    <img
      v-else
      class="rounded h-150 mr-7"
      src="../../../assets/images/default-img.png"
    />
    <div class="w-full">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">
          {{ data.volumeInfo.title }}
        </div>
        <p class="text-gray-700 text-base">{{ data.volumeInfo.description }}</p>
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="text-sm">
          <p
            class="text-gray-900 leading-none"
            v-for="(author, index) in data.volumeInfo.authors"
            :key="index"
          >
            {{ author }}
          </p>
          <p class="text-gray-600">{{ data.volumeInfo.publishedDate }}</p>
        </div>

        <button
          class="
            border border-blue-500
            hover:bg-blue-700 hover:text-white
            text-blue-500
            font-bold
            py-2
            px-2
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
