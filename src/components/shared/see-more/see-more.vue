<template>
  <p @click="handleClick(seeMoreType)" class="pl-5 cursor-pointer">see more</p>
  <popup @closePopUp="seeMoreBooksPopUpVisible = false" :open="seeMoreBooksPopUpVisible" :buttonText="'close'">
    <see-more-books
      :seeMoreBooksPopUpVisible="seeMoreBooksPopUpVisible"
      @close="seeMoreBooksPopUpVisible = false"
      :books="books"
    ></see-more-books>
  </popup>
  <popup @closePopUp="seeMoreMembersPopUpVisible = false" :open="seeMoreMembersPopUpVisible" :buttonText="'close'">
    <see-more-members @close="seeMoreMembersPopUpVisible = false" :members="members"></see-more-members>
  </popup>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Popup from "../popup";
import SeeMoreBooks from "./popups/see-more-books.vue";
import SeeMoreMembers from "./popups/see-more-members.vue";
export default {
  name: "See more",
  props: ["seeMoreType"],
  components: {
    Popup,
    SeeMoreBooks,
    SeeMoreMembers,
  },
  data: () => ({
    seeMoreBooksPopUpVisible: false,
    seeMoreMembersPopUpVisible: false,
  }),
  computed: {
    ...mapState("clubStore", ["activeClub"]),
    ...mapState("otherStore", ["isNavOpen"]),
    members() {
      return this.activeClub.members;
    },
    books() {
      return this.activeClub.books;
    },
  },
  methods: {
    ...mapMutations("otherStore", ["toggleNav"]),
    handleClick(clickType) {
      if (this.isNavOpen) {
        this.toggleNav();
      }
      switch (clickType) {
        case "member":
          this.seeMoreMembersPopUpVisible = true;
          break;
        case "book":
          this.seeMoreBooksPopUpVisible = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style></style>
