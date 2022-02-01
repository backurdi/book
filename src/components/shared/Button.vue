<template>
  <button
    class="button-component flex justify-center text-center text-white font-sans leading-tight bg-blue-400 rounded"
    :class="sizeStyleArr[size]"
    @click.prevent="click($event)"
    :disabled="disabled"
  >
    <p v-if="!loading">{{ buttonText }}</p>
    <loading-spinner v-else size="md"></loading-spinner>
  </button>
</template>

<script>
import loadingSpinner from "./loading-spinner/loading-spinner.vue";
export default {
  name: "button-item",
  components: {
    loadingSpinner,
  },
  props: {
    buttonText: { type: String },
    loading: { type: Boolean },
    size: {
      type: String,
      default: "md",
      validator: (v) => ["sm", "md", "lg"].find((it) => it === v),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    sizeStyleArr: {
      sm: "px-6 py-1 md:px-4 md:text-base",
      md: "px-12 py-2 text-l md:px-8 md:text-base",
      lg: "px-17 py-4 text-xl md:px-12 md:text-base",
    },
  }),
  methods: {
    click() {
      this.$emit("buttonClick");
    },
  },
};
</script>

<style>
.button-component:disabled {
  background-color: rgb(236, 236, 236);
  cursor: default;
}
</style>
