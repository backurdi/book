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
  <popup @closePopUp="seeMoreClubsPopUpVisible = false" :open="seeMoreClubsPopUpVisible" :buttonText="'close'">
    <see-more-clubs @close="seeMoreClubsPopUpVisible = false" :clubs="clubs"></see-more-clubs>
  </popup>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Popup from "@/components/shared/popup";
import SeeMoreBooks from "./popups/see-more-books.vue";
import SeeMoreMembers from "./popups/see-more-members.vue";
import SeeMoreClubs from "./popups/see-more-clubs.vue";
export default {
  name: "see-more",
  props: ["seeMoreType"],
  components: {
    Popup,
    SeeMoreBooks,
    SeeMoreMembers,
    SeeMoreClubs,
  },
  data: () => ({
    seeMoreBooksPopUpVisible: false,
    seeMoreMembersPopUpVisible: false,
    seeMoreClubsPopUpVisible: false,
  }),
  computed: {
    ...mapState("clubStore", ["activeClub", "clubs"]),
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
        case "club":
          this.seeMoreClubsPopUpVisible = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style></style>
