<template>
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h1 class="text-xl font-bold mb-4">Create Priority</h1>
      <hr class="mb-4">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3">
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="priorityName" class="block text-gray-700 text-sm font-bold mb-2">PriorityName</label>
              <input type="text" id="priorityName" v-model="priority.priorityName" 
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
  
            <div class="mb-4">
              <label for="prioritySort" class="block text-gray-700 text-sm font-bold mb-2">PrioritySort</label>
              <input type="number" id="prioritySort" v-model="priority.prioritySort"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
  
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
          </form>
        </div>
      </div>
      <div class="mt-4">
        <router-link :to="{ name: 'priorities' }" class="text-blue-500 hover:text-blue-800">Back to List</router-link>
      </div>
    </div>
  </template>

  <script setup lang="ts">
import { ref } from 'vue';
import PostServise from '@/services/CRUD/PostService';
import type { IPriority } from '@/domain/IPriority';
import { state } from '@/state/AppState';
import { useRouter } from 'vue-router';

const priority = ref({
    priorityName: '',
    prioritySort: 0
});

const router = useRouter();

const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        try {
            console.log(priority.value.priorityName)
            const response = await PostServise.postPriority(state.userInfo!.token,
                {
                    priorityName: priority.value.priorityName,
                    prioritySort: parseInt(priority.value.prioritySort)
                } as IPriority);
            console.table(response);
            if (response.errors) {
                console.error(response.errors);

            } else {
                router.push('/pages/priorities');
            }
        } catch (error) {
            console.error(error);

        }

}
</script>