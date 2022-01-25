<template>
  <div
    class="
      flex
      p-4
      leading-normal
      bg-white
      border border-gray-400
      rounded-b
      lg:flex lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r
    "
  >
    <img class="mr-7 h-150 rounded" :src="data.volumeInfo.imageLinks?.thumbnail ?? noBookCover" alt="book cover" />
    <div class="w-full">
      <div class="mb-8">
        <div class="mb-2 text-gray-900 text-xl font-bold">{{ data.volumeInfo.title }}</div>
        <div v-if="data.volumeInfo.description">
          <p class="text-gray-700 text-base">
            {{ showMore ? data.volumeInfo.description : setSubStr(data.volumeInfo.description) }}
          </p>
          <p class="pointer text-blue-600 italic" v-if="!showMore" @click="showMore = true">Show more</p>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div class="text-sm">
          <p v-for="(author, index) in data.volumeInfo.authors" :key="index" class="text-gray-900 leading-none">
            {{ author }}
          </p>
          <p class="text-gray-600">{{ data.volumeInfo.publishedDate }}</p>
        </div>

        <button
          class="px-2 py-2 text-blue-500 hover:text-white font-bold hover:bg-blue-700 border border-blue-500 rounded"
          @click="addBook(data.volumeInfo)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import noBookCover from "@/assets/images/no-book-cover.png";
export default {
  name: "add book result card",
  props: ["data"],
  data: () => ({
    showMore: false,
    noBookCover,
  }),
  methods: {
    addBook(bookData) {
      this.$emit("addBook", bookData);
    },
    setSubStr(str) {
      let subStr = 101;

      if (str) {
        while (str?.substring(subStr - 1, subStr).trim() !== "" && str?.substring(subStr - 1, subStr) !== " ") {
          subStr++;
        }

        return str?.substring(1, subStr).trim() + "...";
      }
      return str;
    },
  },
};
</script>

<style></style>
