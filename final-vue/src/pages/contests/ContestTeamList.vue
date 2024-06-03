<template>
    <div class="mt-8">
      <div v-if="isLoading">
        <h2>Loading Contests...</h2>
      </div>
        <div v-else>
          <h1 class="text-xl font-semibold mb-4 ml-5">Contest "{{ contestName }}"</h1>
          <div class="collapse collapse-arrow ">
            <input type="radio" class="cursor-pointer py-1 px-2" name="my-accordion-1" :checked="isChecked" @click="isChecked = !isChecked"/> 
            <div class="ml-3 mb-4 w-1/5 collapse-title text-lg font-medium bg-sky-400 rounded-2xl">
              Register
            </div>
            <div class="collapse-content"> 
              <!-- <TeamRegisterForm classes={{ contests.contestClasses }}/> -->
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
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg">
              <thead class="bg-gray-800 text-white">
                <tr>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Team</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr v-for="(contest, index) in contests!.userTeams" :key="contest.id"
                :class="{'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0}">
                  <td class="text-left py-3 px-4">{{ contest.name }}</td>
                  <td class="text-left py-3 px-4">
                    {{ contest.startDT ? `started at ${FormatDate(contest.startDT)}` : 'not started yet' }}
                  </td>
                  <td>
                    <router-link :to="{name: 'participate-in-contest', params: { id: contest.id } }" 
                    class="text-blue-500 hover:text-blue-600 text-sm underline underline-offset-2">Participate...</router-link> 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <div v-if="isActiveToast">
      <div class="toast">
  <div class="alert alert-info">
    <span>Team added successfully!</span>
  </div>
</div>
    </div>
      </template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import GetService from '@/services/CRUD/GetService';
import FormatDate from '@/utils/FormatDate';
import { state } from '@/state/AppState';
import { useRoute } from 'vue-router';
import TeamRegisterForm from '@/pages/forms/TeamRegisterForm.vue';
import type { IContestTeams } from '@/domain/IContestTeams';

const isChecked = ref(false);

const userInfo = state.userInfo;
const route = useRoute();

const isLoading = ref(true);
const contests = ref<IContestTeams>();
const contestName = ref("");

provide('contestClassesInfo', contests.value);

const contestId = route.params.id;

  const loadData = async () => {
    try {
      const response = await GetService.getContestTeamsById(contestId.toString());
      
      if (response) {
        console.log('Result:', response);
        contests.value = response;
        contestName.value = response.contestInfo.name;
        // console.log(contestName.value);
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

 // ---------------------------------------------

 import PostServise from '@/services/CRUD/PostService';
import { inject, reactive } from 'vue';
  import { useRouter } from 'vue-router';
import type { IRegisterTeam } from '@/domain/IRegisterTeam';
  
  const router = useRouter();

  const teamName = ref("");
  const selectedClass = ref("");
  const teamMembers = ref("");

  const isActiveToast = ref(false);

//   const contestInfo = inject('contestClassesInfo');

 const props = defineProps(['classes']);


  const createTeam = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    console.log("Classes: ", props.classes)
    console.log("Creating team with:", { teamName: teamName.value, class: selectedClass.value, members: teamMembers.value });
    const teamData = {
    contestId: route.params.id,
    contestClassId: contests.value?.contestClasses.find((x) => x.value === selectedClass.value)?.key,
    teamName: teamName.value,
    teamMembers: teamMembers.value
    };

    try{
      const response = await PostServise.registerTeamForContest(teamData as IRegisterTeam);

      if (response.errors) {
          console.error(response.errors);

      } else {
          loadData();
          isChecked.value = false;
           
          isActiveToast.value = true;
          setTimeout(() => isActiveToast.value = false, 4000);
      }
    } catch (error) {
        console.error(error);

    };
  }
  

</script>