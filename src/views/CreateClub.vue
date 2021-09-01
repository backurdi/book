<template>
  <form class="flex flex-col mt-2 w-full md:w-3/4 mx-auto">
    <div
      class="h-15 relative flex flex-wrap items-stretch mb-4 pr-10 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <LibraryIcon class="mr-2 w-6 h-6"></LibraryIcon>
        </span>
      </div>
      <input
        v-model="name"
        type="text"
        class="border-grey-light font-roboto relative flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Name"
      />
    </div>
    <MultiselectDropdown :dropdownData="usersForInvite" @inviteFriendsChanged="setSelectedInvites"></MultiselectDropdown>
    <label for="file">Upload image for the club</label>
    <div class="relative flex flex-wrap items-stretch mb-6 pr-10 bg-white rounded p-2">
      <span
        class="h-24 w-24 flex items-center px-3 bg-cover text-gray-600 leading-normal bg-white border-0 rounded-full"
        :style="{
                'background-image': `url(${url ? url : club?.photo})`,
              }"
      ></span>
      <input
        id="file"
        type="file"
        @change="readUrl"
        class="border-grey-light font-roboto relative flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Email"
      />
    </div>
    <button
      class="px-17 mb-4 mt-4 py-4 text-center text-white font-sans text-xl leading-tight bg-blue-400 rounded md:px-12 md:py-4 md:text-base"
      @click.prevent="create()"
    >Save</button>
  </form>
</template>

<script>
import {
  LibraryIcon,
} from "@heroicons/vue/solid";
import MultiselectDropdown from '../components/shared/multiselect-dropdown/multiselectDropdown.component.vue';
export default {
    name:'Create club',
    data:()=>({
        name:'',
        url:'',
        file:'',
        invites:[],
        form: new FormData,
    }),
    computed:{
      usersForInvite(){
        return this.$store.state.usersForInvite
      },
      club(){
        return this.$store.state.currentClub
      }
    },
    components: {
        LibraryIcon,
        MultiselectDropdown,
    },
    methods:{
        readUrl(e){
        const file = e.target.files[0];
        this.file = file;
        this.url = URL.createObjectURL(file);
      },
      setSelectedInvites(data){
        this.invites = data;
      },
      create(){
        const {name, file, invites} = this;
        const body = [
          {key:'name', value:name},
          {key:'photo', value:file},
        ]
        invites.forEach(invite=>{
          body.push({key:'invites', value:invite._id})
        })
        body.forEach(element => {
            this.form.append(element.key, element.value);
        });

        this.$store.dispatch('createClub', this.form)
      }
    }
  
}
</script>

<style>

</style>