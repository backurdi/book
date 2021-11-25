<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="block text-gray-700 text-sm font-medium">
      {{ dropdownLabel }}
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        class="
          relative
          pl-3
          pr-10
          py-2
          w-full
          text-left
          bg-white
          border border-gray-300
          focus:border-indigo-500
          rounded-md
          focus:outline-none
          shadow-sm
          cursor-default
          focus:ring-1 focus:ring-indigo-500
          sm:text-sm
        "
      >
        <span class="flex items-center">
          <img :src="selected.image" alt="" class="flex-shrink-0 w-6 h-6 rounded-full" />
          <span class="block ml-3 truncate">{{ selected.title }}</span>
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center ml-3 pr-2 pointer-events-none">
          <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            py-1
            w-full
            max-h-56
            text-base
            bg-white
            rounded-md
            focus:outline-none
            shadow-lg
            overflow-auto
            ring-1 ring-black ring-opacity-5
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="book in books"
            :key="book._id"
            :value="book"
            v-slot="{ active, selected }"
            @click="dropdownChange()"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-center">
                <img :src="book.image" alt="" class="flex-shrink-0 w-6 h-6 rounded-full" />
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ book.title }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
  props: ["dropdownLabel", "selectedBook", "books"],
  data: () => ({
    selected: {},
  }),
  mounted() {
    console.log(this.selectedBook);
    if (this.selectedBook) {
      this.selected = this.selectedBook;
    } else {
      this.selected = this.books[0];
    }
    this.$emit("dropdownChanged", this.selected._id);
  },
  methods: {
    dropdownChange() {
      this.$emit("dropdownChanged", this.selected._id);
    },
  },
};
</script>
