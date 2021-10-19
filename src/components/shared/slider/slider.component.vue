<template>
  <div class="slider-container relative overflow-x-hidden">
    <button v-if="slide>1" class="z-50 absolute left-0 top-0 text-black" @click="previousSlide">back</button>
    <div
      class="
        slide
        absolute
        inset-0
        transform
        translate-x-0
        transition-all
        duration-1000
        ease-in-out
      "
    >
      <slot name="main-page"></slot>
    </div>
    <div
      class="
        slide
        absolute
        inset-0
        transform
        translate-x-full
        transition-all
        duration-1000
        ease-in-out
      "
    >
      <slot name="next-page"></slot>
    </div>
  </div>
</template>

<script>
export default {
    data:()=>({
        slide:1,
    }),
  methods: {
    nextSlide() {
        this.slide++
      let activeSlide = document.querySelector(".slide.translate-x-0");
      activeSlide.classList.remove("translate-x-0");
      activeSlide.classList.add("-translate-x-full");

      let nextSlide = activeSlide.nextElementSibling;
      nextSlide.classList.remove("translate-x-full");
      nextSlide.classList.add("translate-x-0");
    },

    previousSlide() {
        this.slide--
      let activeSlide = document.querySelector(".slide.translate-x-0");
      activeSlide.classList.remove("translate-x-0");
      activeSlide.classList.add("translate-x-full");

      let previousSlide = activeSlide.previousElementSibling;
      previousSlide.classList.remove("-translate-x-full");
      previousSlide.classList.add("translate-x-0");
    },
  },
};
</script>

<style lang="scss">
.slider-container {
  width: 500px;
  height: 600px;
}
</style>
