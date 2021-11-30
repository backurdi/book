<template>
  <slider ref="slider">
    <template v-slot:main-page>
      <h3 class="mb-5 text-black text-3xl font-bold">Create post</h3>
      <TextField @emitText="text = $event" :postText="text"></TextField>
      <div>
        <div class="flex my-4">
          <MediaField ref="mediaField" @mediaEmit="photo = $event" :media="photo"></MediaField>
          <ReadingField v-if="book" ref="readingField" :bookData="{ book, pagesFrom, pagesTo }"></ReadingField>
        </div>
        <div class="button-container flex">
          <button
            class="mr-5 w-fit-content text-black border-2 border-black rounded"
            @click="$refs.mediaField.uploadImage()"
          >
            <PhotographIcon class="w-8 h-8 text-green-400 md:w-12 md:h-12"></PhotographIcon>
          </button>
          <button class="gif-icon mr-5 text-black border-2 border-black rounded" @click="goToNextPage('gif')">
            <span>GIF</span>
          </button>
          <button class="gif-icon text-black border-2 border-black rounded" @click="goToNextPage('book')">
            <span>Book</span>
          </button>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          class="
            px-4
            py-2
            w-fit-content
            text-black
            hover:text-white hover:bg-green-700
            bg-primary
            border-2 border-black
            rounded
            md:px-6 md:py-3
          "
          @click="createPost"
        >
          {{ buttonText }}
        </button>
      </div>
    </template>
    <template v-slot:next-page>
      <gif-editor @mediaEmit="gifSelected" v-if="nextPage === 'gif'"></gif-editor>
      <ReadingFieldSelector
        @readRefSelected="setBookData($event)"
        :input="{ book, pagesFrom, pagesTo }"
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
export default {
  name: "Add post",
  props: ["buttonText", "postData"],
  components: {
    TextField,
    GifEditor,
    Slider,
    ReadingField,
    ReadingFieldSelector,
    MediaField,
    PhotographIcon,
  },
  data: () => ({
    nextPage: "gif",
    text: "",
    photo: "",
    pagesFrom: 0,
    pagesTo: 0,
    book: "",
    form: new FormData(),
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
  methods: {
    createPost() {
      if (this.text) {
        this.form.append("text", this.text);
      }
      if (this.photo) {
        this.form.append("photo", this.photo);
      }
      if (this.pagesFrom) {
        this.form.append("pagesFrom", this.pagesFrom);
      }
      if (this.pagesTo !== 0) {
        this.form.append("pagesTo", this.pagesTo);
      }
      if (this.book !== "") {
        this.form.append("book", this.book);
      }

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
