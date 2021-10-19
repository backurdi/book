<template>
  <div class="gif-editor-container">
    <div class="flex">
      <input
        class="mr-2 w-10/12 border-2 border-black rounded"
        type="text"
        v-model="searchTerm"
        placeholder="Search gif"
      />
      <button
        class="
          px-4
          py-2
          w-fit-content
          text-black
          hover:text-white
          bg-green-400
          hover:bg-green-700
          border-2 border-black
          rounded
          md:px-6 md:py-3
        "
        @click="getGifs(0)"
      >
        Search
      </button>
    </div>
    <div class="gif-container overflow-scroll" ref='scrollContainer'>
      <img v-for="gif in gifs" :src="gif" :key="gif.id" @click="selectGif" ref='scrollComponent'/>
    </div>
  </div>
</template>

<script>
export default {
  name: "gif search",
  data: () => ({
    searchTerm: "",
    gifs: [],
  }),
  mounted(){
      this.$refs.scrollContainer.addEventListener("scroll", this.handleScroll);
  },
  unmounted(){
      window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getGifs(offset) {
      if(!offset){
          this.gifs = [];
      }
      this.$store
        .dispatch("getGifs", { searchTerm: this.searchTerm, offset })
        .then((json) => {
          this.buildGifs(json);
        });
    },
    handleScroll(){
      let container = this.$refs.scrollContainer;
      let element = this.$refs.scrollComponent;
      if (Math.floor(element.getBoundingClientRect().bottom) <= container.getBoundingClientRect().bottom) {
        this.getGifs(this.gifs.length);
      }
    },
    buildGifs(json) {
      this.gifs = [...this.gifs, ...json.data.data
        .map((gif) => gif.id)
        .map((gifId) => {
          return `https://media.giphy.com/media/${gifId}/giphy.gif`;
        })];
    },
    selectGif(event) {
      this.$emit("mediaEmit", event.target.currentSrc);
    },
  },
};
</script>

<style lang="scss">
.gif-editor-container {
}

input {
  padding: 5px;
  color: #000;
}

.button:hover {
  background-color: rgb(0, 148, 0);
}

.gif-container {
  margin-top: 30px;
  display: grid;
  max-height: 480px;
  grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 500px) {
  .gif-container {
    grid-template-columns: 1fr;
  }
}
</style>
