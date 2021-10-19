<template>
  <div class="flex-col w-full">
      <ToggleButton toggleLabel="Comment for reading" @toggleStateChanged="toggleState = $event" :toggleStateFromParent="toggleState"></ToggleButton>
      <div v-if="toggleState" class="flex-col md:flex-row justify-between items-end w-10/12 mb-5">
        <SelectDropdown @dropdownChanged="$emit('selectedBookEmit',$event)" dropdownLabel="Select book" :selectedBook="book"></SelectDropdown>
        <div class="flex flex-col w-4/12">
          <label for="from" class="w-2/6">From:</label>
          <input
            id="from"
            v-model="pagesFrom"
            @change="$emit('pagesFrom', pagesFrom)"
            type="number"
            class="border-teal-500 mr-5 px-2 w-4/6 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
            placeholder="From"
            aria-label="Full name"
          />
        </div>
        <div class="flex flex-col w-4/12">
          <label for="to" class="w-2/6">To:</label>
          <input
            id="to"
            v-model="pagesTo"
            @change="$emit('pagesTo', pagesTo)"
            type="number"
            min="0"
            class="border-teal-500 mr-5 px-2 w-4/6 text-gray-700 leading-tight bg-transparent border-b focus:border-green-700 focus:outline-none appearance-none"
            placeholder="From"
            aria-label="Full name"
          />
        </div>
      </div>
    </div>
</template>

<script>
import SelectDropdown from '@/components/shared/select-dropdown/selectDropdown.component.vue';
import ToggleButton from '@/components/shared/toggle-button/toggleButton.component.vue';
export default {
    name:'Post reading picker',
    props:['input'],
    components:{SelectDropdown,ToggleButton},
    data:()=>({
        toggleState: false,
        pagesFrom: 0,
        pagesTo: 0,
        selectedBook:'',
    }),
    created(){
        this.pagesFrom = this.input.pagesFrom;
        this.pagesTo = this.input.pagesTo;

        if(this.pagesTo){
            this.toggleState = true;
        }
    },
    computed: {
        book() {
            if(this.input.book){
                return this.$store.state.books?.filter(
                    (book) => book._id === this.input.book
                )[0];
            }
            return '';
        },
    },

}
</script>

<style>

</style>