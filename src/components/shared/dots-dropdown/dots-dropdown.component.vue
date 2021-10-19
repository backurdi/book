<template>
  <div class=" mt-2 relative">
    <div class=" text-white" @click="showDropdown = !showDropdown">
        <DotsVerticalIcon class="w-6 h-6 cursor-pointer" v-if="!showDropdown"></DotsVerticalIcon>
        <XIcon class="w-6 h-6 cursor-pointer" v-if="showDropdown"></XIcon>
    </div>  
    <div class="border-grey-100 absolute right-1 top-8 w-150 bg-white border rounded text-gray-600 z-10" v-if="showDropdown">
        <ul>
            <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="emitAction('update')">
            <span class="font-bold">Update post</span>
            </li>
            <li class="px-4 py-2 w-full hover:text-white hover:bg-blue-400 cursor-pointer" @click="emitAction('delete')">
            <span class="font-bold">Delete post</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import {DotsVerticalIcon, XIcon } from '@heroicons/vue/solid';
export default {
    name: 'Dots dropdown',
    props:['commentIndex', 'dropdownContext'],
    data:()=>({
        showDropdown:false,
    }),
    components:{DotsVerticalIcon, XIcon},
    methods:{
        emitAction(action){
            let argument;
            if(action === 'update'){
                argument = this.commentIndex
            }
            this.$emit(action, argument);
            this.showDropdown = false;
        }
    }

}
</script>

<style>

</style>