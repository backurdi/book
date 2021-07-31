<template>
  <article class="bg-white w-5/6 mx-auto shadow-md rounded p-8">
    <div
      v-if="!this.$store.state.booksArr.length"
      class="h-full w-full flex justify-center content-center"
    >
      <div class="text-center text-3xl font-extrabold">
        <h1 class="text-green-400 uppercase">You have no books</h1>
        <h1 class="text-green-400 uppercase">Hurry and add some great books</h1>
      </div>
    </div>
    <div v-else>
      <h2 class="text-4xl mb-4">Recently read books</h2>
      <section class="recent-book flex w-full overflow-hidden">
        <div class="most-recent-book flex w-2/3">
          <div class="mr-5 relative">
            <div
              class="bg-blue-600 py-1 rounded-t text-white text-xs text-center"
              v-if="this.$store.state.focusedBook.isCurrent"
            >
              Current reading
            </div>
            <img
              class="border-grey-400"
              :class="
                this.$store.state.focusedBook.isCurrent
                  ? 'border-4 border-blue-600'
                  : 'border'
              "
              :src="this.$store.state.focusedBook.image"
              alt="book cover"
            />
          </div>
          <div class="w-full">
            <div class="flex justify-between mb-4">
              <h3 class="text-2xl w-5/6">
                {{ this.$store.state.focusedBook.title }}
              </h3>
              <div class="w-1/6 flex justify-end">
                <button
                  class="
                    border border-blue-500
                    hover:bg-blue-500 hover:text-white
                    text-blue-500
                    font-bold
                    max-h-8
                    mr-2
                    rounded
                  "
                  @click="updateIsCurrent"
                >
                  <BanIcon
                    class="h-6 w-6"
                    v-if="this.$store.state.focusedBook.isCurrent"
                  ></BanIcon>
                  <BookOpenIcon class="h-6 w-6" v-else></BookOpenIcon>
                </button>
                <button
                  class="
                    border border-red-500
                    hover:bg-red-500 hover:text-white
                    text-red-500
                    font-bold
                    max-h-8
                    rounded
                  "
                  @click="deleteBook"
                >
                  <XIcon class="w-6 h-6"></XIcon>
                </button>
              </div>
            </div>
            <p class="mb-2">
              progress
              {{
                this.$store.state.focusedBook.pagesRead +
                "/" +
                this.$store.state.focusedBook.pagesTotal
              }}
            </p>
            <div class="flex mb-4">
              <progress-bar
                class="w-5/6"
                :progress="pagesReadCalculate()"
              ></progress-bar>
              <input
                id="to"
                v-bind:value="pagesRead"
                v-on:input="pagesReadLocal = $event.target.value"
                type="number"
                :max="`${maxPages}`"
                min="0"
                class="
                  appearance-none
                  bg-transparent
                  border-b border-teal-500
                  w-2/12
                  text-gray-700
                  mr-5
                  px-2
                  leading-tight
                  focus:outline-none focus:border-green-700
                "
              />
              <button
                class="
                  border border-blue-500
                  hover:bg-blue-500
                  text-blue-500
                  hover:text-white
                  font-bold
                  mr-2
                  rounded-full
                  flex-initial
                  px-1
                "
                @click="updatePagesRead"
              >
                <ArrowUpIcon class="w-6 h-6"></ArrowUpIcon>
              </button>
            </div>
            <comments-item
              :comments="this.$store.state.focusedBook.comments"
              @deleteComment="deleteComment($event)"
            ></comments-item>
          </div>
        </div>
        <div class="books-in-progress w-1/3 ml-2">
          <table-component
            :tableType="'recent-books'"
            :tableData="this.$store.state.recentBooksArr"
          >
          </table-component>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import {
  BanIcon,
  BookOpenIcon,
  XIcon,
  ArrowUpIcon,
} from "@heroicons/vue/solid";
import tableComponent from "../table/table.component.vue";
import progressBar from "./progress-bar/progress-bar.component.vue";
import commentsItem from "./comments-item/comments-item.component.vue";

export default {
  name: "dashboard",
  components: {
    tableComponent,
    progressBar,
    commentsItem,
    BanIcon,
    BookOpenIcon,
    XIcon,
    ArrowUpIcon,
  },
  data: () => ({
    pagesReadLocal: 0,
  }),
  computed: {
    maxPages() {
      return this.$store.state.focusedBook.pagesTotal;
    },
    pagesRead() {
      return this.$store.state.focusedBook.pagesRead;
    },
  },
  watch: {
    pagesRead: {
      deep: true,
      handler(newVal) {
        this.pagesReadLocal = newVal;
      },
    },
  },
  created() {
    this.$store.dispatch("fetchBooks");
  },
  methods: {
    updatePagesRead() {
      if (this.pagesReadLocal !== this.pagesRead && this.pagesReadLocal > 0) {
        this.$store.dispatch("updateBook", {
          body: {
            pagesRead:
              this.pagesReadLocal > this.maxPages
                ? this.maxPages
                : this.pagesReadLocal,
          },
        });
      }
    },
    updateIsCurrent() {
      this.$store.dispatch("updateBook", {
        body: { isCurrent: !this.$store.state.focusedBook.isCurrent },
      });
    },
    deleteBook() {
      this.$store.dispatch("deleteBook");
    },
    pagesReadCalculate() {
      const { pagesRead, pagesTotal } = this.$store.state.focusedBook;
      if (pagesRead < pagesTotal) {
        return Math.round(
          // prettier-ignore
          (this.$store.state.focusedBook.pagesRead
          / this.$store.state.focusedBook.pagesTotal)
          * 100,
        );
      }
      return 100;
    },
  },
};
</script>

<style></style>
