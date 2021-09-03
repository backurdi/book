<template>
  <div class="flex-col max-w-1/6 h-70-screen bg-gray-600 rounded p-5 self-start mr-10 top-5 sticky">
    <div class="flex" v-for="(club, index) in clubs" :key="index" @click="selectClub(club._id)">
      <router-link :to="'/'+club._id"
        class="hover-trigger relative mx-auto w-12 h-12 mb-5 bg-cover rounded-full"
        :style="{
                'background-image': `url(${club.photo ? club.photo : require('@/assets/images/default-avatar.png')})`,
              }"
      >
        <p class="hover-target bg-white text-gray-600 p-2 rounded">{{club.name}}</p>
      </router-link>
    </div>
    <div class="flex cursor-pointer" @click="goToCreateClub">
      <div class="relative w-12 h-12 mb-5 bg-cover flex hover-trigger">
        <div class="w-full h-full absolute rounded-full bg-white flex justify-center items-center">
          <PlusIcon class="w-8 h-8"></PlusIcon>
        </div>
        <p class="hover-target bg-white text-gray-600 p-2 rounded">Create new club</p>
      </div>
    </div>
  </div>
</template>

<script>
import {PlusIcon} from '@heroicons/vue/solid'
export default {
    name: 'ClubSideComponent',
    components:{PlusIcon},
    computed:{
        clubs() {
            return this.$store.state.clubs;
        },
    },
    methods:{
      selectClub(clubId){
        this.$store.dispatch('selectClub', clubId)
      },
      goToCreateClub(){
        this.$router.push('club')
      },
    }

}
</script>

<style lang="scss" scoped>
.router-link-active {
  border: 3px solid rgb(12, 111, 204);
}

.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}

.hover-target {
  margin-left: 130%;
  white-space: nowrap;
  width: fit-content;

  &:before {
    content: '\A';
    border-style: solid;
    border-width: 10px 15px 10px 0;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: 50px;
  }
}
</style>