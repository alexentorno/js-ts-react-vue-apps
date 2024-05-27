<script setup>
import { state, setUserInfo } from '@/state/AppState';

const logout = () => {
  state.userInfo = null;
  localStorage.setItem('userInfo',null)
  setUserInfo(null);
};
</script>

<template>  
<ul  class="flex items-center w-auto gap-5">
    <li>
      <router-link to="/" class="nav-link text-dark" :title="'Hello ' + state?.userInfo.firstName + ' ' + state?.userInfo.lastName">
        Hello, {{ state?.userInfo.firstName }} {{ state?.userInfo.lastName }}!
      </router-link>
    </li>
    <li>
      <router-link @click.prevent="logout" :to="{ name: 'home' }" class="nav-link text-dark" title="Logout">Logout</router-link>
    </li>
</ul>
</template>