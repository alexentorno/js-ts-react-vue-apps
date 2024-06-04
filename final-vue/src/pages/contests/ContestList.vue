<template>
  <div class="mt-8">
    <h1 class="text-2xl font-bold mb-6 ml-5">List of Contests</h1>
    <div v-if="isLoading && contests">
      <h2 class="text-lg text-gray-700 ml-5">Loading Contests...</h2>
    </div>
    <div v-else>
      <div class="overflow-x-auto shadow-lg rounded-lg">
        <table class="min-w-full bg-white rounded-lg">
          <thead>
            <tr class="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Open To</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(contest, index) in contests" :key="contest.id"
              :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
              <td class="text-left py-3 px-4 border-b border-gray-200">{{ contest.name }}</td>
              <td class="text-left py-3 px-4 border-b border-gray-200">{{ FormatDate(contest.openTo) }}</td>
              <td class="text-left py-3 px-4 border-b border-gray-200">
                <router-link :to="userInfo ? { name: 'to-contest-teams', params: { id: contest.id } } : {name: 'login'}"
                  class="text-blue-500 hover:text-blue-700 font-semibold">Participate</router-link>
                |
                <router-link :to="{ name: 'contest-results', params: { id: contest.id }}"
                  class="text-blue-500 hover:text-blue-700 font-semibold">Result</router-link>
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
import type { IContest } from '@/domain/IContest';
import FormatDate from '@/utils/FormatDate';
import { state } from '@/state/AppState';

const userInfo = state.userInfo;

    const isLoading = ref(true);
    const contests = ref<IContest[]>([]);

  const loadData = async () => {
    try {
      const response = await GetService.getContests();
    //   console.log(response);
      if (response.data) {
        contests.value = response.data;
        
        isLoading.value = false;
    }
    } catch (error) {
      console.error("Failed to load data:", error);
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    loadData();
  });
</script>