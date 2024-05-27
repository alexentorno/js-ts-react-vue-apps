<template>
  <div class="mt-8">
    <h1 class="text-xl font-semibold mb-4 ml-5">List of Your Categories</h1>

    <div class="mb-4">
      <router-link :to="{ name: 'create-category' }" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 ml-5 rounded">
        Add Category
      </router-link>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Category Name</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Category Sort</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Sync Date</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="(item, index) in categories" :key="item.id"
              :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
            <td class="text-left py-3 px-4">{{ item.categoryName }}</td>
            <td class="text-left py-3 px-4">{{ item.categorySort }}</td>
            <td class="text-left py-3 px-4">{{ formatDate(item.syncDt) }}</td>
            <td class="text-left py-3 px-4">
              <router-link :to="{ name: 'edit-category', params: { id: item.id }}" class="text-blue-500 hover:text-blue-600">Edit</router-link> |
              <router-link :to="{ name: 'category-details', params: { id: item.id }}" class="text-blue-500 hover:text-blue-600">Details</router-link> |
              <router-link :to="{ name: 'delete-category', params: { id: item.id }}" class="text-red-500 hover:text-red-600">Delete</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  

  <script setup lang="ts">



  import { ref, onMounted } from 'vue';
  import GetService from '@/services/CRUD/GetService';
  import formatDate from '@/utils/FormatDate';
  import type { ICategory } from '@/domain/ICategory';
  import { state } from '@/state/AppState';
  
      let categories = ref<ICategory[]>([]);
      const isLoading = ref(true);
      const userInfo = state.userInfo;
  
      const loadData = async () => {
        if (!userInfo.token) { 
          console.error("User token is not available.");
          return;
        }
  
        try {
          const response = await GetService.getCategory(userInfo.token); 
          if (response.data) {
            console.log(userInfo);
            categories.value = response.data;
          } else {
            console.error("Failed to retrieve data", response);
            
          }
        } catch (e) {
          console.error("Failed to load categories:", e);
        } finally {
          isLoading.value = false;
          console.log(categories.value);
        }
      };
  
      onMounted(() => {
        loadData();
      });
    
  </script>