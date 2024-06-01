<template>  
<ul  class="flex items-center w-auto gap-5">
    <li>
      <router-link :to="{ name: 'home' }" class="nav-link text-dark" :title="'Hello ' + state.userInfo.firstName + ' ' + state.userInfo.lastName">
        Hello, {{ state.userInfo.firstName }} {{ state.userInfo.lastName }}!
      </router-link>
    </li>
    <li>
  <router-link
    @click.prevent="logout" :to="{ name: 'home' }" 
    class="py-1 px-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-300" title="Logout">
    Logout
  </router-link>
</li>
</ul>
</template>

<script setup>
import { state, setUserInfo } from '@/state/AppState';

const logout = () => {
  state.userInfo = null;
  localStorage.setItem('userInfo',null)
  setUserInfo(null);
};
</script>