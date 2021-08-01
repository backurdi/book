/* eslint no-underscore-dangle: 0 */
<template>
  <div>
    <div class="flex mt-3 p-3 border rounded">
      <p class="flex-auto self-center">{{ comment.text }}</p>
      <p class="flex-initial self-center mx-2">from: {{ comment.pagesFrom }}</p>
      <p class="flex-initial self-center mr-7 mx-2">
        to: {{ comment.pagesTo }}
      </p>
      <button
        class="
          flex-initial
          px-4
          py-2
          text-red-500
          hover:text-white
          font-bold
          hover:bg-red-500
          border border-red-500
          rounded
        "
        @click="deleteComment()"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment list",
  props: ["comment"],
  methods: {
    deleteComment() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      this.$store.dispatch("deleteComment", this.comment._id);
    },
  },
};
</script>

<style></style>
