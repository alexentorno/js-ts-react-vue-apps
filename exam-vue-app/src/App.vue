<template>
  <div id="app">
    <Header />
    <div class="min-vh-100">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
