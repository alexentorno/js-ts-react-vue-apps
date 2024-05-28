<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Priority Details</h1>
    <div v-if="priority" class="bg-gray-50 p-4 rounded-md shadow">
      <hr class="my-4" />
      <!-- Adjusting grid columns: giving labels less space -->
      <div class="grid grid-cols-3 gap-2">
        <div class="font-semibold col-span-1">Priority Name:</div>
        <div class="col-span-2">{{ priority.priorityName }}</div>

        <div class="font-semibold col-span-1">Priority Sort:</div>
        <div class="col-span-2">{{ priority.prioritySort }}</div>

        <div class="font-semibold col-span-1">Sync Date:</div>
        <div class="col-span-2">{{ FormatDate(priority.syncDt) }}</div>
      </div>
      <div class="mt-5 flex justify-start space-x-4">
        <button @click="showConfirmation = true" class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">Delete</button>
        <router-link :to="{ name: 'edit-priority', params: { id: priority.id }}" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Go to Edit</router-link>
        <router-link :to="{ name: 'priorities'}" class="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
      </div>
      <!-- Confirmation Section -->
      <div v-if="showConfirmation" class="mt-4 p-4 bg-red-100 border border-red-400 rounded">
        <p class="mb-4">Are you sure you want to delete your priority: {{ priority.priorityName }}?</p>
        <button @click="handleSubmit" class="py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold rounded-lg">Yes</button>
        <button @click="showConfirmation = false" class="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-lg ml-4">No</button>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-lg">Loading...</p>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import DeleteService from '@/services/CRUD/DeleteService';
import { onMounted, ref } from 'vue';
import FormatDate from '@/utils/FormatDate';
import { state } from '@/state/AppState';
import type { IPriority } from '@/domain/IPriority';

const showConfirmation = ref(false);

const route = useRoute();
const router = useRouter();
const priorityId = route.params.id;

const priority = ref<IPriority | null>(null);

const userInfo = state.userInfo;

const loadData = async () => {
      try {
          const response = await GetService.getPriorityById(userInfo.token, priorityId.toString());
          if (response) {
            priority.value = response;
          }
      } catch (error: any) {
          console.log(error);
      }
  };

  onMounted(() => {
      if(priorityId){
          loadData();
      }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await DeleteService.deletePriority(userInfo.token, priorityId.toString());

        if (response.errors) {
            console.error(response.errors);

        } else {

            router.push('/pages/priorities');
            showConfirmation.value = false;
        }
    } catch (error: any) {
        console.error(error);

    }
  };
</script>
