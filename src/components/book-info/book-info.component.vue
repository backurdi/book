<template>
  <article class="flex flex-col">
    <div class="book-description-top flex mb-10">
      <img :src="book.image" alt="" class="mr-5" />
      <div class="book-description-top-text">
        <b class="mb-5">{{ book.title }}</b>
        <p>{{ book.pagesTotal }}</p>
      </div>
    </div>
    <p>{{ book.description }}</p>
    <button
      class="
        focus:shadow-outline
        self-end
        px-4
        py-2
        text-white
        font-bold
        bg-blue-500
        hover:bg-blue-700
        rounded
        focus:outline-none
      "
      @click="close"
    >
      Close
    </button>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Book info",
  data: () => ({
    open: false,
  }),
  computed: {
    ...mapState("booksStore", ["focusedBook"]),
  },
  methods: {
    close() {
      this.$emit("close");
      this.open = false;
    },
  },
};
</script>

<style></style>
