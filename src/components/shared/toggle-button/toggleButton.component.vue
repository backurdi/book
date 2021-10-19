<template>
  <div class="flex w-full mb-12">
  <label 
    for="toogleA"
    class="flex items-center cursor-pointer"
  >
    <!-- toggle -->
    <div class="relative">
      <!-- input -->
      <input id="toogleA" type="checkbox" class="sr-only" @change="toggleStateChange" v-model="toggleState" />
      <!-- line -->
      <div class="toggle-bg w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      <!-- dot -->
      <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
    </div>
    <!-- label -->
    <div class="ml-3 text-gray-700 font-medium">
      {{toggleLabel}}
    </div>
  </label>
</div>
</template>

<script>
export default {
    name:'Toggle Button',
    props:['toggleLabel', 'toggleStateFromParent'],
    data:()=>({
        toggleState:false,
    }),
    mounted(){
      console.log(this.toggleStateFromParent);
      if(this.toggleStateFromParent){
        this.toggleState=this.toggleStateFromParent;
      }
    },
    methods:{
        toggleStateChange(){
            this.$emit('toggleStateChanged', this.toggleState);
        }
    }

}
</script>

<style scoped>
    input:checked ~ .dot {
        transform: translateX(100%);
        background-color: #48bb78;
    }

    input:checked ~ .toggle-bg {
        background-color: rgb(238, 238, 238);
    }
</style>