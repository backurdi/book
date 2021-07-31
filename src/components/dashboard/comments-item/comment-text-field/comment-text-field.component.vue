<template>
  <div class="comment-input">
    <textarea
      v-model="text"
      class="
        w-full
        px-3
        py-2
        text-gray-700
        border
        rounded-lg
        focus:outline-none
      "
      rows="6"
      placeholder="Add comments to what you have read"
    ></textarea>
    <div class="flex w-8/12">
      <div class="flex flex-col w-3/12">
        <label for="from" class="w-2/6">From:</label>
        <input
          id="from"
          v-model="pagesFrom"
          type="number"
          class="
            appearance-none
            bg-transparent
            border-b border-teal-500
            w-4/6
            text-gray-700
            mr-5
            px-2
            leading-tight
            focus:outline-none focus:border-green-700
          "
          placeholder="From"
          aria-label="Full name"
        />
      </div>
      <div class="flex flex-col w-3/12">
        <label for="to" class="w-2/6">To:</label>
        <input
          id="to"
          v-model="pagesTo"
          type="number"
          class="
            appearance-none
            bg-transparent
            border-b border-teal-500
            w-4/6
            text-gray-700
            mr-5
            px-2
            leading-tight
            focus:outline-none focus:border-green-700
          "
          placeholder="From"
          aria-label="Full name"
        />
      </div>
      <button
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          w-3/6
          rounded
        "
        @click="addComment"
      >
        Add comment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment text field",
  data: () => ({
    text: "",
    pagesFrom: 0,
    pagesTo: 0,
  }),
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        text: this.text,
        pagesFrom: this.pagesFrom,
        pagesTo: this.pagesTo,
      });
    },
  },
};
</script>

<style></style>
