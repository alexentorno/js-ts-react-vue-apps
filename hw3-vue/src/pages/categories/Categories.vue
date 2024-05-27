<template>
    <div>
      <h1>Categories</h1>
      <!-- <p>
        <router-link to="/categories/create">Create new</router-link>
      </p>
      <table class="table">
        <thead>
          <tr>
            <th>CategoryName</th>
            <th>CategorySort</th>
            <th>SyncDt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in categories" :key="item.id">
            <td>{{ item.categoryName }}</td>
            <td>{{ item.categorySort }}</td>
            <td>{{ formatDate(item.syncDt) }}</td>
            <td>
              <router-link :to="`/categories/edit/${item.id}`">Edit</router-link> |
              <router-link :to="`/categories/details/${item.id}`">Details</router-link> |
              <router-link :to="`/categories/delete/${item.id}`">Delete</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading">
        <h1>Categories - LOADING</h1>
      </div> -->
    </div>
  </template>
  

  <script setup>



  /* import { ref, onMounted, computed } from 'vue';
  import GetService from '@/services/CRUD/GetService';
  import formatDate from '@/utils/FormatDate';
  import type { ICategory } from '@/domain/ICategory'; */
  
  /*export default {
     setup() {
      //const { userInfo } = useUserContext(); // Access user context
      const categories = ref<ICategory[]>([]);
      const isLoading = ref(true);
      const token = computed(() => userInfo?.token); // Computed property for reactive token access
  
      const loadData = async () => {
        if (!token.value) { // Ensure the token is available
          console.error("User token is not available.");
          return;
        }
  
        try {
          const response = await GetService.getCategory(token.value); // Use the reactive token here
          if (response.data) {
            categories.value = response.data.map(category => ({
              ...category,
              syncDt: formatDate(category.syncDt) // Format date on data reception
            }));
          }
          isLoading.value = false;
        } catch (e) {
          console.error("Failed to load categories:", e);
        }
      };
  
      onMounted(() => {
        loadData();
      });
  
      return { categories, isLoading, formatDate };
    },
  }; */
  </script>