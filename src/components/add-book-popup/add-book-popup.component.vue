<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex mb-4 mx-auto w-5/6">
    <button
      class="flex items-center px-2 py-2 text-black hover:text-white font-bold hover:bg-readee border border-black rounded duration-150"
      @click="addBookPopup"
    >
      <PlusIcon class="mr-2 w-6 h-6"></PlusIcon>
      <span class="object-contain">Add book</span>
    </button>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      :open="open"
      @close="open = false"
    >
      <div
        class="flex items-end justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom w-4/6 text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8"
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
            <AddBookResultCard
              v-if="booksData.length"
              :card-data="booksData"
              @addBook="addBook($event)"
            ></AddBookResultCard>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { PlusIcon } from "@heroicons/vue/solid";
import AddBookResultCard from "./add-book-result-card/add-book-result-card.component.vue";

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    PlusIcon,
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
      this.booksData = res.items;
    },
    async addBook(data) {
      const body = {
        title: data.title,
        pagesTotal: data.pageCount,
        image: data.imageLinks.thumbnail,
        bookType: data.printType,
        isbn: data.industryIdentifiers[0].identifier,
      };

      if (!this.$store.state.booksArr.length) {
        body.isCurrent = true;
      }

      await this.$store.dispatch("addBook", body);

      this.open = false;
    },
    addBookPopup() {
      this.open = !this.open;
    },
  },
};
</script>
