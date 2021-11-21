<template>
  <div class="flex flex-col w-full">
    <textarea
      class="textarea h-32 text-black bg-gray-200 outline-none resize-none md:h-48"
      name=""
      id=""
      cols="20"
      v-model="text"
      @change="$emit('emitText', text)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Textfield",
  props: ["postText"],
  data: () => ({
    text: "",
  }),
  mounted() {
    console.log(this.postText);
    this.text = this.postText;
  },
};
</script>

<style lang="scss">
.text-field {
  width: 500px;
}

.text-field-image {
  max-width: 500px;
}

.gif-icon {
  width: 52px;
  height: 52px;
}

@media screen and (max-width: 500px) {
  .text-field {
    width: 100%;
  }
  .text-field-image {
    max-height: 100px;
    overflow: scroll;
  }
  .gif-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
