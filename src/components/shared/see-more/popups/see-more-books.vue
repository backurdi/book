<template>
  <div class="flex flex-col">
    <button @click="$emit('close')" class="self-end mb-10">Close</button>
    <div class="see-more-book-header flex mb-10" v-for="(book, index) in books" :key="index" @close="$emit('close')">
      <img :src="book?.image" alt="" class="w-26 mr-5 h-40" />
      <div class="see-more-book__header">
        <h3>{{ book.title }}</h3>
        <div v-if="book.description">
          <p class="text-gray-700 text-base">
            {{ showMore ? book.description : setSubStr(book.description) }}
          </p>
          <p class="pointer text-blue-600 italic" v-if="!showMore" @click="showMore = true">Show more</p>
        </div>
        <p v-else>No description</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "see-more-books",
  props: ["books"],
  data: () => ({
    showMore: false,
  }),
  methods: {
    setSubStr(str) {
      let subStr = 200;

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
