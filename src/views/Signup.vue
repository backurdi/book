<template>
  <div class="flex flex-col items-center ml-auto mr-auto w-full md:w-3/5 lg:w-2/3">
    <h1 class="my-10 text-black text-2xl font-bold">Signup</h1>
    <form action class="flex flex-col mt-2 w-8/12 lg:w-1/2">
      <div class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded">
        <div class="w-15 flex justify-center -mr-px p-4">
          <span
            class="
              flex
              items-center
              px-3
              text-gray-600 text-2xl
              leading-normal
              bg-white
              border-0
              rounded rounded-r-none
            "
          >
            <UserCircleIcon class="mr-2 w-6 h-6"></UserCircleIcon>
          </span>
        </div>
        <input
          v-model="name"
          type="text"
          class="
            border-grey-light
            font-roboto
            relative
            flex-1 flex-auto flex-grow flex-shrink
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
      <div class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded">
        <div class="w-15 flex justify-center -mr-px p-4">
          <span
            class="
              flex
              items-center
              px-3
              text-gray-600 text-2xl
              leading-normal
              bg-white
              border-0
              rounded rounded-r-none
            "
          >
            <MailIcon class="mr-2 w-6 h-6"></MailIcon>
          </span>
        </div>
        <input
          v-model="email"
          type="text"
          class="
            border-grey-light
            font-roboto
            relative
            flex-1 flex-auto flex-grow flex-shrink
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
      <div class="h-15 relative flex flex-wrap items-center items-stretch mb-4 w-full bg-white rounded">
        <div class="w-15 flex justify-center -mr-px p-4">
          <span
            class="
              whitespace-no-wrap
              flex
              items-center
              px-3
              text-gray-600 text-xl
              leading-normal
              bg-white
              rounded rounded-r-none
            "
          >
            <LockClosedIcon class="mr-2 w-6 h-6"></LockClosedIcon>
          </span>
        </div>
        <input
          v-model="password"
          :type="hidePass ? 'password' : 'text'"
          class="
            font-roboto
            relative
            flex-1 flex-auto flex-grow flex-shrink
            self-center
            px-3
            w-px
            h-10
            text-xl
            leading-normal
            bg-white
            border-0
            outline-none
          "
          placeholder="Password"
        />
        <div class="flex -mr-px">
          <span
            class="
              whitespace-no-wrap
              flex
              items-center
              px-3
              text-gray-600
              leading-normal
              bg-white
              border-0
              rounded rounded-l-none
            "
            @click="hidePass = !hidePass"
          >
            <EyeOffIcon v-if="!hidePass" class="mr-2 w-6 h-6"></EyeOffIcon>
            <EyeIcon v-else class="mr-2 w-6 h-6"></EyeIcon>
          </span>
        </div>
      </div>
      <div class="h-15 relative flex flex-wrap items-center items-stretch mb-4 w-full bg-white rounded">
        <div class="w-15 flex justify-center -mr-px p-4">
          <span
            class="
              whitespace-no-wrap
              flex
              items-center
              px-3
              text-gray-600 text-xl
              leading-normal
              bg-white
              rounded rounded-r-none
            "
          >
            <LockClosedIcon class="mr-2 w-6 h-6"></LockClosedIcon>
          </span>
        </div>
        <input
          v-model="passwordConfirm"
          :type="hideConfirmPass ? 'password' : 'text'"
          class="
            font-roboto
            relative
            flex-1 flex-auto flex-grow flex-shrink
            self-center
            px-3
            w-px
            h-10
            text-xl
            leading-normal
            bg-white
            border-0
            outline-none
          "
          placeholder="Confirm password"
        />
        <div class="flex -mr-px">
          <span
            class="
              whitespace-no-wrap
              flex
              items-center
              px-3
              text-gray-600
              leading-normal
              bg-white
              border-0
              rounded rounded-l-none
            "
            @click="hideConfirmPass = !hideConfirmPass"
          >
            <EyeOffIcon v-if="!hideConfirmPass" class="mr-2 w-6 h-6"></EyeOffIcon>
            <EyeIcon v-else class="mr-2 w-6 h-6"></EyeIcon>
          </span>
        </div>
      </div>
      <button
        class="
          px-17
          mb-4
          mt-4
          py-4
          text-center text-white
          font-sans
          text-xl
          leading-tight
          bg-blue-400
          rounded
          md:px-12 md:py-4 md:text-base
        "
        @click.prevent=""
      >
        signup
      </button>
      <router-link
        to="/login"
        class="font-roboto mb-6 text-center text-black hover:text-green-500 hover:underline text-base leading-normal"
        >Or login now</router-link
      >
    </form>
  </div>
</template>

<script>
import { UserCircleIcon, LockClosedIcon, EyeOffIcon, EyeIcon, MailIcon } from "@heroicons/vue/solid";
import { mapActions } from "vuex";

export default {
  name: "Signup",
  components: {
    UserCircleIcon,
    LockClosedIcon,
    EyeOffIcon,
    EyeIcon,
    MailIcon,
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    hidePass: true,
    hideConfirmPass: true,
    error: "",
  }),
  methods: {
    ...mapActions("userStore", ["signup"]),
    onSignUp() {
      this.signup({
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
