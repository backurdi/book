<template>
  <div class="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
    <h1 class="font-bold text-2xl my-10 text-black"> Signup </h1>
 <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
          <div class="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span
                class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
              >
                <UserCircleIcon class="h-6 w-6 mr-2"></UserCircleIcon>
              </span>
            </div>
            <input
              type="text"
              v-model="name"
              class="flex-shrink flex-grow bg-white flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Name"
            />
          </div>
          <div class="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span
                class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
              >
                <MailIcon class="h-6 w-6 mr-2"></MailIcon>
              </span>
            </div>
            <input
              type="text"
              v-model="email"
              class="flex-shrink flex-grow bg-white flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Email"
            />
          </div>
          <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span
                class="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600"
                > 
                <LockClosedIcon class="h-6 w-6 mr-2"></LockClosedIcon>
                  </span
              >
            </div>
            <input
              :type="hidePass ? 'password' : 'text'"
              v-model="password"
              class="flex-shrink flex-grow flex-auto bg-white leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
              placeholder="Password"
            />
            <div class="flex -mr-px">
              <span
                class="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600" @click="hidePass = !hidePass"
                >
                <EyeOffIcon v-if="!hidePass" class="h-6 w-6 mr-2"></EyeOffIcon>
                <EyeIcon v-else class="h-6 w-6 mr-2"></EyeIcon>
                </span>
            </div>
          </div>
          <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
            <div class="flex -mr-px justify-center w-15 p-4">
              <span
                class="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600"
                > 
                <LockClosedIcon class="h-6 w-6 mr-2"></LockClosedIcon>
                  </span
              >
            </div>
            <input
              :type="hideConfirmPass ? 'password' : 'text'"
              v-model="passwordConfirm"
              class="flex-shrink flex-grow flex-auto bg-white leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
              placeholder="Confirm password"
            />
            <div class="flex -mr-px">
              <span
                class="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600" @click="hideConfirmPass = !hideConfirmPass"
                >
                <EyeOffIcon v-if="!hideConfirmPass" class="h-6 w-6 mr-2"></EyeOffIcon>
                <EyeIcon v-else class="h-6 w-6 mr-2"></EyeIcon>
                </span>
            </div>
          </div>
          <button @click="signup" class="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-4">
            signup
          </button>
          <router-link to="/login" class="text-base text-black hover:text-green-500 text-center font-roboto leading-normal hover:underline mb-6">Or login now</router-link>
        </form>
</div>
</template>

<script>
import { UserCircleIcon, LockClosedIcon, EyeOffIcon, EyeIcon, MailIcon } from '@heroicons/vue/solid'
export default {
    name:'Signup',
    components:{UserCircleIcon, LockClosedIcon, EyeOffIcon, EyeIcon, MailIcon},
    data:()=>({
      name:'',
      email:'',
      password:'',
      passwordConfirm:'',
      hidePass:true,
      hideConfirmPass:true,
    }),
    methods:{
      signup(e){
        e.preventDefault()
        this.$store.dispatch('signup', {name: this.name, email: this.email, password: this.password, passwordConfirm: this.passwordConfirm })
      }
    }
}
</script>

<style>

</style>