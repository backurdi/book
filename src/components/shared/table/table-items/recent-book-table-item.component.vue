<template>
  <div
    v-for="(recentBook, index) in tableData"
    :key="index"
    class="flex p-3 border rounded"
    :class="[index === 0 ? '' : 'mt-3']"
  >
    <img class="border-grey-400 mr-4 w-8 border" :src="recentBook.image ?? noBookCover" alt />
    <div class="w-4/6">
      <p>{{ recentBook.title.length > 18 ? `${recentBook.title.substring(0, 18)}...` : recentBook.title }}</p>
      <k-progress
        :percent="Math.round((recentBook.pagesRead / recentBook.pagesTotal) * 100)"
        :line-height="10"
        :color="colorBasedOnProgress(recentBook.read)"
      ></k-progress>
    </div>
    <button
      class="
        hidden
        flex-initial
        self-center
        px-3
        py-2
        h-4/6
        text-white
        font-bold
        bg-blue-500
        hover:bg-blue-700
        rounded
        lg:block
      "
      @click="changeFocusedBook(recentBook._id)"
    >
      View
    </button>
    <button
      class="
        flex-initial
        self-center
        px-3
        py-2
        h-4/6
        text-white
        font-bold
        bg-blue-500
        hover:bg-blue-700
        rounded
        lg:hidden
      "
      @click="changeFocusedBookMobile(recentBook._id)"
    >
      View
    </button>
  </div>
</template>

<script>
import noBookCover from "@/assets/images/no-book-cover.png";
import KProgress from "k-progress-v3";

export default {
  name: "RecentBookTable",
  components: { KProgress },
  props: ["tableData"],
  emits: ["changeFocusedBook"],
  data: () => ({
    noBookCover,
    recentBooks: [],
  }),
  methods: {
    colorBasedOnProgress(progress) {
      if (progress > 0 && progress <= 20) {
        return "#ffcd3a";
      }
      if (progress > 20 && progress <= 60) {
        return "#357edd";
      }
      return "#19a974";
    },
    changeFocusedBook(bookId) {
      this.$store.commit("changeFocusedBook", bookId);
    },
    changeFocusedBookMobile(bookId) {
      this.$store.commit("changeFocusedBook", bookId);
      this.$store.commit("toggleShowRecentBooks");
    },
  },
};
</script>

<style></style>
