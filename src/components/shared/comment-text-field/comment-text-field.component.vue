<template>
  <div class="flex items-end justify-between">
    <div class="flex items-end justify-between pb-3 pt-2 px-4 w-11/12 bg-gray-200 rounded-b-3xl rounded-t-3xl">
      <div
        id="comment-field"
        contenteditable="true"
        class="flex-row-reverse w-9/12 text-black outline-none cursor-text"
        :class="{ ['text-gray-400']: !edited }"
        v-text="txt"
        @blur="onEdit"
        @focus="checkEdited"
      ></div>
      <div class="relative flex items-center">
        <button class="text-gray-700 hover:text-white" @click.prevent="uploadImage">
          <CameraIcon class="w-6 h-6"></CameraIcon>
        </button>
        <button class="hidden text-gray-700 hover:text-white md:block" @click.prevent="displayGif('dropdown')">
          <div class="flex items-center w-6 h-6 text-xs border border-dark rounded">GIF</div>
        </button>
        <button class="block text-gray-700 hover:text-white md:hidden" @click.prevent="displayGif('popup')">
          <div class="flex items-center w-6 h-6 text-xs border border-dark rounded">GIF</div>
        </button>
        <div class="absolute z-30 right-0 top-10 w-64 bg-white" v-if="showGifPicker">
          <GifPicker @mediaEmit="gifSelected($event, 'dropdown')"></GifPicker>
        </div>
      </div>
    </div>
    <div>
      <button
        class="text-black hover:text-white hover:bg-black border border-black rounded-full"
        @click.prevent="commentActionClicked"
      >
        <ArrowSmDownIcon class="w-6 h-6"></ArrowSmDownIcon>
      </button>
    </div>
  </div>
  <img v-if="url.length" :src="url" class="text-field-image w-12" alt="" />
  <input ref="fileInput" type="file" style="visibility: hidden" @change="readUrl" />
  <Popup @closePopUp="showGifPickerPopup = false" :open="showGifPickerPopup">
    <GifPicker @mediaEmit="gifSelected($event, 'popup')"></GifPicker>
  </Popup>
</template>

<script>
import { ArrowSmDownIcon, CameraIcon } from "@heroicons/vue/solid";
import { mapActions } from "vuex";
import GifPicker from "@/components/shared/gif-picker/gif-picker.component.vue";
import Popup from "@/components/shared/popup";

export default {
  name: "comment-text-field",
  components: { ArrowSmDownIcon, CameraIcon, GifPicker, Popup },
  props: ["editText", "editImage", "postId", "buttonAction" /*Can be updateComment or addComment*/, "commentId"],
  emits: ["commentActionDone"],
  data: () => ({
    edited: false,
    txt: "",
    url: "",
    file: "",
    form: new FormData(),
    showGifPicker: false,
    showGifPickerPopup: false,
  }),
  created() {
    if (this.editText) {
      this.edited = true;
      this.txt = this.editText;
    } else {
      this.txt = this.edited ? "" : "Edit me";
    }
    if (this.editImage) {
      this.url = this.editImage;
    }
  },
  methods: {
    ...mapActions("postStore", ["updateComment", "addComment"]),
    commentActionClicked() {
      if (this.edited) {
        this.form.append("post", this.postId);
        this.form.append("text", this.txt);
        if (this.file) {
          this.form.append("photo", this.file);
        }
        this[this.buttonAction]({ id: this.commentId, formData: this.form }).then(() => {
          this.txt = "Edit me";
          this.edited = false;
          this.file = "";
          this.url = "";
          this.form.delete("post");
          this.form.delete("text");
          this.form.delete("photo");

          this.$emit("commentActionDone");
        });
      }
    },
    gifSelected(event, gifPickerType) {
      if (gifPickerType === "dropdown") {
        this.showGifPicker = !this.showGifPicker;
      } else {
        this.showGifPickerPopup = !this.showGifPickerPopup;
      }
      this.url = event;
      this.file = event;
    },
    onEdit(evt) {
      var src = evt.target.innerText;
      if (src.length) {
        this.txt = src;
      } else {
        this.edited = false;
        this.txt = "Edit me";
      }
    },
    checkEdited() {
      if (!this.edited) {
        this.txt = "";
        this.edited = true;
      }
    },
    uploadImage() {
      this.$refs.fileInput.click();
    },
    readUrl(e) {
      const file = e.target.files[0];

      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    displayGif(gifPickerType) {
      if (gifPickerType === "dropdown") {
        this.showGifPicker = !this.showGifPicker;
      } else {
        this.showGifPickerPopup = !this.showGifPickerPopup;
      }
    },
  },
};
</script>

<style></style>
