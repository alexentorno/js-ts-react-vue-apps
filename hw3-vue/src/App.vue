<template>
    <div id="app" class="w-4/5 text m-auto bg-orange-50 h-screen rounded-xl shadow-xl mt-10">
      <Header />
      <RouterView />
    </div>
</template>

<script setup >
import Header from '@/components/navigation/Header.vue';
</script>