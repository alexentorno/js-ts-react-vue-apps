<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Task Details</h1>
    <div v-if="task" class="bg-gray-50 p-4 rounded-md shadow">
      <hr class="my-4" />
        <div class="grid grid-cols-3 gap-2">
          <div class="font-semibold col-span-1">Category Name:</div>
          <div class="col-span-2">{{ task.taskName }}</div>
  
          <div class="font-semibold col-span-1">Category Sort:</div>
          <div class="col-span-2">{{ task.taskSort }}</div>
  
          <div class="font-semibold col-span-1">Sync Date:</div>
          <div class="col-span-2">{{ FormatDate(task.syncDt) }}</div>

          <div class="font-semibold col-span-1">Due Date:</div>
          <div class="col-span-2">{{ FormatDate(task.dueDt) }}</div>

          <div class="font-semibold col-span-1">Created Date:</div>
          <div class="col-span-2">{{ FormatDate(task.createdDt) }}</div>
          
          <div class="font-semibold col-span-1">Is Completed:</div>
          <div class="col-span-2"><input type="checkbox" :checked="task.isCompleted" disabled></div>

          <div class="font-semibold col-span-1">Is Archived:</div>
          <div class="col-span-2"><input type="checkbox" :checked="task.isArchived" disabled></div>

          <div class="font-semibold col-span-1">Category:</div>
          <div class="col-span-2">{{ getCategoryName(task.todoCategoryId) }}</div>

          <div class="font-semibold col-span-1">Priority:</div>
          <div class="col-span-2">{{ getPriorityName(task.todoPriorityId) }}</div>
        </div>
        <div class="mt-5 flex justify-start space-x-4">
        <button @click="showConfirmation = true" class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">Delete</button>
          <router-link :to="{ name: 'edit-task', params: { id: task.id }}" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Go to Edit</router-link>
          <router-link :to="{ name: 'tasks' }" class="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
        </div>
        <div v-if="showConfirmation" class="mt-4 p-4 bg-red-100 border border-red-400 rounded">
        <p class="mb-4">Are you sure you want to delete your category: {{ task.taskName }}?</p>
        <button @click="handleSubmit" class="py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold rounded-lg">Yes</button>
        <button @click="showConfirmation = false" class="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-lg ml-4">No</button>
      </div>
    </div>
    <div v-else>
      <h2 class="text-lg font-medium">Loading Task Details...</h2>
    </div>
  </div>
</template>
  
  

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import { onMounted, ref } from 'vue';
import type { ITask } from '@/domain/ITask';
import FormatDate from '@/utils/FormatDate';
import { state } from '@/state/AppState';
import type { ICategory } from '@/domain/ICategory';
import type { IPriority } from '@/domain/IPriority';
import DeleteService from '@/services/CRUD/DeleteService';

const showConfirmation = ref(false);

const route = useRoute();
const router = useRouter();
const taskId = route.params.id;

const task = ref<ITask | null>(null);

const categories = ref<ICategory[]>([]);
const priorities = ref<IPriority[]>([]);

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
        } catch (error: any) {
            console.log(error);
        }
    };

    onMounted(() => {
        if(taskId){
            loadData();
        }
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await DeleteService.deleteTask(userInfo.token, taskId.toString());

        if (response.errors) {
            console.error(response.errors);

        } else {

            router.push('/pages/tasks');
            showConfirmation.value = false;
        }
    } catch (error: any) {
        console.error(error);

    }
  };

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
</script>