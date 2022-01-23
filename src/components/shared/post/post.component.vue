<template>
  <div class="post relative flex-col pb-4 text-dark border-b-2 border-gray-400">
    <div class="flex justify-between pt-4 px-4">
      <div class="flex items-center">
        <div
          class="hover-trigger relative mr-3 mx-auto w-12 h-12 bg-cover rounded-full"
          :style="{
            'background-image': `url(${
              post.user.photo ? post.user.photo : require('@/assets/images/default-avatar.png')
            })`,
          }"
        ></div>
        <p>{{ post.user.name }}</p>
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
          :src="bookForPost(post.book).image"
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
import DotsDropdownComponent from "../dots-dropdown/dots-dropdown.component.vue";
import BookInfo from "@/components/book-info/book-info.component.vue";
import Popup from "@/components/shared/popup";
import DeletePopup from "../../delete-popup/deletePopup.component.vue";
import CreatePost from "@/components/shared/create-post/create-post.component.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Post",
  components: { DotsDropdownComponent, BookInfo, Popup, DeletePopup, CreatePost },
  props: ["post", "books"],
  data: () => ({
    showDropdown: false,
    openUpdate: false,
    openDelete: false,
    bookDescriptionOpen: false,
  }),
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
  },
};
</script>

<style lang="scss"></style>
