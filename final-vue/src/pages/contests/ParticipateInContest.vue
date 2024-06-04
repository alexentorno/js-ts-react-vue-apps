<template>
    <div class="min-h-screen mt-8">
      <h1 class="text-xl font-semibold mb-4 ml-5">Mark Checkpoints</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mx-3 mb-4">
            <label for="cpId" class=" block text-sm font-medium text-slate-500 mb-2">Checkpoint Id</label>
            <input type="text" v-model="cpId" id="cpId"  autocomplete="" placeholder="Enter checkpoint Id" 
                   class="bg-white shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 
                          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="flex">
          <div class=" ml-3">
            <button type="submit" :disabled="!cpId" 
                    class="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 
                           transition duration-300 disabled:bg-blue-300">Mark</button>
        </div>
        <div class=" ml-3">
            <button type="button" @click="isActiveScanner = !isActiveScanner" 
                    class="py-2 px-4 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-700 
                           transition duration-300">Use Scanner</button>
        </div>
        </div>
        
      </form>
      <div v-if="isActiveMessage">
      <div class="toast position-absolute z-50">
          <div class="alert alert-info">
              <span>{{ afterMarkMessage }}</span>
          </div>
      </div>
  </div>
      <hr class="my-4 mx-4" />
        <div v-if="!isLoading && participantInfo">
            <div class="grid grid-cols-3 gap-1 ml-3">
                <div class="font-semibold col-span-1">Team Name:</div>
                <div class="col-span-2">{{ participantInfo.teamName }}</div>
        
                <div class="font-semibold col-span-1">Start:</div>
                <div class="col-span-2">{{ participantInfo.startDT ? FormatDate(participantInfo.startDT) : 'DNS' }}</div>
        
                <div class="font-semibold col-span-1">Score:</div>
                <div class="col-span-2">{{ participantInfo.score }}</div>

                <div class="font-semibold col-span-1">Bonus:</div>
                <div class="col-span-2">{{ participantInfo.bonus }}</div>

                <div class="font-semibold col-span-1">Penalty:</div>
                <div class="col-span-2">{{ participantInfo.penalty }}</div>
                
                <div class="font-semibold col-span-1">Final Score:</div>
                <div class="col-span-2">{{ participantInfo.finalScore }}</div>
            </div>
            <div v-if="isActiveScanner" class="w-2/3">
              <QrScannerForm @qr-scanned="handleQrScanned"/>
              
            </div>
        </div>
        <div v-else>
            <h2>Loading data...</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { inject, onMounted, ref } from 'vue';
import GetService from '@/services/CRUD/GetService';
import PostService from '@/services/CRUD/PostService';
import type { IParticipate } from '@/domain/IParticipate';
import type { IMarking } from '@/domain/IMarking';
import FormatDate from '@/utils/FormatDate';
import QrScannerForm from '@/pages/forms/QrScannerForm.vue';

const isLoading = ref(true);

const route = useRoute();
const userTeamId = route.params.id;
const participantInfo = ref<IParticipate | null>(null);

const cpId = ref('');

const afterMarkMessage = ref('');
const isActiveMessage = ref(false);
const isActiveScanner = ref(false);

const loadData = async () => {
  try {
    const response = await GetService.getTeamParticipation(userTeamId);

    if (response.data) {
        console.log(response.data);
      participantInfo.value = response.data;
      
      
    }
    isLoading.value = false;
    // console.log("Participant Info:", participantInfo.value);
    // console.log("team name: ", participantInfo.value.teamName);
    // console.log("bonus: ", participantInfo.value.bonus);
  } catch (error) {

      console.error("Failed to load data:", error);
}
};

onMounted(() => {
  loadData();
  console.log("Id: ", userTeamId);
  console.log(participantInfo.value);
});

const handleSubmit = async () => {
  try {
    const response = await PostService.markCheckpoint({
        checkPointId: cpId.value,
        userTeamId: userTeamId
        
    } as IMarking);
    if (response.data) {
      console.log(response.data);
      if (response.data.message) {
        afterMarkMessage.value = response.data.message;
        isActiveMessage.value = true;
        setTimeout(() => isActiveMessage.value = false, 5000);
      }
      loadData();
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
};


const handleQrScanned = (text: string) => {
  // console.log("Qr Scanned: ", text);
  cpId.value = text;
  handleSubmit();
};



</script>