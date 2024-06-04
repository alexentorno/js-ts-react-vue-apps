<template>
    <div id="app" class="w-4/5 text m-auto text-gray-700 border border-gray-100  bg-orange-50 rounded-xl shadow-xl">
      <Header />
      <RouterView class="min-h-screen rounded-xl"/>
      <Footer />
    </div>
</template>

<script setup >
import Header from '@/components/navigation/Header.vue';
import Footer from '@/components/navigation/Footer.vue';
import { setUserInfo } from '@/state/AppState.ts';
import { onMounted } from 'vue';

const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "[]");

onMounted(() => {
    if (userInfo) {
    setUserInfo(userInfo);
    }
});



</script>