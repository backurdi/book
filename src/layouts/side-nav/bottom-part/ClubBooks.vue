<template>
  <div>
    <div class="current-books flex justify-between px-5">
      <p class="font-bold">Books</p>
      <button><PlusCircleIcon class="w-6 h-6" @click="addBookClickHandler()"></PlusCircleIcon></button>
    </div>
    <ul class="h-50 overflow-hidden">
      <li class="w-full" v-for="(book, index) in books.slice(0, 3)" :key="index" @click="displayBookInfo(book)">
        <div class="px-5 py-2 cursor-pointer" :class="{ 'bg-blue-400': index === 0 }">
          <div class="flex">
            <img :src="book.image ? book.image : noBookCover" class="mr-2 w-8" alt="" />
            <div class="flex flex-col">
              <p class="text-xs">{{ setSubStr(book.title) }}</p>
              <BookOpenIcon class="self-end w-4 h-4" v-if="index === 0"></BookOpenIcon>
            </div>
          </div>
          <div
            class="px-5 w-full h-2"
            :class="{ 'border-b border-gray-400': index !== (books.length - 1 < 2 ? books.length - 1 : 2) }"
          ></div>
        </div>
      </li>
      <li v-if="books.length > 3">
        <see-more seeMoreType="book"></see-more>
      </li>
    </ul>
  </div>
  <Popup @closePopUp="bookDescriptionOpen = false" :open="bookDescriptionOpen" :buttonText="'close'">
    <BookInfo @close="bookDescriptionOpen = false"></BookInfo>
  </Popup>
  <Popup @closePopUp="addBookOpen = false" :open="addBookOpen">
    <AddBook @bookAdded="addBookOpen = false"></AddBook>
  </Popup>
</template>

<script>
import Popup from "@/components/shared/popup";
import AddBook from "@/components/add-book/addBook.component.vue";
import BookInfo from "@/components/book-info/book-info.component.vue";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/vue/solid";
import { mapMutations, mapState } from "vuex";
import SeeMore from "@/components/shared/see-more/see-more.vue";
import noBookCover from "@/assets/images/no-book-cover.png";
export default {
  name: "club-books",
  data: () => ({
    addBookOpen: false,
    bookDescriptionOpen: false,
    noBookCover,
  }),
  components: {
    Popup,
    AddBook,
    PlusCircleIcon,
    BookOpenIcon,
    BookInfo,
    SeeMore,
  },
  computed: {
    ...mapState("bookStore", ["books"]),
    ...mapState("otherStore", ["isNavOpen"]),
  },
  methods: {
    ...mapMutations("bookStore", ["setFocusedBook"]),
    ...mapMutations("otherStore", ["toggleNav"]),
    setSubStr(str) {
      let subStr = 20;

      if (str) {
        while (str?.substring(subStr - 1, subStr).trim() !== "" && str?.substring(subStr - 1, subStr) !== " ") {
          subStr++;
        }

        return str?.substring(0, subStr).trim() + "...";
      }
      return str;
    },
    addBookClickHandler() {
      this.toggleNavHandler();
      this.addBookOpen = true;
    },
    async displayBookInfo(book) {
      this.toggleNavHandler();
      await this.setFocusedBook(book);
      this.bookDescriptionOpen = true;
    },
    toggleNavHandler() {
      if (this.isNavOpen) {
        this.toggleNav();
      }
    },
  },
};
</script>

<style></style>
