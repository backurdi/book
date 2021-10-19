<template>
  <div class="text-field-image">
    <img v-if="url.length" :src="url" alt="">
  </div>
  <input ref="textFieldInput" type="file" style="visibility:hidden" @change="readUrl" />
  <div class="button-container flex">
    <button class="mr-5 border-2 text-black w-fit-content border-black rounded" @click="uploadImage"><PhotographIcon class="h-8 w-8 md:w-12 md:h-12 text-green-400"></PhotographIcon></button>
    <button  class="gif-icon border-2 text-black w-fit-content border-black rounded" @click="$emit('goToGif')"><span>GIF</span></button>
  </div>
</template>

<script>
import {PhotographIcon} from '@heroicons/vue/solid';
export default {
    name:'Post button field',
    props:['media'],
    data:()=>({
        url:'',
        file:'',
    }),
    emits: ["goToGif","mediaEmit"],
    components:{ PhotographIcon},
    mounted(){
      this.url = this.media;
    },
    methods:{
        uploadImage(){
            this.$refs.textFieldInput.click();
        },
        readUrl(e){
            const file = e.target.files[0];
        
            this.file = file;
            this.url = URL.createObjectURL(file);

            this.$emit('mediaEmit', this.file);
        },
        setGifUrl(url){
          this.url = url;
        }
    }

}
</script>

<style>

</style>