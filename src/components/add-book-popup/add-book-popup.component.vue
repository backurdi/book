<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="w-5/6 mx-auto mb-4 flex">
  <button class="border flex border-white hover:bg-green-400 text-white font-bold py-2 px-2 rounded items-center" @click="addBookPopup">
    <PlusIcon class="h-6 w-6 mr-2"></PlusIcon>
  <span class="object-contain">Add book</span>
</button>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden w-4/6 shadow-xl transform transition-all sm:my-8 sm:align-middle">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <input v-model="searchText" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="getBooks">Search</button>
              </div>
            </div>
            <AddBookResultCard v-if="booksData.length" :card-data="booksData" @addBook="addBook($event)"></AddBookResultCard>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { BooksService } from '../../services/books.service'
import AddBookResultCard from './add-book-result-card/add-book-result-card.component.vue'

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    PlusIcon,
    AddBookResultCard
  },
  emits:[AddBookResultCard],
  data:()=>({
      booksService: new BooksService,
      searchText:'',
      booksData:[],
      open: false,
  }),
  methods:{
    async getBooks(){
        const res = await this.booksService.searchBooks(this.searchText);
        this.booksData = res.items;
    },
    async addBook(data){
      const body = {
        title: data.title,
        pagesTotal: data.pageCount,
        image: data.imageLinks.thumbnail,
        bookType: data.printType,
        isbn: data.industryIdentifiers[0].identifier
      };

      if(!this.$store.state.booksArr.length){
        body.isCurrent = true;
      }

      await this.$store.dispatch('addBook', body);

      this.open = false;

    },
    addBookPopup(){
      this.open = !this.open
    }
  }
}
</script>