<template>
  <slider ref="slider">
    <template v-slot:main-page>
      <h3 class="mb-5 text-black text-3xl font-bold">Create post</h3>
      <TextField @emitText="text=$event" :postText="text"></TextField>
      <MediaField ref="mediaField" @goToGif="$refs.slider.nextSlide()" @mediaEmit="photo = $event" :media="photo"></MediaField>
      <ReadingField @selectedBookEmit="book = $event" @pagesFrom="pagesFrom = $event" @pagesTo="pagesTo = $event" :input="{book, pagesFrom, pagesTo}"></ReadingField>
      <div class="flex justify-end">
        <button
          class="
            px-4
            py-2
            w-fit-content
            text-black
            hover:text-white
            bg-green-400
            hover:bg-green-700
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
      <gif-editor @mediaEmit="gifSelected"></gif-editor>
    </template>
  </slider>
</template>

<script>
import TextField from "@/components/shared/text-field/text-field.component";
import ReadingField from "@/components/shared/post-reading-field/post-reading-field.component";
import MediaField from "@/components/shared/post-media-field/post-media-field.component";
import GifEditor from "@/components/shared/gif-picker/gif-picker.component.vue";
import Slider from "@/components/shared/slider/slider.component.vue";
export default {
  name: "Add post",
  props: ["buttonText", 'postData'],
  components: {
    TextField,
    GifEditor,
    Slider,
    ReadingField,
    MediaField,
  },
  data:()=>({
    text:'',
    photo:'',
    pagesFrom:0,
    pagesTo:0,
    book:'',
    form: new FormData,
  }),
  created(){
    console.log(this.postData);
    if(this.postData){
      const {text, photo, pagesFrom, pagesTo, book} = this.postData
      this.text = text;
      this.pagesFrom = pagesFrom;
      this.pagesTo = pagesTo;
      this.photo = photo;
      this.book = book
    }
  },
  methods: {
    createPost() {
      this.form.append("text", this.text);
      this.form.append("photo", this.photo);
      this.form.append("pagesFrom", this.pagesFrom);
      this.form.append("pagesTo", this.pagesTo);
      this.form.append("book", this.book);

      this.$emit('emitBody', this.form);
    },
    clearFields(){
      this.postText = "";
      this.pagesFrom = 0;
      this.pagesTo = 0;
      this.open = false;
    },
    clearForm(){
      this.form.delete("text");
      this.form.delete("photo");
      this.form.delete("pagesFrom");
      this.form.delete("pagesTo");
      this.form.delete("book");
    },
    gifSelected(event){
      this.photo=event;
      this.$refs.mediaField.setGifUrl(event);
      this.$refs.slider.previousSlide();
    }
  },
};
</script>

<style></style>
