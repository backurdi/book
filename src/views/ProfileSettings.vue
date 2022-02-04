<template>
  <div class="flex justify-center h-0 transition-all duration-150" :class="{ 'h-full': updateSucces }">
    <p
      class="p-0 w-8/12 h-0 text-center text-white bg-green-400 transition-all duration-150"
      :class="{ 'py-2 h-full': updateSucces }"
    >
      {{ updateSucces ? "Update success" : "" }}
    </p>
  </div>
  <div class="flex flex-col items-center mx-auto w-11/12 md:w-8/12">
    <form class="flex flex-col mt-2 w-full lg:w-4/6">
      <div class="h-15 relative flex flex-wrap items-stretch mb-3 pr-10 w-full bg-white rounded">
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
          v-model="user.name"
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
      <div class="h-15 relative flex flex-wrap items-stretch mb-3 pr-10 w-full bg-white rounded">
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
          v-model="user.email"
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
          placeholder="Email"
        />
      </div>
      <div class="relative flex flex-wrap items-stretch mb-3 p-2 pr-10 bg-white rounded">
        <span
          class="flex items-center px-3 w-24 h-24 text-gray-600 leading-normal bg-white bg-cover border-0 rounded-full"
          :style="{
            'background-image': `url(${url ? url : user?.photo})`,
          }"
        ></span>
        <input
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
      <Button buttonText="Update info" @click.prevent="onUpdateData()" :loading="isDataLoading"></Button>
    </form>

    <form action class="flex flex-col mt-10 w-full lg:w-4/6">
      <div class="h-15 relative flex flex-wrap items-stretch mb-3 w-full bg-white rounded">
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
          v-model="passwordCurrent"
          :type="hideCurrentPass ? 'password' : 'text'"
          class="
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
            outline-none
          "
          placeholder="Current Password"
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
            @click="hideCurrentPass = !hideCurrentPass"
          >
            <EyeOffIcon v-if="!hideCurrentPass" class="mr-2 w-6 h-6"></EyeOffIcon>
            <EyeIcon v-else class="mr-2 w-6 h-6"></EyeIcon>
          </span>
        </div>
      </div>
      <div class="h-15 relative flex flex-wrap items-stretch mb-3 w-full bg-white rounded">
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
            flex-auto flex-grow flex-shrink
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
      <div class="h-15 relative flex flex-wrap items-stretch mb-3 w-full bg-white rounded">
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
            flex-auto flex-grow flex-shrink
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
      <Button
        buttonText="Update password"
        @click.prevent="onUpdatePass()"
        :loading="isPasswordLoading"
        :disabled="!!(password.length && !passwordConfirm.length)"
      ></Button>
    </form>
  </div>
</template>

<script>
import { UserCircleIcon, LockClosedIcon, EyeOffIcon, EyeIcon, MailIcon } from "@heroicons/vue/solid";
import { mapActions, mapState } from "vuex";
import Button from "@/components/shared/Button.vue";
export default {
  name: "profile-settings",
  components: {
    UserCircleIcon,
    LockClosedIcon,
    EyeOffIcon,
    EyeIcon,
    MailIcon,
    Button,
  },
  data: () => ({
    url: null,
    hidePass: true,
    hideConfirmPass: true,
    updateSucces: false,
    file: null,
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
    hideCurrentPass: true,
    isDataLoading: false,
    isPasswordLoading: false,
    form: new FormData(),
  }),
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    ...mapActions("userStore", ["updateMe", "updatePass"]),
    readUrl(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    save(body, isPassword) {
      if (!isPassword) {
        body.forEach((element) => {
          this.form.append(element.key, element.value);
        });
      }
      let res;
      if (isPassword) {
        res = this.updatePass(body);
        this.isPasswordLoading = true;
      } else {
        res = this.updateMe(this.form);
        this.isDataLoading = true;
      }

      res.then(() => {
        this.updateSucces = true;
        this.setDefaultValues();
        setTimeout(() => {
          this.updateSucces = false;
        }, 1500);
      });
    },
    onUpdateData() {
      const { file, user } = this;
      const body = [];
      const fields = [
        { key: "photo", value: file },
        { key: "name", value: user.name },
        { key: "email", value: user.email },
      ];
      fields.forEach((field) => {
        if (field.value?.length || field.value) {
          body.push(field);
        }
      });
      this.save(body, false);
    },
    onUpdatePass() {
      const { password, passwordConfirm, passwordCurrent } = this;
      const body = { password, passwordConfirm, passwordCurrent };
      this.save(body, true);
    },
    setDefaultValues() {
      this.file = null;
      this.password = "";
      this.passwordConfirm = "";
      this.passwordCurrent = "";
      this.hideCurrentPass = true;
      this.form = new FormData();
      this.isDataLoading = false;
      this.isPasswordLoading = false;
    },
  },
};
</script>

<style></style>
