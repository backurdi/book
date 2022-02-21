<template>
  <slider ref="slider">
    <template v-slot:main-page>
      <h3 class="mb-5 text-black text-3xl font-bold">Create post</h3>
      <TextField
        @emitText="text = $event"
        :postText="text"
        :class="{ 'border border-red-600': missingTextError }"
      ></TextField>
      <p class="text-red-600" v-if="missingTextError">*You have to write some text</p>
      <div>
        <div class="flex my-4 w-full">
          <MediaField ref="mediaField" @mediaEmit="photo = $event" :media="photo"></MediaField>
          <ReadingField v-if="book" ref="readingField" :bookData="{ book, pagesFrom, pagesTo }"></ReadingField>
        </div>
        <div class="button-container grid gap-4 grid-cols-3 md:flex md:grid-cols-none">
          <div class="flex justify-center">
            <button
              class="flex items-center justify-center w-12 text-black border-2 border-black rounded"
              @click="$refs.mediaField.uploadImage()"
            >
              <PhotographIcon class="w-8 h-8 text-green-400 md:w-12 md:h-12"></PhotographIcon>
            </button>
          </div>
          <div class="flex justify-center">
            <button class="gif-icon text-black border-2 border-black rounded" @click="goToNextPage('gif')">
              <span>GIF</span>
            </button>
          </div>
          <div class="flex justify-center">
            <button
              class="gif-icon text-black border-2 border-black rounded"
              @click="goToNextPage('book')"
              v-if="books.length"
            >
              <span>Book</span>
            </button>
          </div>
          <div v-if="user.role === 'Teacher'">
            <p class="mb-2 text-gray-400 text-xs">Assignment post</p>
            <toggle-button @toggleStateChanged="isAssignmentPost = $event"></toggle-button>
          </div>
        </div>
      </div>
      <div class="flex justify-start mt-5 md:justify-end md:mt-0">
        <Button class="w-full md:w-48" :buttonText="buttonText" @click="createPost" :loading="createLoading"></Button>
      </div>
    </template>
    <template v-slot:next-page>
      <gif-editor @mediaEmit="gifSelected" v-if="nextPage === 'gif'"></gif-editor>
      <ReadingFieldSelector
        @readRefSelected="setBookData($event)"
        :input="{ book, pagesFrom, pagesTo }"
        :books="books"
        v-else
      ></ReadingFieldSelector>
    </template>
  </slider>
</template>

<script>
import TextField from "@/components/shared/text-field/text-field.component";
import ReadingField from "@/components/shared/post-reading-field/post-reading-field.component";
import ReadingFieldSelector from "@/components/shared/post-reading-field/post-reading-field-selector.component";
import MediaField from "@/components/shared/post-media-field/post-media-field.component";
import GifEditor from "@/components/shared/gif-picker/gif-picker.component.vue";
import Slider from "@/components/shared/slider/slider.component.vue";
import { PhotographIcon } from "@heroicons/vue/solid";
import { mapState } from "vuex";
import Button from "@/components/shared/Button";
import ToggleButton from "@/components/shared/toggle-button.vue";
export default {
  name: "add-post",
  props: ["buttonText", "postData", "createLoading"],
  components: {
    TextField,
    GifEditor,
    Slider,
    ReadingField,
    ReadingFieldSelector,
    MediaField,
    PhotographIcon,
    Button,
    ToggleButton,
  },
  data: () => ({
    nextPage: "gif",
    text: "",
    photo: "",
    pagesFrom: 0,
    pagesTo: 0,
    book: null,
    form: new FormData(),
    missingTextError: false,
    isAssignmentPost: false,
  }),
  created() {
    if (this.postData) {
      const { text, photo, pagesFrom, pagesTo, book } = this.postData;
      this.text = text;
      this.pagesFrom = pagesFrom;
      this.pagesTo = pagesTo;
      this.photo = photo;
      this.book = book;
    }
  },
  computed: {
    ...mapState("userStore", ["user"]),
    ...mapState("bookStore", ["books"]),
  },
  methods: {
    createPost() {
      if (!this.text) {
        this.missingTextError = true;
        return setTimeout(() => {
          this.missingTextError = false;
          return;
        }, 800);
      }
      if (this.text) {
        this.form.append("text", this.text);
      }
      if (this.photo) {
        this.form.append("photo", this.photo);
      }
      if (this.pagesFrom) {
        this.form.append("pagesFrom", this.pagesFrom);
      }
      if (this.pagesTo && this.pagesTo !== 0) {
        this.form.append("pagesTo", this.pagesTo);
      }
      if (this.book) {
        this.form.append("book", this.book);
      }
      this.form.append("isAssignment", this.isAssignmentPost);

      this.$emit("emitBody", this.form);
    },
    clearFields() {
      this.postText = "";
      this.pagesFrom = 0;
      this.pagesTo = 0;
      this.open = false;
    },
    clearForm() {
      this.form.delete("text");
      this.form.delete("photo");
      this.form.delete("pagesFrom");
      this.form.delete("pagesTo");
      this.form.delete("book");
    },
    gifSelected(event) {
      this.photo = event;
      this.$refs.mediaField.setGifUrl(event);
      this.$refs.slider.previousSlide();
    },
    goToNextPage(nextPage) {
      this.$refs.slider.nextSlide();
      this.nextPage = nextPage;
    },
    setBookData(bookData) {
      this.book = bookData.book;
      this.pagesFrom = bookData.pagesFrom;
      this.pagesTo = bookData.pagesTo;
      this.$refs.slider.previousSlide();
    },
  },
};
</script>

<style lang="scss">
@import "@/styling/_variables.scss";
button {
  background-color: $primary;
}
</style>
