<template>
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h1 class="text-xl font-bold mb-4">Create Category</h1>
      <hr class="mb-4">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3">
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="categoryName" class="block text-gray-700 text-sm font-bold mb-2">CategoryName</label>
              <input type="text" id="categoryName" v-model="category.categoryName" 
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
  
            <div class="mb-4">
              <label for="categorySort" class="block text-gray-700 text-sm font-bold mb-2">CategorySort</label>
              <input type="number" id="categorySort" v-model="category.categorySort"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
  
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
          </form>
        </div>
      </div>
      <div class="mt-4">
        <router-link :to="{ name: 'categories' }" class="text-blue-500 hover:text-blue-800">Back to List</router-link>
      </div>
    </div>
  </template>

  <script setup lang="ts">
import { ref } from 'vue';
import PostServise from '@/services/CRUD/PostService';
import type { ICategory } from '@/domain/ICategory';
import { state } from '@/state/AppState';
import { useRouter } from 'vue-router';

const category = ref({
    categoryName: '',
    categorySort: 0
});

const router = useRouter();


const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        try {
            console.log(category.value.categoryName)
            const response = await PostServise.postCategory(state.userInfo!.token,
                {
                    categoryName: category.value.categoryName,
                    categorySort: parseInt(category.value.categorySort)
                } as ICategory);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                router.push('/pages/categories');
            }
        } catch (error) {
            console.error(error);

        }

}
</script>