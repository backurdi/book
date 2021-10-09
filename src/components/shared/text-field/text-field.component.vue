<template>
<form class="text-field w-5/12">
<div class="flex flex-col mb-10 w-full">
  <textarea class="textarea h-32 md:h-64 resize-none bg-gray-200 text-black outline-none" name="" id="" cols="30" v-model="postText"></textarea>
  <img v-if="url.length" :src="url" class="text-field-image" alt="">
  <input ref="textFieldInput" type="file" style="visibility:hidden" @change="readUrl" />
  <button class="border-2 text-black w-fit-content border-black rounded" @click.prevent="uploadImage"><PhotographIcon class="h-8 w-8 md:w-12 md:h-12 text-green-400"></PhotographIcon></button>
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
            class="border-teal-500 mr-5 px-2 w-4/6 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
            placeholder="From"
            aria-label="Full name"
          />
        </div>
      </div>
    </div>
<div class="flex justify-end">
  <button class="border-2 text-black w-fit-content border-black rounded px-4 py-2 md:px-6 md:py-3 bg-green-400 hover:bg-green-700 hover:text-white" @click.prevent="addPost">{{buttonText}}</button>
</div>
</form>
</template>

<script>
import {PhotographIcon} from '@heroicons/vue/solid';
import SelectDropdown from '../select-dropdown/selectDropdown.component.vue';
import ToggleButton from '../toggle-button/toggleButton.component.vue';
export default {
  name:'Textfield',
  data:()=>({
    url:'',
    file:'',
    postText: '',
    pagesFrom: 0,
    pagesTo: 0,
    selectedBook:'',
    form: new FormData,
    toggleState: false,
  }),
  props:['textFromParent','buttonText'],
  components:{PhotographIcon,SelectDropdown,ToggleButton},
  created(){
    if(this.textFromParent){
      this.postText = this.textFromParent;
    }
  },
  methods:{
    uploadImage(){
      this.$refs.textFieldInput.click();
    },
    readUrl(e){
      const file = e.target.files[0];
      
        this.file = file;
        this.url = URL.createObjectURL(file);
      },
      emitPost(){
        },
      addPost() {
        this.form.append('text', this.postText);
        this.form.append('photo', this.file);
        this.form.append('pagesFrom', this.pagesFrom);
        this.form.append('pagesTo', this.pagesTo);
        this.form.append('book', this.selectedBook);
        
        this.$emit('emitBody', this.form);
    },
  }

}
</script>

<style lang="scss">
.text-field{
  width: 500px;
}

.text-field-image{
  max-width: 500px;
}

@media screen and (max-width: 500px) {
  .text-field{
    width: 100%;
  }
}

</style>