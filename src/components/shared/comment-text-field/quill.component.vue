<template>
  <div class="comment-input">
    <div class="mb-5">
      <quill-editor
        :options="editorOption"
        ref="quill"
        theme="snow"
        v-model:content="content"
        @ready="setContent"
        contentType="html"
        @change="oneEditorChange($event)"
      />
      <input type="file" id="getFile" @change="uploadFunction($event)" />
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
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
import { QuillEditor } from '@vueup/vue-quill';
import Quill from 'quill';
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import SelectDropdown from '../select-dropdown/selectDropdown.component.vue';
import ToggleButton from '../toggle-button/toggleButton.component.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

function imageHandler () {
  const quill = this.quill;

  const input = document.getElementById('getFile');

  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();

    formData.append('image', file);

    // Save current cursor state
    const range = quill.getSelection(true);

    // Insert temporary loading placeholder image
    quill.insertEmbed(range.index, 'image', 'https://cdn.dribbble.com/users/1341307/screenshots/5377324/morph_dribbble.gif'); 

    // Move cursor to right side of image (easier to continue typing)
    quill.setSelection(range.index + 1);

    // Post to an api endpoint which uploads to s3. It returns the s3 url
    const res = URL.createObjectURL(file);
    
    // Remove placeholder image
    quill.deleteText(range.index, 1);

    console.log(res);

    // // Insert uploaded image
    this.quill.insertEmbed(range.index, 'image', res);
  }
}

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

export default {
  name: "comment text field",
  data: () => ({
    content: "",
    pagesFrom: 0,
    pagesTo: 0,
    toggleState: false,
    selectedBook: null,
    url: null,
    editorOption: {
      modules: {
      toolbar: {
        container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],

                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'link', 'image' ],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']],
        handlers: {
          image: imageHandler
        }
      },
      imageDrop: true,
      imageResize: true,
    },
    },
  }),
  props:['textFromParent', 'buttonText'],
  components:{QuillEditor, SelectDropdown, ToggleButton},
  computed: {
    maxPages() {
      return this.$store.state.focusedBook?.pagesTotal;
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

      console.log(body);

      // this.$emit('emitBody', body);
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
  uploadFunction(e){
    console.log(this.quill);
  
    //you can get images data in e.target.files
    //an single example for using formData to post to server
    
    
    var form = new FormData()
    form.append('file[]', e.target.files[0])
    
    //do your post
    
    
  }
  },
};
</script>

<style></style>
