<template>
  <div class="comment-input">
    <textarea
      v-model="text"
      class="px-3 py-2 w-full text-gray-700 border rounded-lg focus:outline-none"
      rows="6"
      placeholder="Add comments to what you have read"
    ></textarea>
    <div class="flex w-full lg:w-8/12">
      <div class="flex flex-col w-3/12">
        <label for="from" class="w-2/6">From:</label>
        <input
          id="from"
          v-model="pagesFrom"
          type="number"
          class="border-teal-500 mr-5 px-2 w-4/6 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
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
          class="border-teal-500 mr-5 px-2 w-4/6 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
          placeholder="From"
          aria-label="Full name"
        />
      </div>
      <button
        class="px-2 py-2 w-3/6 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded text-sm"
        @click="addComment"
      >Add comment</button>
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
