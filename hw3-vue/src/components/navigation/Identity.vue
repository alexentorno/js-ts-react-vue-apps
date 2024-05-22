<template>
  <div>
    <LoggedIn v-if="userInfo" />
    <LoggedOut v-else />
  </div>
</template>


<script lang="ts">

import { defineComponent, inject } from 'vue';
import type { IUserInfo } from "../../state/AppContext"; // Assume this path matches your actual types

export default defineComponent({
  name: 'Identity',
  setup() {
    const userInfo = inject<IUserInfo | null>('userInfo');

    const doLogout = () => {
      const setUserInfo = inject<(userInfo: IUserInfo | null) => void>('setUserInfo');
      if (setUserInfo) {
        setUserInfo(null);
      }
    };

    return { userInfo, doLogout };
  },
  components: {
    LoggedIn: {
      template: `
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-dark" :title="'Hello ' + userInfo.firstName + ' ' + userInfo.lastName">
              Hello {{ userInfo.firstName }} {{ userInfo.lastName }}!
            </router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="doLogout" href="#" class="nav-link text-dark" title="Logout">Logout</a>
          </li>
        </ul>
      `,
      props: ['userInfo', 'doLogout']
    },
    LoggedOut: {
      template: `
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/register" class="nav-link text-dark">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link text-dark">Login</router-link>
          </li>
        </ul>
      `
    }
  }
});
</script>

<style scoped>
/* Add scoped CSS here if needed */
</style>