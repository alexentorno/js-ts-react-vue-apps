<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Edit Priority</h1>
    <div v-if="priority" class="bg-gray-50 p-4 rounded-md shadow">
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label for="priorityName" class="block text-sm font-medium text-gray-700">Priority Name</label>
            <input type="text" id="priorityName" v-model="priority.priorityName" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div>
            <label for="prioritySort" class="block text-sm font-medium text-gray-700">Priority Sort</label>
            <input type="number" id="prioritySort" v-model="priority.prioritySort" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div>
            <label for="syncDt" class="block text-sm font-medium text-gray-700">Sync Date</label>
            <input type="datetime-local" id="syncDt" v-model="priority.syncDt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div class="mt-5 flex justify-start space-x-4">
          <button type="submit" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Save</button>
          <router-link :to="{name: 'priorities'}" class="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
        </div>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import PutService from '@/services/CRUD/PutService';
import { onMounted, ref } from 'vue';
import type { IPriority } from '@/domain/IPriority';
import FormatDate from '@/utils/FormatDate';
import {state} from '@/state/AppState';



const route = useRoute();
const router = useRouter();
const priorityId = route.params.id;

const priority = ref<IPriority>();

const userInfo = state.userInfo;

const loadData = async () => {
      try {
          const response = await GetService.getPriorityById(userInfo.token, priorityId.toString());
          if (response) {
            priority.value = response;
              console.log(priority.value)
          }
      } catch (error: any) {
          console.log(error);
      }
  };

  onMounted(() => {
      if(priorityId){
          loadData();
      }
      console.log(priority.value);
  });

  const handleSubmit = async () => {
  try {
    const updatedPriority = {
      id: priorityId,
      priorityName: priority.value!.priorityName,
      prioritySort: priority.value!.prioritySort,
      syncDt: priority.value!.syncDt,
    };
    const response = await PutService.putPriority(state.userInfo.token, priorityId.toString(), updatedPriority as IPriority);
    if (response.data) {
      console.log('Priority updated successfully:', response.data);
      router.push('/pages/priorities');
    } else if (response.errors) {
      console.error('Errors:', response.errors);
    }
  } catch (error) {
    console.error('Error updating priority:', error);
  }
};

  
</script>
