<template>
  <form class="flex flex-col mt-2 lg:w-1/2">
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <UserCircleIcon class="mr-2 w-6 h-6"></UserCircleIcon>
        </span>
      </div>
      <input
        v-model="name"
        type="text"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Name"
      />
    </div>
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <MailIcon class="mr-2 w-6 h-6"></MailIcon>
        </span>
      </div>
      <input
        v-model="email"
        type="text"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Email"
      />
    </div>
    <div class="relative flex flex-wrap items-stretch mb-6 pr-10 bg-white rounded p-2">
      <span
        class="h-24 w-24 flex items-center px-3 bg-cover text-gray-600 leading-normal bg-white border-0 rounded-full"
        :style="{
                'background-image': `url(${url ? url : user?.photo})`,
              }"
      ></span>
      <input
        type="file"
        @change="readUrl"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Email"
      />
    </div>
    <button
      class="px-17 mb-4 mt-4 py-4 text-center text-white font-sans text-xl leading-tight bg-blue-400 rounded md:px-12 md:py-4 md:text-base"
      @click.prevent="save([{key:'name', value:user.name},{key:'email', value:user.email},{key:'photo', value:file}])"
    >Save</button>
  </form>
</template>

<script>
import {
  UserCircleIcon,
  MailIcon,
} from "@heroicons/vue/solid";
export default {
    name:'Create club',
    data:()=>({
        name:'',
        email:''
    }),
    components: {
        UserCircleIcon,
        MailIcon,
    },
    methods:{
        readUrl(e){
        const file = e.target.files[0];
        this.file = file;
        this.url = URL.createObjectURL(file);
      },
    }
  
}
</script>

<style>

</style>