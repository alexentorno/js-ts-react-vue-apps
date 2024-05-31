<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Edit Task</h1>
    <div v-if="!isLoading && task">
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div class="mb-4">
              <label for="taskName" class="block text-sm font-medium text-gray-700">Task Name</label>
              <input type="text" id="taskName" v-model="task.taskName" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" required>
            </div>
            <div class="mb-4">
              <label for="taskSort" class="block text-sm font-medium text-gray-700">Task Sort</label>
              <input type="number" id="taskSort" v-model="task.taskSort" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md">
            </div>
            <div class="mb-4">
              <label for="dueDt" class="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="datetime-local" id="dueDt" v-model="task.dueDt" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md">
            </div>
            <div class="mb-4">
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="task.isCompleted" class="form-checkbox h-5 w-5 text-gray-600"><span class="ml-2 text-gray-700">Is Completed</span>
              </label>
            </div>
            <div class="mb-4">
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="task.isArchived" class="form-checkbox h-5 w-5 text-gray-600"><span class="ml-2 text-gray-700">Is Archived</span>
              </label>
            </div>
            <div class="mb-4">
              <label for="todoCategoryId" class="block text-sm font-medium text-gray-700">Category</label>
              <select id="todoCategoryId" v-model="task.todoCategoryId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md">
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.categoryName }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="todoPriorityId" class="block text-sm font-medium text-gray-700">Priority</label>
              <select id="todoPriorityId" v-model="task.todoPriorityId" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md">
                <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.priorityName }}</option>
              </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700">Save Changes</button>
            <router-link :to="{name: 'tasks'}" class="ml-4 px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-700">Back to List</router-link>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <h2>Loading Task Details...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import PutService from '@/services/CRUD/PutService';
import { state } from '@/state/AppState';
import type { ICategory } from '@/domain/ICategory';
import type { IPriority } from '@/domain/IPriority';
import type { ITask } from '@/domain/ITask';

const router = useRouter();
const route = useRoute();
const taskId = route.params.id;
const task = ref<ITask | null>(null);

const categories = ref<ICategory[]>([]);
const priorities = ref<IPriority[]>([]);

const isLoading = ref(true);

const userInfo = state.userInfo;


const loadData = async () => {
        try {
            const response = await GetService.getTaskById(userInfo.token, taskId.toString());
            const categoriesData = await GetService.getCategory(state.userInfo.token);
            const prioritiesData = await GetService.getPriority(state.userInfo.token);
            if (response && categoriesData && prioritiesData) {
              task.value = response;
              categories.value = categoriesData.data;
              priorities.value = prioritiesData.data;
            }
            isLoading.value = false;
        } catch (error: any) {
            console.log(error);
            isLoading.value = false;
        }
    };

    onMounted(() => {
        if(taskId){
            loadData();
        }
    });

const handleSubmit = async () => {
  try {
    if (task.value) await PutService.putTask(state.userInfo.token, taskId, task.value);
    router.push('/pages/tasks');
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};
</script>