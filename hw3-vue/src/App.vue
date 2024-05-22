<script setup lang="ts">
import { ref } from 'vue';
import Identity from './components/navigation/Identity.vue';

const userInfo = ref(true);

</script>

<template>
  <div class="w-4/5 m-auto bg-white h-screen rounded-xl shadow-xl mt-10">
    <header>
    
    <div>
        <h1>WebApp</h1>
      
    </div>

    <ul>
      <li>
        <router-link to="/">Home</router-link>

      </li>
      <li>
        <router-link to="/todo/categories">Categories</router-link>
      </li>
      <li>
        <router-link to="/todo/priorities">Prioriries</router-link>
      </li>
      <li>
        <router-link to="/todo/tasks">Tasks</router-link>
      </li>
      <Identity />
    </ul>
      
</header>
  
  </div>

  
</template>

<style scoped>

</style>
