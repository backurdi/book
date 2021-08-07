<template>
  <div class="comment-input">
    <div
      class="mb-10 px-12 text-white bg-red-400 rounded duration-300"
      :class="{ 'h-0': !displayError, 'h-full py-2': displayError }"
    >
      <p
        class="font-bold"
        :class="{ visible: displayError, invisible: !displayError }"
      >{{errorMessage}}</p>
    </div>
    <div class="mb-5">
      <quill-editor theme="snow" v-model:content="text" contentType="html" style="min-height:200px;"/>
    </div>
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
          min="0"
          :max="`${maxPages}`"
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  name: "comment text field",
  data: () => ({
    text: "",
    pagesFrom: 0,
    pagesTo: 0,
    errorMessage: '',
    displayError: false,
  }),
  components:{QuillEditor},
  computed: {
    maxPages() {
      return this.$store.state.focusedBook.pagesTotal;
    },
  },
  methods: {
    addComment() {
      if(this.pagesFrom < 0) this.pagesFrom = 0;
      if(this.pagesTo > this.maxPages) this.pagesTo = this.maxPages;
      this.$store.dispatch("addComment", {
        text: this.text,
        pagesFrom: this.pagesFrom,
        pagesTo: this.pagesTo,
      }).then(()=>{
        this.text = "";
        this.pagesFrom = 0;
        this.pagesTo = 0;
      })
      .catch(err=>{
        this.errorMessage = err.message;
        this.displayError = true;

        setTimeout(()=>{
          this.errorMessage = '';
          this.displayError = false;
        }, 5000)
      });
    },
  },
};
</script>

<style></style>
