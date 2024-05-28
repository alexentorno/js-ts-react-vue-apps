<template>
    <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold mb-5">Category Details</h1>
      <div v-if="category" class="bg-gray-50 p-4 rounded-md shadow">
        <hr class="my-4" />
        <!-- Adjusting grid columns: giving labels less space -->
        <div class="grid grid-cols-3 gap-2">
          <div class="font-semibold col-span-1">Category Name:</div>
          <div class="col-span-2">{{ category.categoryName }}</div>
  
          <div class="font-semibold col-span-1">Category Sort:</div>
          <div class="col-span-2">{{ category.categorySort }}</div>
  
          <div class="font-semibold col-span-1">Sync Date:</div>
          <div class="col-span-2">{{ FormatDate(category.syncDt) }}</div>
        </div>
        <div class="mt-5 flex justify-start space-x-4">
          <router-link :to="{ name: 'edit-category', params: { id: category.id }}" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Go to Edit</router-link>
          <router-link :to="{ name: 'categories'}" class="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg">Loading...</p>
      </div>
    </div>
  </template>
  
  

<script setup lang="ts">
import { useRoute } from 'vue-router';
import GetService from '@/services/CRUD/GetService';
import { onMounted, ref } from 'vue';
import type { ICategory } from '@/domain/ICategory';
import FormatDate from '@/utils/FormatDate';
import {state} from '@/state/AppState';


const route = useRoute();
const categoryId = route.params.id;

const category = ref<ICategory | null>(null);

const userInfo = state.userInfo;

const loadData = async () => {
        try {
            const response = await GetService.getCategoryById(userInfo.token, categoryId.toString());
            if (response) {
                category.value = response;
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    onMounted(() => {
        if(categoryId){
            loadData();
        }
    });
</script>