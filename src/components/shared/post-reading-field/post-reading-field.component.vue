<template>
  <div class="flex justify-end w-full h-16">
    <img
      class="mr-5 w-8 border border-gray-200 rounded"
      :src="bookForPost(bookData.book)?.image ? bookForPost(bookData.book)?.image : noBookCover"
      :alt="'cover of ' + bookForPost(bookData.book)?.title"
    />
    <div>
      <p>
        {{
          bookForPost(bookData.book).title.length > 18
            ? `${bookForPost(bookData.book).title.substring(0, 18)}...`
            : bookForPost(bookData.book).title
        }}
      </p>
      <div class="flex">
        <p class="mr-5">from: {{ bookData.pagesFrom }}</p>
        <p>to: {{ bookData.pagesTo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import noBookCover from "@/assets/images/no-book-cover.png";
export default {
  props: ["bookData"],
  data: () => ({
    noBookCover,
  }),
  computed: {
    ...mapState("bookStore", ["books"]),
  },
  methods: {
    bookForPost(bookId) {
      return this.books.find((book) => book._id === bookId);
    },
  },
};
</script>

<style></style>
