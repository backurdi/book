<template>
  <div class="flex flex-col items-center w-full">
    <h3
      class="text-grey-700 w-3/6 text-center font-bold md:text-xl lg:text-3xl"
    >
      Come in contact with us, send us a question, idea or anythin you want ❤️
    </h3>
    <div
      class="mb-10 px-12 text-white bg-readee rounded duration-150"
      :class="{ 'h-0': !emailSent, 'h-full py-2': emailSent }"
    >
      <p
        class="font-bold"
        :class="{ visible: emailSent, invisible: !emailSent }"
      >
        Thanks a lot for your message
      </p>
    </div>
    <form class="w-1/2">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="mb-6 px-3 w-full md:mb-0 md:w-1/2">
          <label
            class="
              block
              mb-2
              text-gray-700 text-xs
              font-bold
              tracking-wide
              uppercase
            "
            for="grid-first-name"
          >
            First Name
          </label>
          <input
            id="grid-first-name"
            v-model="firstName"
            class="
              borde
              block
              mb-3
              px-4
              py-3
              w-full
              text-gray-700
              leading-tight
              bg-white
              focus:bg-white
              border
              focus:border-gray-500
              border-white
              rounded
              focus:outline-none
              appearance-none
            "
            :class="{ 'border-red-500': firstNameError }"
            type="text"
            placeholder="Jane"
          />
          <p v-if="firstNameError" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div class="px-3 w-full md:w-1/2">
          <label
            class="
              block
              mb-2
              text-gray-700 text-xs
              font-bold
              tracking-wide
              uppercase
            "
            for="grid-last-name"
          >
            Last Name
          </label>
          <input
            id="grid-last-name"
            v-model="lastName"
            class="
              block
              px-4
              py-3
              w-full
              text-gray-700
              leading-tight
              bg-white
              focus:bg-white
              border
              focus:border-gray-500
              border-white
              rounded
              focus:outline-none
              appearance-none
            "
            type="text"
            placeholder="Doe"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="px-3 w-full">
          <label
            class="
              block
              mb-2
              text-gray-700 text-xs
              font-bold
              tracking-wide
              uppercase
            "
            for="grid-password"
          >
            E-mail
          </label>
          <input
            id="email"
            v-model="email"
            class="
              block
              mb-3
              px-4
              py-3
              w-full
              text-gray-700
              leading-tight
              bg-white
              focus:bg-white
              border
              focus:border-gray-500
              border-white
              rounded
              focus:outline-none
              appearance-none
            "
            :class="{ 'border-red-500': emailError }"
            type="email"
          />
          <p v-if="emailError" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="px-3 w-full">
          <label
            class="
              block
              mb-2
              text-gray-700 text-xs
              font-bold
              tracking-wide
              uppercase
            "
            for="grid-password"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="message"
            class="
              no-resize
              block
              mb-3
              px-4
              py-3
              w-full
              h-48
              text-gray-700
              leading-tight
              bg-white
              focus:bg-white
              border
              focus:border-gray-500
              border-white
              rounded
              focus:outline-none
              appearance-none
              resize-none
            "
            :class="{ 'border-red-500': messageError }"
          ></textarea>
          <p v-if="messageError" class="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <button
            class="
              bg-teal-400
              hover:bg-teal-400
              focus:shadow-outline
              px-4
              py-2
              text-black
              hover:text-white
              font-bold
              hover:bg-readee
              bg-white
              rounded
              focus:outline-none
              shadow
            "
            type="button"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data: () => ({
    firstNameError: false,
    emailError: false,
    messageError: false,
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    emailSent: false,
  }),
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.checkForm();

      if (!this.firstNameError || !this.emailError || !this.messageError) {
        this.$store
          .dispatch("sendEmail", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            message: this.message,
          })
          .then(() => {
            this.emailSent = true;
            this.clearForm();
            setTimeout(() => {
              this.emailSent = false;
            }, 2000);
          });
      }
    },
    checkForm() {
      if (!this.firstName.length) {
        this.firstNameError = true;
      } else {
        this.firstNameError = false;
      }

      if (!this.email.length) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }

      if (!this.message.length) {
        this.messageError = true;
      } else {
        this.messageError = false;
      }
    },
    clearForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>

<style></style>
