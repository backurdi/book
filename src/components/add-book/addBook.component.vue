<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="
      inline-block
      align-bottom
      w-full
      text-left
      rounded-lg
      overflow-hidden
      transform
      transition-all
      sm:align-middle sm:my-8
    "
  >
    <div class="pb-6 pt-5 px-4 bg-white sm:p-6">
      <div class="sm:flex sm:items-start">
        <input
          id="username"
          v-model="searchText"
          class="
            focus:shadow-outline
            px-3
            py-2
            w-full
            text-gray-700
            leading-tight
            border
            rounded
            focus:outline-none
            shadow
            appearance-none
          "
          type="text"
          placeholder="Search"
          @keydown="keydownHandler"
        />
        <button
          class="
            focus:shadow-outline
            px-4
            py-2
            text-white
            font-bold
            bg-blue-500
            hover:bg-blue-700
            rounded
            focus:outline-none
          "
          type="button"
          @click="searchBooksMethod"
        >
          Search
        </button>
      </div>
    </div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-if="booksData.length && !isLoading">
      <AddBookResultCard
        v-for="(data, index) in booksData"
        :key="index"
        :data="data"
        @addBook="addBookMethod($event)"
      ></AddBookResultCard>
    </div>
  </div>
</template>

<script>
import AddBookResultCard from "./add-book-result-card/add-book-result-card.component.vue";
import LoadingSpinner from "../shared/loading-spinner/loading-spinner.component.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AddBookResultCard,
    LoadingSpinner,
  },
  emits: [AddBookResultCard],
  data: () => ({
    searchText: "",
    booksData: [],
    open: false,
    isLoading: false,
  }),
  methods: {
    ...mapActions("bookStore", ["searchBooks", "addBook"]),
    async searchBooksMethod() {
      this.isLoading = true;
      const res = await this.searchBooks(this.searchText);
      this.isLoading = false;
      this.booksData = res;
    },
    keydownHandler(event) {
      if (event.code === "Enter") {
        this.searchBooksMethod();
      }
    },
    async addBookMethod(data) {
      const body = {
        title: data.title,
        pagesTotal: data.pageCount,
        image: data.imageLinks?.thumbnail,
        description: data.description,
        bookType: "book",
        isbn: data.industryIdentifiers[0].identifier,
      };

      await this.addBook(body).then(() => {
        this.$emit("bookAdded");
      });

      this.open = false;
    },
  },
};
</script>
