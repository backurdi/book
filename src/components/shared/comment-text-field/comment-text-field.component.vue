<template>
  <div class="comment-input">
    <div class="mb-5">
      <quill-editor ref="quill" theme="snow" v-model:content="content" @ready="setContent" contentType="html" style="height:150px;"/>
    </div>
    <div class="flex-col w-full">
      <ToggleButton toggleLabel="Comment for reading" @toggleStateChanged="toggleState = $event"></ToggleButton>
      <div v-if="toggleState" class="flex justify-between items-end w-10/12 mb-5">
        <SelectDropdown @dropdownChanged="selectedBook=$event" dropdownLabel="Select book"></SelectDropdown>
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
      </div>
    </div>
      <button
        class="px-2 py-2 w-3/6 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded text-sm"
        @click="emitBody"
      >{{buttonText}}</button>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import SelectDropdown from '../select-dropdown/selectDropdown.component.vue'
import ToggleButton from '../toggle-button/toggleButton.component.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: "comment text field",
  data: () => ({
    content: "",
    pagesFrom: 0,
    pagesTo: 0,
    toggleState: false,
    selectedBook: null,
  }),
  props:['textFromParent', 'buttonText'],
  components:{QuillEditor, SelectDropdown, ToggleButton},
  computed: {
    maxPages() {
      return this.$store.state.focusedBook.pagesTotal;
    },
  },
  mounted(){
    this.selectedBook = this.bookId;
  },
  methods: {
    emitBody() {
      let body = {text: this.content}
      if(this.pagesFrom < 0) this.pagesFrom = 0;
      if(this.pagesTo > this.maxPages) this.pagesTo = this.maxPages;
      if(this.toggleState) body = {...body, book: this.selectedBook, pagesFrom: this.pagesFrom, pagesTo: this.pagesTo}

      this.$emit('emitBody', body);
    },
    setContent(editor){
      if(this.textFromParent){
        editor.root.innerHTML = this.domDecoder(this.textFromParent);
      }else{
        editor.root.innerHTML = this.content;
      }
    },
    domDecoder (str) {
        let parser = new DOMParser();
        let dom = parser.parseFromString('<!doctype html><body>' + str, 'text/html');
        return dom.body.textContent;
      },
  },
};
</script>

<style></style>
