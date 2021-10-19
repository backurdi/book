<template>
<div class="gif-editor-container">
    <div class="flex">
        <input type="text" v-model="searchTerm" placeholder="Search gif">
        <button class="button" @click="getGifs">Search</button>
    </div>
    <div class="gif-container overflow-scroll">
        <img v-for="gif in gifs" :src="gif" :key="gif.id" @click="selectGif">
    </div>
</div>
</template>

<script>
export default {
    name:"gif search",
    data:()=>({
        searchTerm:'',
        gifs:[]
    }),
    methods: {
        getGifs() {
            this.$store.dispatch('getGifs', this.searchTerm).then(json=>{this.buildGifs(json)});
        },
        buildGifs(json) {
            this.gifs = json.data.data
                .map(gif => gif.id)
                .map(gifId => {
                return `https://media.giphy.com/media/${gifId}/giphy.gif`;
            });
        },
        selectGif(event){   
            this.$emit('mediaEmit', event.target.currentSrc);
        }
    }

}
</script>

<style lang="scss">
.gif-editor-container{
    width: 500px;
}

input {
  padding: 5px;
  color:#000;
}

.button {
  background-color: rgb(0, 172, 0);
  color: white;
  padding: 5px 20px;
  border: none;
  display: block;
  margin: 0 auto;
}

.button:hover {
  background-color: rgb(0, 148, 0);
}

.gif-container {
  margin-top: 30px;
  height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>