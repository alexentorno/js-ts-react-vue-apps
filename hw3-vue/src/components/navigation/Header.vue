<script setup lang="ts">
import Identity from '@/components/navigation/identity/Identity.vue';
import { RouterLink } from 'vue-router';


</script>

<template>
<div class="flex items-center border w-full gap-10">
    
    <div class="ml-6">
        <h1>WebApp</h1>
      
    </div>

    <ul class="flex items-center gap-5">
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
      </li>
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'categories'}">Categories</RouterLink>
      </li>
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'priorities'}">Prioriries</RouterLink>
      </li>
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'tasks'}">Tasks</RouterLink>
      </li>
      
    </ul>

    <div>
      <Identity />
    </div>
      
</div>
</template>