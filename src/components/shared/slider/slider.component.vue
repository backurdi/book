<template>
  <div class="slider-container relative overflow-x-hidden">
    <button v-if="slide>1" class="z-50 absolute left-0 top-0 text-black" @click="previousSlide"><ArrowNarrowLeftIcon class="h-8 w-8 p-1 rounded-full text-black border-2 border-black hover:bg-black hover:text-white ease-in"></ArrowNarrowLeftIcon></button>
    <div class="flex mt-12">
    <div
      class="
        slide
        inset-0
        transform
        translate-x-0
        transition-all
        duration-1000
        ease-in-out
        w-full
      "
    >
      <slot name="main-page"></slot>
    </div>
    <div
      class="
        slide
        inset-0
        transform
        translate-x-full
        transition-all
        duration-1000
        ease-in-out
        top-8
        w-0
      "
    >
      <slot name="next-page"></slot>
    </div>
    </div>
  </div>
</template>

<script>
import {ArrowNarrowLeftIcon} from '@heroicons/vue/solid';
export default {
  components:{ArrowNarrowLeftIcon},
  data:()=>({
      slide:1,
  }),
  methods: {
    nextSlide() {
      setTimeout(() => {
        this.slide++
      }, 500);
      let activeSlide = document.querySelector(".slide.translate-x-0");
      activeSlide.classList.remove("translate-x-0");
      activeSlide.classList.remove("w-full");
      activeSlide.classList.add("-translate-x-full");
      activeSlide.classList.add("w-0");
      activeSlide.classList.add("hidden");

      let nextSlide = activeSlide.nextElementSibling;
      nextSlide.classList.remove("translate-x-full");
      nextSlide.classList.remove("w-0");
      nextSlide.classList.remove("hidden");
      nextSlide.classList.add("translate-x-0");
      nextSlide.classList.add("w-full");
    },

    previousSlide() {
      this.slide--
      let activeSlide = document.querySelector(".slide.translate-x-0");
      activeSlide.classList.remove("translate-x-0");
      activeSlide.classList.remove("w-full");
      activeSlide.classList.add("translate-x-full");
      activeSlide.classList.add("w-0");
      activeSlide.classList.add("hidden");

      let previousSlide = activeSlide.previousElementSibling;
      previousSlide.classList.remove("-translate-x-full");
      previousSlide.classList.remove("w-0");
      previousSlide.classList.remove("hidden");
      previousSlide.classList.add("translate-x-0");
      previousSlide.classList.add("w-full");
    },
  },
};
</script>

<style lang="scss">
.slider-container {
  width: 500px;
  height: 400px;
}

@media screen and (max-width: 500px) {
  .slider-container {
    width: 100%;
  }
}
</style>
