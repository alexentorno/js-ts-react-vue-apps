<template>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/register" class="nav-link text-dark">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link text-dark">Login</router-link>
      </li>
    </ul>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LoggedOut'
  });
  </script>