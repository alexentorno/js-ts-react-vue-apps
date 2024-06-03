<template>
    <div class="bg-gray-100 border border-gray-300 rounded-md p-4 w-3/5">
        <div class="mb-4">
            <label for="teamName" class="block text-sm font-medium text-slate-500 mb-2">Team Name</label>
            <input type="text" v-model="teamName" id="teamName" placeholder="Please be polite and short :)" 
            class="shadow-sm rounded-md w-full px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mb-4">
            <label for="classSelect" class="block text-sm font-medium text-slate-500 mb-2">Class</label>
            <select v-model="selectedClass" id="classSelect" 
                    class="shadow-sm rounded-md w-full px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option disabled value="">Please select</option>
                <option>2 Minutes, 4 max</option>
                <option>2 Minutes, no max</option>
            </select>
        </div>
        <div class="mb-4">
            <label for="teamMembers" class="block text-sm font-medium text-slate-500 mb-2">Team Members</label>
            <input type="text" v-model="teamMembers" id="teamMembers" placeholder="Enter your team members"  
            class="shadow-sm rounded-md w-full px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <button type="button" @click="createTeam"
                class="mt-4 w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200">
            Create
        </button>

    </div>

    
</template>


<script setup lang="ts">
  import PostServise from '@/services/CRUD/PostService';
import { state } from '@/state/AppState';
import { inject, provide, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();

  const teamName = ref("");
  const selectedClass = ref("");
  const teamMembers = ref("");

//   const contestInfo = inject('contestClassesInfo');

 const props = defineProps(['classes']);


  const createTeam = async () => {
    console.log("Classes: ", props.classes)
    console.log("Creating team with:", { teamName: teamName.value, class: selectedClass.value, members: teamMembers.value });
    const teamData = {
    contestId: route.params.id,
    contestClassId: props.classes,
    teamName: teamName,
    teamMembers: teamMembers
    };

    // const response = await PostServise.registerTeamForContest(teamData)

    console.log(state)
    console.log(contestInfo)

    // provide('teamData', teamData);
  }

  </script>