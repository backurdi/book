<template>
  <!--content-->
  <div class="bg-white flex-col justify-center items-center text-center">
    <!--body-->
    <TrashIcon class="w-16 h-16 mx-auto text-red-500"></TrashIcon>
    <h3 class="text-xl font-bold py-4">Are you sure?</h3>
    <!--footer-->
    <div class="p-3 mt-2 text-center space-x-4 md:block">
      <button
        class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded hover:shadow-lg hover:bg-gray-100"
        @click="$emit('cancle')"
      >Cancel</button>
      <button
        class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded hover:shadow-lg hover:bg-red-600"
        @click="$emit('delete')"
      >Delete</button>
    </div>
  </div>
</template>

<script>
import {TrashIcon} from '@heroicons/vue/solid';
export default {
    name:'Delete modal',
    components:{TrashIcon}

}
</script>

<style>

</style>