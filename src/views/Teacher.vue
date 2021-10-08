<template>
    <StudentsTable :students="students" class="w-11/12 mx-auto"></StudentsTable>
</template>

<script>
import StudentsTable from '../components/students-table/students-table.vue'
export default {
  name:'Teacher',
  components:{StudentsTable},
  computed:{
    students(){
      return this.$store.state.students
    }
  },
  created(){
    this.$store.dispatch('getStudents')
  }

}
</script>

<style>

</style>