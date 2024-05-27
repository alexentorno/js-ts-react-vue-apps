<template>
    
  <div class="min-h-screen flex items-start py-20 justify-center w-full bg-orange-50">
	  <div class="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-3/4">
		  <h1 class="text-2xl font-bold text-center mb-4 text-purple-700">Welcome Back!</h1>
		
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-slate-500 mb-2">Email Address</label>
				<input type="email" v-model="email" id="email"  autocomplete="email" placeholder="name@example.com" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-slate-500 mb-2">Password</label>
				<input type="password" v-model="pwd" id="password"  autocomplete="password" placeholder="Password"  class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>

      <transition 
            enter-active-class="transition-opacity duration-500"
            leave-active-class="transition-opacity duration-500"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            >
                <div v-if="validationError" class="flex gap-5 w-full mb-4 text-red-500 relative" role="alert">
                    <p class="font-bold">{{ validationError }}</p>
                    <button @click.prevent="hideValidationError" class="flex-initial w-5 relative top-1 right-5 p-1 text-slate-500 bg-transparent ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </transition>
			
			<button @click.prevent="validateAndLogin" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
		
	  </div>
  </div>


<!-- ----------------------------------------------- -->

<!-- <div class="min-h-screen flex items-center justify-center w-full bg-orange-50">
	<div class="bg-white bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-3/4">
		<div class="text-2xl font-bold text-center mb-4 dark:text-purple-700	">Are you new here? <div>Create an account</div></div>
            
			<div class="mb-4">
				<label for="firstName" class="block text-sm font-medium  text-slate-500 mb-2">First Name</label>
				<input type="firstName" v-model="firstName" id="firstName"  autocomplete="" placeholder="Name" 
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>
            <div class="mb-4">
				<label for="lastName" class="block text-sm font-medium text-slate-500 mb-2">Last Name</label>
				<input type="lastName" v-model="lastName" id="lastName"  autocomplete="" placeholder="Surname" 
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>
            <div class="mb-4">
				<label for="email" class="block text-sm font-medium text-slate-500 mb-2">Email Address</label>
				<input type="email" v-model="email" id="email"  autocomplete="" placeholder="name@example.com" 
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>
            <div class="mb-4">
				<label for="password" class="block text-sm font-medium text-slate-500 mb-2">Password</label>
				<input type="password" v-model="pwd" id="password"  autocomplete="" placeholder="Password"  
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div>
			<div class="mb-4">
				<label for="repeatPwd" class="block text-sm font-medium text-slate-500 mb-2">Repeat Password</label>
				<input type="password" v-model="repeatPwd" id="repeatPwd"  autocomplete="" placeholder="Password"  
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
			</div> -->
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { state, setUserInfo } from '@/state/AppState.ts'; // Adapted for Vue
  import { useRouter } from 'vue-router';
  import AccountService from '@/services/AccountService';
  
  const router = useRouter();
  
  const email = ref("alpekh@gmail.com");
  const pwd = ref("First_1");
  const validationError = ref("");

  const hideValidationError = () => {
        validationError.value = "";
    } 

  
  const validateAndLogin = async () => {
    
    if (email.value.length < 5 || pwd.value.length < 6) {
      validationError.value = "Invalid input lengths";
      return;
    }
  
    const response = await AccountService.login(email.value, pwd.value);
    if (response.data) {
      setUserInfo(response.data);
      console.log(response.data);
      router.push('/');
    }
  
    if (response.errors && response.errors.length > 0) {
      //validationError.value = response.errors[0];
      validationError.value = "Invalid email or password. Try again.";
    }
  };
  </script>
  