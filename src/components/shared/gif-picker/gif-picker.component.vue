<template>
  <div class="gif-editor-container text-black">
    <div class="flex">
      <input
        class="mr-2 w-10/12 border-2 border-black rounded"
        type="text"
        v-model="searchTerm"
        placeholder="Search gif"
      />
      <Button @click="getGifs(0)" buttonText="Search" :loading="gifSearchLoading"></Button>
    </div>
    <div class="gif-container overflow-scroll" ref="scrollContainer">
      <img v-for="gif in gifs" :src="gif" :key="gif.id" @click="selectGif" ref="scrollComponent" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/shared/Button";
export default {
  name: "gif-search",
  data: () => ({
    searchTerm: "",
    gifs: [],
    gifSearchLoading: false,
  }),
  components: {
    Button,
  },
  mounted() {
    this.$refs.scrollContainer.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("otherStore", ["fetchGifs"]),
    getGifs(offset) {
      if (!offset) {
        this.gifs = [];
      }
      this.gifSearchLoading = true;
      this.fetchGifs({ searchTerm: this.searchTerm, offset }).then((json) => {
        this.buildGifs(json);
        this.gifSearchLoading = false;
      });
    },
    handleScroll() {
      let container = this.$refs.scrollContainer;
      let element = this.$refs.scrollComponent;
      if (Math.floor(element.getBoundingClientRect().bottom) <= container.getBoundingClientRect().bottom) {
        this.getGifs(this.gifs.length);
      }
    },
    buildGifs(json) {
      this.gifs = [
        ...this.gifs,
        ...json.data.data
          .map((gif) => gif.id)
          .map((gifId) => {
            return `https://media.giphy.com/media/${gifId}/giphy.gif`;
          }),
      ];
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
