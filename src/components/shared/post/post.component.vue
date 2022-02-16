<template>
  <div :id="post._id" class="post relative flex-col pb-4 text-dark border-b-2 border-gray-400">
    <div class="flex justify-between pt-4 px-4">
      <div class="flex items-center">
        <div
          class="hover-trigger relative mr-3 mx-auto w-12 h-12 bg-cover rounded-full"
          :style="{
            'background-image': `url(${post.user.photo ? post.user.photo : defaultAvatar})`,
          }"
        ></div>
        <div>
          <p class="text-lg font-semibold">{{ post.user.name }}</p>
          <p class="text-gray-500 text-xs font-light">{{ postDateFormat(post.createdAt) }}</p>
        </div>
      </div>
      <DotsDropdownComponent
        v-if="user.id === post.user._id"
        dropdownContext="post"
        @update="openPopup('Update')"
        @delete="openPopup('Delete')"
      ></DotsDropdownComponent>
    </div>
    <div class="p-4">
      <div class="mb-5" v-html="domDecoder(post.text)"></div>
      <div
        class="flex justify-end cursor-pointer"
        v-if="bookForPost(post.book)"
        @click="bookInfoClickHandler(post.book)"
      >
        <img
          class="mr-5 w-8 border border-gray-200 rounded"
          :src="bookForPost(post.book).image ? bookForPost(post.book).image : noBookCover"
          :alt="'cover of ' + bookForPost(post.book).title"
        />
        <div>
          <p>
            {{
              bookForPost(post.book).title.length > 18
                ? `${bookForPost(post.book).title.substring(0, 18)}...`
                : bookForPost(post.book).title
            }}
          </p>
          <div class="flex">
            <p class="mr-5">from: {{ post.pagesFrom }}</p>
            <p>to: {{ post.pagesTo }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="image-container flex justify-center bg-black">
      <img :src="post.photo" alt="" />
    </div>
  </div>
  <Popup v-if="openUpdate" @closePopUp="openUpdate = false" :open="openUpdate">
    <CreatePost
      buttonText="Update post"
      @close="open = false"
      @emitBody="updatePostMethod"
      :postData="post"
    ></CreatePost>
  </Popup>
  <Popup v-if="openDelete" @closePopUp="openDelete = false" :open="openDelete">
    <DeletePopup @delete-click="deletePostMethod" @cancle="closeDelete"></DeletePopup>
  </Popup>
  <Popup @closePopUp="bookDescriptionOpen = false" :open="bookDescriptionOpen" :buttonText="'close'">
    <BookInfo @close="bookDescriptionOpen = false"></BookInfo>
  </Popup>
</template>

<script>
import defaultAvatar from "@/assets/images/default-avatar.png";
import DotsDropdownComponent from "../dots-dropdown/dots-dropdown.component.vue";
import BookInfo from "@/components/book-info/book-info.component.vue";
import Popup from "@/components/shared/popup";
import DeletePopup from "../../delete-popup/deletePopup.component.vue";
import CreatePost from "@/components/shared/create-post/create-post.component.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import noBookCover from "@/assets/images/no-book-cover.png";

export default {
  name: "post-item",
  components: { DotsDropdownComponent, BookInfo, Popup, DeletePopup, CreatePost },
  props: ["post", "books"],
  data: () => ({
    showDropdown: false,
    openUpdate: false,
    openDelete: false,
    bookDescriptionOpen: false,
    defaultAvatar,
    noBookCover,
  }),
  mounted() {
    const scrollToItem = document.getElementById(this.$router.currentRoute._value.params.postId);
    if (scrollToItem) {
      window.scrollTo({ top: scrollToItem?.offsetTop - 70, behavior: "smooth" });
    }
  },
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("postStore", ["updatePost", "deletePost"]),
    ...mapMutations("bookStore", ["setFocusedBook"]),
    domDecoder(str) {
      let parser = new DOMParser();
      let dom = parser.parseFromString("<!doctype html><body>" + str, "text/html");
      return dom.body.textContent;
    },
    bookForPost(bookId) {
      return this.books.find((book) => book._id === bookId);
    },
    openPopup(popUp) {
      this[`open${popUp}`] = !this[`open${popUp}`];
    },
    updatePostMethod(updatedPost) {
      this.updatePost({ id: this.post._id, content: updatedPost }).then(() => {
        this.showDropdown = false;
        this.openUpdate = false;
      });
    },
    closeDelete() {
      this.showDropdown = false;
      this.openDelete = false;
    },
    deletePostMethod() {
      this.deletePost({ postId: this.post._id, clubId: this.post.club }).then(() => {
        this.showDropdown = false;
        this.openDelete = false;
      });
    },
    bookInfoClickHandler(book) {
      this.setFocusedBook(this.bookForPost(book));
      this.bookDescriptionOpen = true;
    },
    postDateFormat(date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date1 = new Date(date);
      const date2 = Date.now();
      const diffTime = Math.abs(date2 - date1);
      const diffHour = Math.round(diffTime / (1000 * 60 * 60));
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (!diffDays) {
        return diffHour + "ago";
      } else if (diffDays === 1) {
        return `Yesterday ${date1.getHours()}:${date1.getMinutes()}`;
      } else if (diffDays < 10) {
        return `${date1.getDay()}. ${monthNames[date1.getMonth()]} kl.${date1.getHours()}:${date1.getMinutes()}`;
      } else {
        return diffDays + " d.";
      }
    },
  },
};
</script>

<style lang="scss"></style>
