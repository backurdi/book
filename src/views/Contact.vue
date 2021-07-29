<template>
<div class="flex flex-col items-center w-full">
    <h3 class="text-grey-700 md:text-xl lg:text-3xl w-3/6 text-center font-bold">Come in contact with us, send us a question, idea or anythin you want ❤️</h3>
    <div class="bg-readee text-white rounded mb-10 px-12 duration-150" :class="{'h-0': !emailSent, 'h-full py-2': emailSent}">
        <p class="font-bold" :class="{'visible':emailSent, 'invisible':!emailSent}">Thanks a lot for your message</p>
    </div>
  <form class="w-1/2">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input v-model="firstName" class="appearance-none block w-full bg-white border border-white text-gray-700 borde rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" :class="{'border-red-500' : firstNameError}" id="grid-first-name" type="text" placeholder="Jane">
      <p class="text-red-500 text-xs italic" v-if="firstNameError">Please fill out this field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input v-model="lastName" class="appearance-none block w-full bg-white text-gray-700 border border-white rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        E-mail
      </label>
      <input v-model="email" class="appearance-none block w-full bg-white text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" :class="{'border-red-500' : emailError}" id="email" type="email">
      <p class="text-red-500 text-xs italic" v-if="emailError">Please fill out this field.</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Message
      </label>
      <textarea v-model="message" class=" no-resize appearance-none block w-full bg-white text-gray-700 border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" :class="{'border-red-500' : messageError}" id="message"></textarea>
      <p class="text-red-500 text-xs italic" v-if="messageError">Please fill out this field.</p>
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3">
      <button @click="sendMessage" class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none bg-white text-black hover:bg-readee hover:text-white font-bold py-2 px-4 rounded" type="button">
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
    name:'contact',
    data:()=>({
        firstNameError: false,
        emailError: false,
        messageError: false,
        firstName:'',
        lastName:'',
        email:'',
        message:'',
        emailSent:false
    }),
    methods:{
        sendMessage(e){
            e.preventDefault();
            this.checkForm();
            console.log(this.email.length);
            console.log(this.emailError);

            if(!this.firstNameError || !this.emailError || !this.messageError){
                this.$store.dispatch('sendEmail', {
                    firstName:this.firstName,
                    lastName:this.lastName,
                    email:this.email,
                    message:this.message
                }).then(()=>{
                    this.emailSent = true;
                    this.clearForm();
                    setTimeout(()=>{
                        this.emailSent = false;
                    },2000)
                    
                });
            }

        },
        checkForm(){
            if(!this.firstName.length){
                this.firstNameError = true;
            }else{
                this.firstNameError = false;
            }

            if(!this.email.length){
                this.emailError = true;
            }else{
                this.emailError = false;
            }

            if(!this.message.length){
                this.messageError = true;
            }else{
                this.messageError = false;
            }
        },
        clearForm(){
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.message = ''
        }
    }

}
</script>

<style>

</style>