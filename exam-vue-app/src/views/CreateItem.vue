<template>
  <div class="container my-5">
    <h1>Create New Item</h1>
    <hr />
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input type="text" class="form-control" id="description" v-model="description" required />
      </div>
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="completed" v-model="completed" />
        <label class="form-check-label" for="completed">Completed</label>
      </div>
      
      <button type="submit" class="btn btn-primary mt-3 me-2">Create</button>
      <router-link to="/items" class="btn btn-secondary mt-3">Back to List</router-link>
    </form>
    <br />
  </div>
</template>

<script setup>
import ItemService from '@/services/ItemService'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const errorMessage = ref('');
const description = ref('');
const completed = ref(false);


const prohibitedWords = ref(JSON.parse(localStorage.getItem('prohibitedWords')) || []);

  
  const handleSubmit = async () => {

    const trimmedDescription = description.value.trim();
    if (!trimmedDescription) {
      errorMessage.value = 'Description cannot be empty';
      return;
    }

    const lowerCaseWords = prohibitedWords.value.map(word => word.toLowerCase());
    if (lowerCaseWords.some(word => trimmedDescription.toLowerCase().includes(word))) {
      errorMessage.value = 'Description contains prohibited words';
      return;
    }

    try {
      await ItemService.create({ description: description.value, completed: completed.value })

      router.push('/items')
    } catch (error) {
      errorMessage.value = 'Failed to create item'
      console.log(error)
    }
  }
  

</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>