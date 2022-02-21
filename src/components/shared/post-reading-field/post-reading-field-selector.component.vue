<template>
  <div class="flex-col w-full text-black">
    <div class="flex-col items-end justify-between mb-5 w-10/12 md:flex-row">
      <SelectDropdown
        dropdownLabel="Select book"
        :selectedBook="book"
        :books="books"
        @dropdownChanged="setBook"
      ></SelectDropdown>
      <div class="flex mt-4">
        <div class="flex flex-col w-4/12">
          <label for="from" class="w-2/6">From:</label>
          <input
            id="from"
            v-model="pagesFrom"
            type="number"
            class="
              border-teal-500
              mr-5
              px-2
              w-4/6
              text-gray-700
              leading-tight
              bg-transparent
              border-b
              focus:border-green-700 focus:outline-none
              appearance-none
            "
            placeholder="From"
            aria-label="Full name"
          />
        </div>
        <div class="flex flex-col w-4/12">
          <label for="to" class="w-2/6">To:</label>
          <input
            id="to"
            v-model="pagesTo"
            type="number"
            min="0"
            class="
              border-teal-500
              mr-5
              px-2
              w-4/6
              text-gray-700
              leading-tight
              bg-transparent
              border-b
              focus:border-green-700 focus:outline-none
              appearance-none
            "
            placeholder="From"
            aria-label="Full name"
          />
        </div>
      </div>
    </div>
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
        md:px-4 md:py-2
      "
      @click="selectReadRef()"
    >
      Submit
    </button>
  </div>
</template>

<script>
import SelectDropdown from "@/components/shared/select-dropdown/selectDropdown.component.vue";
export default {
  name: "post-reading-picker",
  props: ["input", "books"],
  components: { SelectDropdown },
  data: () => ({
    pagesFrom: 0,
    pagesTo: 0,
    selectedBook: "",
    book: null,
  }),
  created() {
    this.pagesFrom = this.input.pagesFrom;
    this.pagesTo = this.input.pagesTo;
    this.selectedBook = this.books[0];

    if (this.pagesTo) {
      this.toggleState = true;
    }

    if (this.input.book) {
      this.book = this.books?.filter((book) => book._id === this.input.book)[0];
    }
  },
  methods: {
    selectReadRef() {
      this.$emit("readRefSelected", { book: this.selectedBook, pagesTo: this.pagesTo, pagesFrom: this.pagesFrom });
    },
    setBook(event) {
      this.selectedBook = event;
    },
  },
};
</script>

<style></style>
