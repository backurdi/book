<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block align-middle py-2 min-w-full sm:px-6 lg:px-8">
        <div class="border-b border-gray-200 shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-gray-200 divide-y">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase">
                  Clubs
                </th>
                <th scope="col" class="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase">
                  Role
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-gray-200 divide-y">
              <tr v-for="(student, index) in students" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        :src="student.photo ? student.photo : import('@/assets/images/default-avatar.png')"
                        alt
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-gray-900 text-sm font-medium">{{ student.name }}</div>
                      <div class="text-gray-500 text-sm">{{ student.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-shrink-0 w-10 h-10">
                    <img
                      class="w-10 h-10 rounded-full"
                      v-for="(club, index) in student.clubs"
                      :key="index"
                      :src="club.photo"
                      alt
                    />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 text-green-800 text-xs font-semibold leading-5 bg-green-100 rounded-full"
                    >Active</span
                  >
                </td>
                <td class="px-6 py-4 text-gray-500 whitespace-nowrap text-sm">{{ student.role }}</td>
                <td class="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                  <router-link :to="'/teacher/' + student._id" class="text-indigo-600 hover:text-indigo-900"
                    >View</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

export default {
  name: "Students table",
  props: ["students"],
  setup() {
    return {
      people,
    };
  },
};
</script>
