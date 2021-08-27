<template>
  <article class="relative mx-auto px-4 md:px-8  py-4 w-11/12 md:w-5/6 bg-white rounded shadow-md">
    <div
      v-if="!$store.state.booksArr.length"
      class="flex content-center justify-center w-full h-full"
    >
      <div class="text-center text-3xl font-extrabold">
        <h1 class="text-green-400 uppercase">You have no books</h1>
        <h1 class="text-green-400 uppercase">Hurry and add some great books</h1>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-between">
        <h2 class="mb-4 text-2xl lg:text-4xl">Readings</h2>
        <button
          class="flex border-2 border-readee text-readee p-1 rounded self-start lg:hidden hover:bg-readee hover:text-white"
          @click="toggleShowRecentBooks"
        >
          <p class="mr-2">Books</p>
          <BookOpenIcon class="w-6 h-6" v-if="!showRecentBooks" />
          <XIcon class="w-6 h-6" v-if="showRecentBooks" />
        </button>
      </div>
      <div
        class="absolute right-0 top-10 w-full bg-white rounded p-2 ml-4 border border-black z-50 sm:w-2/3 sm:right-8"
        :class="{ 'hidden': !showRecentBooks, 'block': showRecentBooks }"
      >
        <table-component :table-type="'recent-books'" :table-data="recentBooksArr" />
      </div>
      <section class="recent-book flex w-full overflow-hidden">
        <div class="most-recent-book flex flex-col w-full lg:flex-row">
          <div class="flex justify-between lg:flex-col lg:mr-5">
            <div>
              <p
                v-if="focusedBook?.isCurrent"
                class="py-1 text-center text-white text-xs bg-blue-600 rounded-t"
              >Current reading</p>
              <img
                class="border-grey-400"
                :class="
                focusedBook?.isCurrent
                  ? 'border-4 border-blue-600'
                  : 'border'
              "
                :src="focusedBook?.image ?? require(`@/assets/images/no-book-cover.png`)"
                alt="book cover"
              />
            </div>
            <FocusedBookAction class="flex lg:hidden"></FocusedBookAction>
          </div>
          <div class="w-full">
            <div class="flex justify-between mb-4">
              <h3 class="w-full text-2xl lg:w-5/6">{{ focusedBook.title }}</h3>
              <FocusedBookAction class="hidden lg:flex"></FocusedBookAction>
            </div>
            <p class="mb-2">
              progress
              {{
              focusedBook.pagesRead +
              "/" +
              focusedBook.pagesTotal
              }}
            </p>
            <div class="flex flex-col mb-4 lg:flex-row">
              <progress-bar class="w-full lg:w-10/12" :progress="pagesReadCalculate()" />
              <div class="flex justify-between w-3/6 lg:w-1/6">
                <input
                  id="to"
                  :value="pagesRead"
                  type="number"
                  :max="`${maxPages}`"
                  min="0"
                  class="border-teal-500 w-8/12 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
                  @input="pagesReadLocal = $event.target.value"
                />
                <button
                  class="flex-initial ml-2 px-1 text-blue-500 hover:text-white font-bold hover:bg-blue-500 border border-blue-500 rounded-full"
                  @click="updatePagesRead"
                >
                  <ArrowUpIcon class="w-6 h-6" />
                </button>
              </div>
            </div>
            <comments-item
              :comments="focusedBook.comments"
              @deleteComment="deleteComment($event)"
            />
          </div>
        </div>
        <div class="right-8 top-10 ml-2 w-1/3 hidden lg:block">
          <table-component :table-type="'recent-books'" :table-data="$store.state.recentBooksArr" />
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import {
  BookOpenIcon,
  ArrowUpIcon,
  XIcon
} from '@heroicons/vue/solid';
import tableComponent from '../table/table.component.vue';
import progressBar from './progress-bar/progress-bar.component.vue';
import commentsItem from './comments-item/comments-item.component.vue';
import FocusedBookAction from './dashboard-elements/focusedBookAction.component.vue';

export default {
  name: 'Dashboard',
  components: {
    tableComponent,
    progressBar,
    commentsItem,
    BookOpenIcon,
    FocusedBookAction,
    ArrowUpIcon,
    XIcon,
  },
  data: () => ({
    pagesReadLocal: 0,
  }),
  computed: {
    maxPages() {
      return this.$store.state.focusedBook?.pagesTotal;
    },
    pagesRead() {
      return this.$store.state.focusedBook?.pagesRead;
    },
    showRecentBooks(){
      return this.$store.state.showRecentBooks;
    },
    focusedBook(){
      return this.$store.state.focusedBook
    },
    recentBooksArr(){
      return this.$store.state.recentBooksArr
    }
  },
  watch: {
    pagesRead: {
      deep: true,
      handler(newVal) {
        this.pagesReadLocal = newVal;
      },
    },
  },
  methods: {
    toggleShowRecentBooks(){
      this.$store.commit('toggleShowRecentBooks');
    },
    updatePagesRead() {
      if (this.pagesReadLocal !== this.pagesRead && this.pagesReadLocal > 0) {
        this.$store.dispatch('updateBook', {
          body: {
            pagesRead:
              this.pagesReadLocal > this.maxPages
                ? this.maxPages
                : this.pagesReadLocal,
          },
        });
      }
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
