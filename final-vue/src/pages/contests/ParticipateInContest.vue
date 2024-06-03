<template>
    <div class="min-h-screen mt-8">
      <h1 class="text-xl font-semibold mb-4 ml-5">List of Contests</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mx-3 mb-4">
            <label for="cpId" class=" block text-sm font-medium text-slate-500 mb-2">Checkpoint Id</label>
            <input type="text" v-model="cpId" id="cpId"  autocomplete="" placeholder="Enter checkpoint Id" 
                   class="bg-white shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mt-5 ml-3">
            <button type="submit" :disabled="!cpId" 
                    class="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 
                           transition duration-300 disabled:bg-blue-300">Create</button>
        </div>
      </form>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import GetService from '@/services/CRUD/GetService';
import { IParticipate } from '@/domain/IParticipate';

const route = useRoute();
const userTeamId = route.params.id;
const participantInfo = ref<IParticipate | null>(null);

const cpId = ref('');

const loadData = async () => {
  try {
    const response = await GetService.getTeamParticipation(userTeamId);

    if (response.data) {
        console.log(response.data);
      participantInfo.value = response.data;
    }

    console.log("Participant Info:", participantInfo.value);
  } catch (error) {

      console.error("Failed to load data:", error);
}
};

onMounted(() => {
  loadData();
  console.log("Id: ", userTeamId);
  console.log(participantInfo.value);
});

</script>