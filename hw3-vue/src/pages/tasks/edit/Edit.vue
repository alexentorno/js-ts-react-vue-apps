<template>
  <div class="container mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-5">Edit Category</h1>
    <div v-if="category" class="bg-gray-50 p-4 rounded-md shadow">
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label for="categoryName" class="block text-sm font-medium text-gray-700">Category Name</label>
            <input type="text" id="categoryName" v-model="category.categoryName" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div>
            <label for="categorySort" class="block text-sm font-medium text-gray-700">Category Sort</label>
            <input type="number" id="categorySort" v-model="category.categorySort" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div>
            <label for="syncDt" class="block text-sm font-medium text-gray-700">Sync Date</label>
            <input type="datetime-local" id="syncDt" v-model="category.syncDt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
          </div>
          <div class="mt-5 flex justify-start space-x-4">
          <button type="submit" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Save</button>
          <router-link :to="{name: 'categories'}" class="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">Back to List</router-link>
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
import type { ICategory } from '@/domain/ICategory';
import FormatDate from '@/utils/FormatDate';
import {state} from '@/state/AppState';



const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;

const category = ref<ICategory>();

const userInfo = state.userInfo;

const loadData = async () => {
      try {
        
          const response = await GetService.getCategoryById(userInfo.token, categoryId.toString());
          if (response) {
              category.value = response;
              console.log(category.value)
          }
      } catch (error: any) {
          console.log(error);
      }
  };

  onMounted(() => {
      if(categoryId){
          loadData();
      }
      console.log(category.value);
  });

  const handleSubmit = async () => {
  try {
    const updatedCategory = {
      id: categoryId,
      categoryName: category.value!.categoryName,
      categorySort: category.value!.categorySort,
      syncDt: category.value!.syncDt,
    };
    const response = await PutService.putCategory(state.userInfo.token, categoryId.toString(), updatedCategory as ICategory);
    if (response.data) {
      console.log('Category updated successfully:', response.data);
      router.push('/pages/categories');
    } else if (response.errors) {
      console.error('Errors:', response.errors);
    }
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

  
</script>
