<script setup lang="ts">
import Identity from '@/components/navigation/identity/Identity.vue';
import { RouterLink } from 'vue-router';


</script>

<template>
<div class="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row font-medium">
    <div class="flex items-center justify-between">
    <RouterLink :to="{name: 'home'}" class="px-2 h-5 w-10">
      <img src="../../../public/icons/2174462.png" alt="logo">
    </RouterLink>
    <span class="self-center text-xl font-semibold whitespace-nowrap ">Contests</span>
  </div>
    <ul class="flex items-center gap-5 text-stone-500	">
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
      </li>
      
      <li class="cursor-pointer">
        <RouterLink :to="{name: 'contests'}">Contests</RouterLink>
      </li>
      
    </ul>

    <div>
      <Identity />
    </div>
      
</div>

<hr class="sm:mx-auto border-b-stone-300" />
</template>