

<template>

    <p>Home page</p>

</template>

<script setup>
import { onMounted } from 'vue';
import { state } from '@/state/AppState.ts';


onMounted(() => {
    console.log("userInfo:")
  console.log( state.userInfo);
});
</script>