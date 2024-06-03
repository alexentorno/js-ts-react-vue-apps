<template>
<div class="mt-8">
  <h1 class="text-xl font-semibold mb-4 ml-5">List of Your Tasks</h1>
  <div v-if="isLoading && tasks">
    <h2>Loading Tasks...</h2>
  </div>
    <div v-else>
        
      <div class="mb-4">
          <router-link :to="{ name: 'create-task' }" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 ml-5 rounded">
              Add Task
          </router-link>
      </div>
        
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Task Name</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Task Sort</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Created Date</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Due Date</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Is Completed</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Is Archived</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Priority</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Sync Date</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr v-for="(task, index) in tasks" :key="task.id"
        :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
          <td class="text-left py-3 px-4">{{ task.taskName }}</td>
          <td class="text-left py-3 px-4">{{ task.taskSort }}</td>
          <td class="text-left py-3 px-4">{{ FormatDate(task.createdDt) }}</td>
          <td class="text-left py-3 px-4">{{ FormatDate(task.dueDt) }}</td>
          <td class="text-left py-3 px-4"><input type="checkbox" :checked="task.isCompleted" disabled></td>
          <td class="text-left py-3 px-4"><input type="checkbox" :checked="task.isArchived" disabled></td>
          <td class="text-left py-3 px-4">{{ getCategoryName(task.todoCategoryId) }}</td>
          <td class="text-left py-3 px-4">{{ getPriorityName(task.todoPriorityId) }}</td>
          <td class="text-left py-3 px-4">{{ FormatDate(task.syncDt) }}</td>
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
  
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import GetService from '@/services/CRUD/GetService';
  import { state } from '@/state/AppState';
  import FormatDate from '@/utils/FormatDate';
  import type { IPriority } from '@/domain/IPriority';
  import type { ICategory } from '@/domain/ICategory';
  import type { ITask } from '@/domain/ITask';
  
  const isLoading = ref(true);
  const tasks = ref<ITask[]>([]);
  const categories = ref<ICategory[]>([]);
  const priorities = ref<IPriority[]>([]);
  
  const loadData = async () => {
    try {
      const responseData = await GetService.getContests(state.userInfo.token);
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
  

  
  const getCategoryName = (categoryId: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      return category.categoryName;
    }
    return "Unknown category";
  };
  
  const getPriorityName = (priorityId: string) => {
    const priority = priorities.value.find(p => p.id === priorityId);
    if (priority) {
      return priority.priorityName;
    }
    return "Unknown priority";
  };
  </script>import type { ICategory } from '@/domain/ICategory';
import type { IPriority } from '@/domain/IPriority';
import type { ITask } from '@/domain/ITask';
import type { ICategory } from '@/domain/ICategory';
import type { IPriority } from '@/domain/IPriority';
import type { ITask } from '@/domain/ITask';

