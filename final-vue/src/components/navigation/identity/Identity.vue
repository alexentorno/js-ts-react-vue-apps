<template>
  <div>
    <LoggedIn v-if="state.userInfo" />
    <LoggedOut v-else />
  </div>
</template>

<script setup>
import { state } from '@/state/AppState.ts';
import LoggedIn from '@/components/navigation/identity/LoggedIn.vue';
import LoggedOut from '@/components/navigation/identity/LoggedOut.vue';



</script>