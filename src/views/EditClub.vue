<template>
  <div class="flex justify-center h-0 transition-all duration-150" :class="{ 'h-full': updateSucces }">
    <p
      class="p-0 w-8/12 h-0 text-center text-white bg-green-400 transition-all duration-150"
      :class="{ 'py-2 h-full': updateSucces }"
    >
      {{ updateSucces ? "Update success" : "" }}
    </p>
  </div>
  <form class="flex flex-col mt-2 mx-auto px-10 w-full md:w-3/4">
    <h3 class="mb-5">Edit club</h3>
    <div class="h-15 relative flex flex-wrap items-stretch mb-4 pr-10 w-full bg-white rounded">
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <LibraryIcon class="mr-2 w-6 h-6"></LibraryIcon>
        </span>
      </div>
      <input
        v-model="name"
        type="text"
        class="
          border-grey-light
          font-roboto
          relative
          flex-auto flex-grow flex-shrink
          self-center
          px-3
          w-px
          h-10
          text-xl
          leading-normal
          bg-white
          border-0
          rounded rounded-l-none
          outline-none
        "
        placeholder="Name"
      />
    </div>
    <label for="file">Upload image for the club</label>
    <div class="relative flex flex-wrap items-stretch mb-6 p-2 pr-10 bg-white rounded">
      <span
        class="flex items-center px-3 w-24 h-24 text-gray-600 leading-normal bg-white bg-cover border-0 rounded-full"
        :style="{
          'background-image': `url(${url ? url : clubImage})`,
        }"
      ></span>
      <input
        id="file"
        type="file"
        @change="readUrl"
        class="
          border-grey-light
          font-roboto
          relative
          flex-auto flex-grow flex-shrink
          self-center
          px-3
          w-px
          h-10
          text-xl
          leading-normal
          bg-white
          border-0
          rounded rounded-l-none
          outline-none
        "
        placeholder="Email"
      />
    </div>
    <Button buttonText="Save" @click.prevent="onUpdateClub()" :loading="editLoading"></Button>
  </form>
</template>

<script>
import clubImage from "@/assets/images/default-img.png";
import { LibraryIcon } from "@heroicons/vue/solid";
import { mapActions, mapState } from "vuex";
import Button from "@/components/shared/Button.vue";
export default {
  name: "create-club",
  data: () => ({
    name: "",
    url: "",
    file: null,
    form: new FormData(),
    clubImage,
    editLoading: false,
    updateSucces: false,
  }),
  components: {
    LibraryIcon,
    Button,
  },
  computed: {
    ...mapState("clubStore", ["activeClub"]),
  },
  watch: {
    activeClub() {
      this.name = this.activeClub.name;
      this.url = this.activeClub.photo;
    },
  },
  mounted() {
    this.name = this.activeClub.name;
    this.url = this.activeClub.photo;
  },
  methods: {
    ...mapActions("clubStore", ["updateClub"]),
    readUrl(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    onUpdateClub() {
      this.editLoading = true;
      const { name, file } = this;
      const body = [{ key: "name", value: name }];
      if (file) {
        body.push({ key: "photo", value: file });
      }
      body.forEach((element) => {
        this.form.append(element.key, element.value);
      });
      this.updateClub({ id: this.activeClub._id, body: this.form }).then(() => {
        this.editLoading = false;
        this.updateSucces = true;
        setTimeout(() => {
          this.form = new FormData();
          this.updateSucces = false;
        }, 1500);
      });
    },
  },
};
</script>

<style></style>
