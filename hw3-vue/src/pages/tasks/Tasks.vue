<template>
    <div class="mt-8">
      <h1 class="text-xl font-semibold mb-4 ml-5">List of Your Tasks</h1>
      <div v-if="isLoading">
        <h2>Loading Tasks...</h2>
      </div>
      <div v-else>
        
        <div class="mb-4">
            <router-link :to="{ name: 'create-task' }" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 ml-5 rounded">
                Add Task
            </router-link>
        </div>
        
        <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md ">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Task Name</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Task Sort</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Created Date</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Due Date</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Is Completed</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Is Archived</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Category</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Priority</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Sync Date</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider sm:text-sm sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(task, index) in tasks" :key="task.id"
            :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
              <td>{{ task.taskName }}</td>
              <td>{{ task.taskSort }}</td>
              <td>{{ FormatDate(task.createdDt) }}</td>
              <td>{{ FormatDate(task.dueDt) }}</td>
              <td><input type="checkbox" :checked="task.isCompleted" disabled></td>
              <td><input type="checkbox" :checked="task.isArchived" disabled></td>
              <td>{{ getCategoryName(task.todoCategoryId) }}</td>
              <td>{{ getPriorityName(task.todoPriorityId) }}</td>
              <td>{{ FormatDate(task.syncDt) }}</td>
              <td>
                <router-link :to="{ name: 'edit-task', params: { id: task.id }}" class="text-blue-500 hover:text-blue-600">Edit</router-link> |
                <router-link :to="{ name: 'task-details', params: { id: task.id }}" class="text-blue-500 hover:text-blue-600">Details</router-link> |
                <router-link :to="{ name: 'delete-task', params: { id: task.id }}" class="text-red-500 hover:text-red-600">Delete</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import GetService from '@/services/CRUD/GetService';
  import { state } from '@/state/AppState';
  import FormatDate from '@/utils/FormatDate';
  
  const isLoading = ref(true);
  const tasks = ref([]);
  const categories = ref([]);
  const priorities = ref([]);
  const router = useRouter();
  
  const loadData = async () => {
    try {
      const responseData = await GetService.getTask(state.userInfo.token);
      const categoriesData = await GetService.getCategory(state.userInfo.token);
      const prioritiesData = await GetService.getPriority(state.userInfo.token);
      if (responseData.data && categoriesData.data && prioritiesData.data) {
        
        tasks.value = responseData.data;
        categories.value = categoriesData.data;
        priorities.value = prioritiesData.data;
      }
      console.log("Tasks:", tasks.value);
      console.log("Categories:", categories.value);
      console.log("Priorities:", priorities.value);
      isLoading.value = false;
    } catch (error) {
      console.error("Failed to load data:", error);
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    loadData();
  });
  

  
  const getCategoryName = (categoryId) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      return category.categoryName;
    }
    return "Unknown category";
  };
  
  const getPriorityName = (priorityId) => {
    const priority = priorities.value.find(p => p.id === priorityId);
    if (priority) {
      return priority.priorityName;
    }
    return "Unknown priority";
  };
  </script>
