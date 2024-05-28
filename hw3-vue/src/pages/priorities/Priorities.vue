<template>
  <div class="mt-8">
    <h1 class="text-xl font-semibold mb-4 ml-5">List of Your Priorities</h1>
    <div class="mb-4">
      <router-link :to="{ name: 'create-priority' }" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 ml-5 rounded">
        Add Priority
      </router-link>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Priority Name</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Priority Sort</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Sync Date</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="(item, index) in priorities" :key="item.id"
              :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
            <td class="text-left py-3 px-4">{{ item.priorityName }}</td>
            <td class="text-left py-3 px-4">{{ item.prioritySort }}</td>
            <td class="text-left py-3 px-4">{{ formatDate(item.syncDt) }}</td>
            <td class="text-left py-3 px-4">
              <router-link :to="{ name: 'edit-priority', params: { id: item.id }}" class="text-blue-500 hover:text-blue-600">Edit</router-link> |
              <router-link :to="{ name: 'priority-details', params: { id: item.id }}" class="text-blue-500 hover:text-blue-600">Details</router-link> |
              <router-link :to="{ name: 'delete-priority', params: { id: item.id }}" class="text-red-500 hover:text-red-600">Delete</router-link>
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
  import type { IPriority } from '@/domain/IPriority';
  import { state } from '@/state/AppState';
  
      let priorities = ref<IPriority[]>([]);
      const isLoading = ref(true);
      const userInfo = state.userInfo;
  
      const loadData = async () => {
        if (!userInfo.token) { 
          console.error("User token is not available.");
          return;
        }
  
        try {
          const response = await GetService.getPriority(userInfo.token); 
          if (response.data) {
            console.log(userInfo);
            priorities.value = response.data;
          } else {
            console.error("Failed to retrieve data", response);
          }
        } catch (e) {
          console.error("Failed to load priorities:", e);
        } finally {
          isLoading.value = false;
          console.log(priorities.value);
        }
      };
  
      onMounted(() => {
        loadData();
      });
    
</script>