<template>
  <ul class="flex items-center gap-3">
      <li>
          <router-link :to="{name: 'register'}" class="py-1 px-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300">
              Register
          </router-link>
      </li>
      <li>
          <router-link :to="{name: 'login'}" class="py-1 px-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300">
              Login
          </router-link>
      </li>
  </ul>
</template>
