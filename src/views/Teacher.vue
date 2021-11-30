<template>
  <StudentsTable :students="students" class="mx-auto w-11/12"></StudentsTable>
</template>

<script>
import { mapActions, mapState } from "vuex";
import StudentsTable from "../components/students-table/students-table.vue";
export default {
  name: "Teacher",
  components: { StudentsTable },
  computed: {
    ...mapState("userStore", ["students"]),
  },
  created() {
    this.getStudents();
  },
  methods: {
    ...mapActions("userStore", ["getStudents"]),
  },
};
</script>

<style></style>
