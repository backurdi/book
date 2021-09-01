<template>
  <div class="w-full flex flex-col items-center mb-4 h15">
    <div class="w-full">
        <div class="flex flex-col items-center relative">
            <div class="w-full  svelte-1l8159u">
                <div class="h-full p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                    <div class="flex flex-auto flex-wrap">
                        <div class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-green-100 border border-green-300" v-for="(friend, index) in selectedFriends" :key="index">
                            <div class="text-xs font-normal leading-none max-w-full flex-initial">{{friend.name}}</div>
                            <div class="flex flex-auto flex-row-reverse">
                                <XIcon class="w-3 h-3 ml-2 cursor-pointer" @click="removeSelectedFriend(friend)"></XIcon>
                            </div>
                        </div>
                        <div class="flex-1">
                            <input :placeholder="selectedFriends.length ? '' : 'Invite people to join the club'" class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800">
                        </div>
                    </div>
                    <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u cursor-pointer" @click="showDropdown = !showDropdown">
                        <ChevronDownIcon v-if="!showDropdown"></ChevronDownIcon>
                        <ChevronUpIcon v-if="showDropdown"></ChevronUpIcon>
                    </div>
                </div>
            </div>
            <div class="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj" v-if="showDropdown">
                <div class="flex flex-col w-full">
                    <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-green-400 hover:text-white" v-for="(friend, index) in dropdownData" :key="index" @click="selectFriend(friend)">
                        <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                            <div class="w-full items-center flex">
                                <div class="mx-2 leading-6  ">{{friend.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {XIcon, ChevronDownIcon, ChevronUpIcon} from '@heroicons/vue/solid';
export default {
    name:'Multiselect Dropdown',
    props:['dropdownData'],
    components:{
        XIcon,
        ChevronDownIcon,
        ChevronUpIcon
    },
    data:()=>({
        selectedFriends:[],
        showDropdown:false,
    }),
    methods:{
        selectFriend(friend){
            const selectedFriend = this.selectedFriends.find(selectedFriend=>selectedFriend === friend);
            if(!selectedFriend){
                this.selectedFriends.push(friend);
            }else{
                this.removeSelectedFriend(friend);
            }

            this.$emit('inviteFriendsChanged', this.selectedFriends)
        },
        removeSelectedFriend(friend){
            const selectedFriend = this.selectedFriends.find(selectedFriend=>selectedFriend === friend);
            this.selectedFriends.splice(this.selectedFriends.indexOf(selectedFriend), 1);

        }
    }

}
</script>

<style>
    .top-100 {top: 100%}
    .bottom-100 {bottom: 100%}
    .max-h-select {
        max-height: 300px;
    }
</style>