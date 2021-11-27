<template>
  <div class="text-field-media w-8/12">
    <img v-if="url.length" :src="url" alt="" />
    <input class="h-0" ref="textFieldInput" type="file" style="visibility: hidden" @change="readUrl" />
  </div>
</template>

<script>
export default {
  name: "Post button field",
  props: ["media"],
  data: () => ({
    url: "",
    file: "",
  }),
  emits: ["goToGif", "mediaEmit"],
  components: {},
  mounted() {
    this.url = this.media;
  },
  methods: {
    uploadImage() {
      this.$refs.textFieldInput.click();
    },
    readUrl(e) {
      const file = e.target.files[0];

      this.file = file;
      this.url = URL.createObjectURL(file);

      this.$emit("mediaEmit", this.file);
    },
    setGifUrl(url) {
      this.url = url;
    },
  },
};
</script>

<style lang="scss">
.text-field-media {
  max-height: 150px;
  overflow: scroll;
}
</style>
