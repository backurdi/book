<template>
  <div
    class="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5"
  >
    <h1 class="font-bold text-2xl my-10 text-black">Login</h1>
    <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
      <div
        class="
          flex flex-wrap
          items-stretch
          w-full
          mb-4
          relative
          h-15
          bg-white
          items-center
          rounded
          mb-6
          pr-10
        "
      >
        <div class="flex -mr-px justify-center w-15 p-4">
          <span
            class="
              flex
              items-center
              leading-normal
              bg-white
              px-3
              border-0
              rounded rounded-r-none
              text-2xl text-gray-600
            "
          >
            <UserCircleIcon class="h-6 w-6 mr-2"></UserCircleIcon>
          </span>
        </div>
        <input
          type="text"
          v-model="email"
          class="
            flex-shrink flex-grow
            bg-white
            flex-auto
            leading-normal
            w-px
            flex-1
            border-0
            h-10
            border-grey-light
            rounded rounded-l-none
            px-3
            self-center
            relative
            font-roboto
            text-xl
            outline-none
          "
          placeholder="Email"
        />
      </div>
      <div
        class="
          flex flex-wrap
          items-stretch
          w-full
          relative
          h-15
          bg-white
          items-center
          rounded
          mb-4
        "
      >
        <div class="flex -mr-px justify-center w-15 p-4">
          <span
            class="
              flex
              items-center
              leading-normal
              bg-white
              rounded rounded-r-none
              text-xl
              px-3
              whitespace-no-wrap
              text-gray-600
            "
          >
            <LockClosedIcon class="h-6 w-6 mr-2"></LockClosedIcon>
          </span>
        </div>
        <input
          :type="hidePass ? 'password' : 'text'"
          v-model="password"
          class="
            flex-shrink flex-grow flex-auto
            bg-white
            leading-normal
            w-px
            flex-1
            border-0
            h-10
            px-3
            relative
            self-center
            font-roboto
            text-xl
            outline-none
          "
          placeholder="Password"
        />
        <div class="flex -mr-px">
          <span
            class="
              flex
              items-center
              leading-normal
              bg-white
              rounded rounded-l-none
              border-0
              px-3
              whitespace-no-wrap
              text-gray-600
            "
            @click="hidePass = !hidePass"
          >
            <EyeOffIcon v-if="!hidePass" class="h-6 w-6 mr-2"></EyeOffIcon>
            <EyeIcon v-else class="h-6 w-6 mr-2"></EyeIcon>
          </span>
        </div>
      </div>
      <a
        href="#"
        class="
          text-base text-black text-right
          font-roboto
          leading-normal
          hover:underline
          mb-6
        "
        >Forgot Password ?</a
      >
      <button
        @click="login"
        class="
          bg-blue-400
          py-4
          text-center
          px-17
          md:px-12 md:py-4
          text-white
          rounded
          leading-tight
          text-xl
          md:text-base
          font-sans
          mt-4
          mb-4
        "
      >
        Login
      </button>
      <router-link
        to="/signup"
        class="
          text-base text-black
          hover:text-green-500
          text-center
          font-roboto
          leading-normal
          hover:underline
          mb-6
        "
        >Or register now</router-link
      >
    </form>
  </div>
</template>

<script>
import {
  UserCircleIcon,
  LockClosedIcon,
  EyeOffIcon,
  EyeIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Login",
  components: {
    UserCircleIcon,
    LockClosedIcon,
    EyeOffIcon,
    EyeIcon,
  },
  data: () => ({
    email: "",
    password: "",
    hidePass: true,
  }),
  methods: {
    login(e) {
      e.preventDefault();
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
