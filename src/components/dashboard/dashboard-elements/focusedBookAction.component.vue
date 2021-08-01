<template>
  <div class="flex justify-end w-1/6">
    <button
      class="mr-2 max-h-8 text-blue-500 hover:text-white font-bold hover:bg-blue-500 border border-blue-500 rounded"
      @click="updateIsCurrent"
    >
      <BanIcon v-if="$store.state.focusedBook.isCurrent" class="w-6 h-6" />
      <BookOpenIcon v-else class="w-6 h-6" />
    </button>
    <button
      class="max-h-8 text-red-500 hover:text-white font-bold hover:bg-red-500 border border-red-500 rounded"
      @click="deleteBook"
    >
      <XIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script>
import {
  BanIcon,
  BookOpenIcon,
  XIcon,
} from '@heroicons/vue/solid';
export default {
    name:'Focused book action',
    components:{BanIcon,BookOpenIcon,XIcon}

}
</script>

<style>

</style>