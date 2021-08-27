<template>
<div class="flex mb-5 justify-between">
  <div class="bg-white py-4 px-10 w-10/12 rounded-full">
      <h3>Make a post</h3>
  </div>
  <div class="self-center rounded-full flex items-center justify-center text-white border border-white w-12 h-12 hover:text-gray-600 hover:bg-white cursor-pointer">
      <DotsVerticalIcon class="w-8 h-8"></DotsVerticalIcon>
  </div>
</div>
</template>

<script>
import {
  DotsVerticalIcon,
} from '@heroicons/vue/solid';

export default {
    name:'Club Write Post',
    components:{DotsVerticalIcon}

}
</script>

<style>

</style>