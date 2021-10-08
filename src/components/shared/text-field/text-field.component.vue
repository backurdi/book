<template>
<div class="flex flex-col mb-10 w-full">
  <textarea class="text-field textarea h-64 resize-none bg-gray-200 text-black outline-none" name="" id="" cols="30" rows="10"></textarea>
  <img v-if="url.length" :src="url" class="text-field-image" alt="">
  <input ref="textFieldInput" type="file" style="visibility:hidden" @change="readUrl" />
  <button class="border-2 text-black w-fit-content border-black rounded" @click="uploadImage"><PhotographIcon class="w-12 h-12 text-green-400"></PhotographIcon></button>
</div>
<div class="flex justify-end">
  <button class="border-2 text-black w-fit-content border-black rounded px-6 py-3 bg-green-400 hover:bg-green-700 hover:text-white">Creat post</button>
</div>
</template>

<script>
import {PhotographIcon} from '@heroicons/vue/solid' 
export default {
  name:'Textfield',
  data:()=>({
    url:'',
  }),
  components:{PhotographIcon},
  methods:{
    uploadImage(){
      this.$refs.textFieldInput.click();

    },
    readUrl(e){
      const file = e.target.files[0];
      
        this.file = file;
        this.url = URL.createObjectURL(file);
      },
  }

}
</script>

<style lang="scss">
.text-field{
  max-width: 500px;
}

.text-field-image{
  max-width: 500px;
}

</style>