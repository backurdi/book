<template>
  <div v-if="updateSucces">Update success</div>
  <div class="w-8/12 mx-auto ">
  <form class="flex flex-col mt-2 lg:w-1/2">
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <UserCircleIcon class="mr-2 w-6 h-6"></UserCircleIcon>
        </span>
      </div>
      <input
        v-model="user.name"
        type="text"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Name"
      />
    </div>
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 mb-6 pr-10 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="flex items-center px-3 text-gray-600 text-2xl leading-normal bg-white border-0 rounded rounded-r-none"
        >
          <MailIcon class="mr-2 w-6 h-6"></MailIcon>
        </span>
      </div>
      <input
        v-model="user.email"
        type="text"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Email"
      />
    </div>
    <div class="relative flex flex-wrap items-stretch mb-6 pr-10 bg-white rounded p-2">
      <span
        class="h-24 w-24 flex items-center px-3 bg-cover text-gray-600 leading-normal bg-white border-0 rounded-full"
        :style="{
                'background-image': `url(${url ? url : user?.photo})`,
              }"
      ></span>
      <input
        type="file"
        @change="readUrl"
        class="border-grey-light font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 rounded rounded-l-none outline-none"
        placeholder="Email"
      />
    </div>
    <button
      class="px-17 mb-4 mt-4 py-4 text-center text-white font-sans text-xl leading-tight bg-blue-400 rounded md:px-12 md:py-4 md:text-base"
      @click.prevent="save([{key:'name', value:user.name},{key:'email', value:user.email},{key:'photo', value:file}])"
    >Save</button>
  </form>

  <form action>
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="whitespace-no-wrap flex items-center px-3 text-gray-600 text-xl leading-normal bg-white rounded rounded-r-none"
        >
          <LockClosedIcon class="mr-2 w-6 h-6"></LockClosedIcon>
        </span>
      </div>
      <input
        v-model="password"
        :type="hidePass ? 'password' : 'text'"
        class="font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 outline-none"
        placeholder="Password"
      />
      <div class="flex -mr-px">
        <span
          class="whitespace-no-wrap flex items-center px-3 text-gray-600 leading-normal bg-white border-0 rounded rounded-l-none"
          @click="hidePass = !hidePass"
        >
          <EyeOffIcon v-if="!hidePass" class="mr-2 w-6 h-6"></EyeOffIcon>
          <EyeIcon v-else class="mr-2 w-6 h-6"></EyeIcon>
        </span>
      </div>
    </div>
    <div
      class="h-15 relative flex flex-wrap items-center items-stretch mb-4 w-full bg-white rounded"
    >
      <div class="w-15 flex justify-center -mr-px p-4">
        <span
          class="whitespace-no-wrap flex items-center px-3 text-gray-600 text-xl leading-normal bg-white rounded rounded-r-none"
        >
          <LockClosedIcon class="mr-2 w-6 h-6"></LockClosedIcon>
        </span>
      </div>
      <input
        v-model="passwordConfirm"
        :type="hideConfirmPass ? 'password' : 'text'"
        class="font-roboto relative flex-1 flex-auto flex-grow flex-shrink self-center px-3 w-px h-10 text-xl leading-normal bg-white border-0 outline-none"
        placeholder="Confirm password"
      />
      <div class="flex -mr-px">
        <span
          class="whitespace-no-wrap flex items-center px-3 text-gray-600 leading-normal bg-white border-0 rounded rounded-l-none"
          @click="hideConfirmPass = !hideConfirmPass"
        >
          <EyeOffIcon v-if="!hideConfirmPass" class="mr-2 w-6 h-6"></EyeOffIcon>
          <EyeIcon v-else class="mr-2 w-6 h-6"></EyeIcon>
        </span>
      </div>
    </div>
    <button
      class="px-17 mb-4 mt-4 py-4 text-center text-white font-sans text-xl leading-tight bg-blue-400 rounded md:px-12 md:py-4 md:text-base"
      @click.prevent="save([{key:'password', value:password},{key:'passwordConfirm', value:passwordConfirm}])"
    >Update password</button>
  </form>
  </div>
</template>

<script>
import {
  UserCircleIcon,
  LockClosedIcon,
  EyeOffIcon,
  EyeIcon,
  MailIcon,
} from "@heroicons/vue/solid";
export default {
    name:'Profile settings',
    components: {
    UserCircleIcon,
    LockClosedIcon,
    EyeOffIcon,
    EyeIcon,
    MailIcon,
  },
  data: () => ({
    url: null,
    file:null,
    password: "",
    passwordConfirm: "",
    hidePass: true,
    hideConfirmPass: true,
    form: new FormData,
    updateSucces: false,
  }),
  computed:{
      user(){
          return this.$store.state.user;
      }
  },
  methods:{
      readUrl(e){
        const file = e.target.files[0];
        this.file = file;
        this.url = URL.createObjectURL(file);
      },
      save(body){
          console.log(body);
          body.forEach(element => {
              this.form.append(element.key, element.value);
          });
          this.$store.dispatch('updateMe', this.form).then(()=>{
              this.updateSucces = true;
              this.form = new FormData
              setTimeout(()=>{this.updateSucces = false}, 1500)
          });
      }
  }


}
</script>

<style>

</style>