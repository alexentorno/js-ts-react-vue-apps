<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Create Task</h1>
    <hr class="mb-4">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="taskName" class="block text-sm font-medium text-gray-700">Task Name</label>
        <input type="text" id="taskName" v-model="task.taskName" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
      </div>
      <div>
        <label for="taskSort" class="block text-sm font-medium text-gray-700">Task Sort</label>
        <input type="number" id="taskSort" v-model="task.taskSort" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div>
        <label for="dueDt" class="block text-sm font-medium text-gray-700">Due Date</label>
        <input type="datetime-local" id="dueDt" v-model="task.dueDt" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="isCompleted" v-model="task.isCompleted" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
        <label for="isCompleted" class="ml-2 block text-sm text-gray-900">Is Completed</label>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="isArchived" v-model="task.isArchived" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
        <label for="isArchived" class="ml-2 block text-sm text-gray-900">Is Archived</label>
      </div>
      <div>
        <label for="todoCategoryId" class="block text-sm font-medium text-gray-700">Category</label>
        <select id="todoCategoryId" v-model="task.todoCategoryId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.categoryName }}</option>
        </select>
      </div>
      <div>
        <label for="todoPriorityId" class="block text-sm font-medium text-gray-700">Priority</label>
        <select id="todoPriorityId" v-model="task.todoPriorityId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.priorityName }}</option>
        </select>
      </div>
      <div class="mt-5">
        <button type="submit" class="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Create</button>
        <router-link to="/tasks" class="py-2 px-4 ml-4 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
      </div>
    </form>
  </div>
      </div>
  </div>
</template>

  <script setup lang="ts">
import { onMounted, ref } from 'vue';
import PostServise from '@/services/CRUD/PostService';
import type { ITask } from '@/domain/ITask';
import { state } from '@/state/AppState';
import { useRouter } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import type { ICategory } from '@/domain/ICategory';
import type { IPriority } from '@/domain/IPriority';

const task = ref({
  taskName: '',
  taskSort: 0,
  dueDt: '',
  isCompleted: false,
  isArchived: false,
  todoCategoryId: '',
  todoPriorityId: ''
});

const router = useRouter();

const categories = ref<ICategory[]>([]);
const priorities = ref<IPriority[]>([]);

const loadData = async () => {
    try {
      const categoriesData = await GetService.getCategory(state.userInfo.token);
      const prioritiesData = await GetService.getPriority(state.userInfo.token);
      if (categoriesData.data && prioritiesData.data) {
        
        categories.value = categoriesData.data;
        priorities.value = prioritiesData.data;
      }
      console.log("Categories:", categories.value);
      console.log("Priorities:", priorities.value);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };
  
  onMounted(() => {
    loadData();
  });


const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        try {
            
            const response = await PostServise.postTask(state.userInfo!.token,
            task.value as ITask);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                router.push('/pages/tasks');
            }
        } catch (error) {
            console.error(error);

        }

}
</script>