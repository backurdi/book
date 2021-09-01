<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="inline-block align-bottom w-full text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 lg:w-4/6"
  >
    <div class="pb-4 pt-5 px-4 bg-white sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <input
          id="username"
          v-model="searchText"
          class="focus:shadow-outline px-3 py-2 w-full text-gray-700 leading-tight border rounded focus:outline-none shadow appearance-none"
          type="text"
          placeholder="Search"
        />
        <button
          class="focus:shadow-outline px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded focus:outline-none"
          type="button"
          @click="searchBooks"
        >Search</button>
      </div>
    </div>
    <AddBookResultCard v-if="booksData.length" :card-data="booksData" @addBook="addBook($event)"></AddBookResultCard>
  </div>
</template>

<script>
import AddBookResultCard from "./add-book-result-card/add-book-result-card.component.vue";

export default {
  components: {
    AddBookResultCard,
  },
  emits: [AddBookResultCard],
  data: () => ({
    searchText: "",
    booksData: [],
    open: false,
  }),
  methods: {
    async searchBooks() {
      const res = await this.$store.dispatch("searchBooks", this.searchText);
      this.booksData = res;
    },
    async addBook(data) {
      const body = {
        title: data.title,
        pagesTotal: data.pageCount,
        image: data.imageLinks?.thumbnail,
        bookType: 'book',
        isbn: data.industryIdentifiers[0].identifier,
      };

      await this.$store.dispatch("addBook", body);

      this.open = false;
    },
    addBookPopup() {
      this.open = !this.open;
    },
  },
};
</script>
