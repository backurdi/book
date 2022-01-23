<template>
  <div class="slider-container overflow-x-hidden">
    <div class="relative" :class="{ 'h-12': slide > 1 }">
      <button v-if="slide > 1" class="absolute z-50 left-0 top-0 text-black" @click="previousSlide">
        <ArrowNarrowLeftIcon
          class="p-1 w-8 h-8 text-black hover:text-white hover:bg-black border-2 border-black rounded-full ease-in"
        ></ArrowNarrowLeftIcon>
      </button>
    </div>
    <div class="flex">
      <div class="slide inset-0 w-full transform translate-x-0 transition-all duration-100 ease-in-out">
        <slot name="main-page"></slot>
      </div>
      <div class="slide inset-0 top-8 w-0 transform translate-x-full transition-all duration-100 ease-in-out">
        <slot name="next-page"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";
export default {
  components: { ArrowNarrowLeftIcon },
  data: () => ({
    slide: 1,
  }),
  methods: {
    nextSlide() {
      setTimeout(() => {
        this.slide++;
      }, 0);
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
      this.slide--;
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
@media screen and (max-width: 500px) {
  .slider-container {
    width: 100%;
  }
}
</style>
