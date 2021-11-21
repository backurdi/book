<template>
  <TransitionRoot as="template" :show="open" class="flex justify-center">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" :open="open" @close="$emit('closePopUp')">
      <div class="flex items-end justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              w-full
              text-left
              bg-white
              rounded
              shadow-xl
              transform
              transition-all
              sm:align-middle sm:my-8
            "
          >
            <div class="pb-4 pt-5 px-4 w-fit-content bg-white rounded sm:p-6 sm:pb-4">
              <slot></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";

export default {
  name: "Text field popup",
  props: ["open", "textFromParent", "buttonText"],
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
};
</script>

<style></style>
