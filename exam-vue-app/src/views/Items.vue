<template>
  <div id="app" class="container my-5">

    <div v-if="showAdminUI" class="admin-ui mt-3">
      <h2>Prohibited Words List</h2>
      <ul class="list-group">
        <li v-for="(word, index) in prohibitedWords" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          {{ word }}
          <button @click="removeProhibitedWord(index)" class="btn btn-danger btn-sm">Remove</button>
        </li>
      </ul>
      <input v-model="newProhibitedWord" @keyup.enter="addProhibitedWord" placeholder="Add prohibited word" class="form-control mt-3" />
      <button @click="addProhibitedWord" class="btn btn-primary mt-2">Add Word</button>
    </div>

    <h1 class="text-center mb-4">Shopping List</h1>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <router-link to="/items/create" class="btn btn-primary">Create New</router-link>
      <button @click="clearFilters" class="btn btn-warning">Clear Filters</button>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <label for="filter" class="form-label">Filter by status:</label>
        <select id="filter" v-model="filterStatus" @change="filterItems" class="form-select">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="search" class="form-label">Search:</label>
        <input id="search" v-model="searchQuery" @input="filterItems" class="form-control" />
      </div>
      <div class="col-md-4">
        <label for="sort" class="form-label">Sort by:</label>
        <select id="sort" v-model="sortBy" @change="sortItems" class="form-select">
          <option value="description">Description</option>
          <option value="completed">Completed Status</option>
        </select>
      </div>
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Description</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.description }}</td>
          <td>
            <input type="checkbox" :checked="item.completed" disabled />
          </td>
          <td>
            <router-link
              :to="{ name: 'editItem', params: { id: item.id } }"
              class="btn btn-primary btn-sm me-2"
              >Edit</router-link
            >
            <router-link
              :to="{ name: 'detailsItem', params: { id: item.id } }"
              class="btn btn-info btn-sm me-2"
              >Details</router-link
            >
            <router-link
              :to="{ name: 'deleteItem', params: { id: item.id } }"
              class="btn btn-danger btn-sm"
              >Delete</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>

    <br />
    
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ItemService from '@/services/ItemService';

const itemsMutable = ref([]);
const error = ref(null);
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const prohibitedWords = ref(JSON.parse(localStorage.getItem('prohibitedWords')) || []);
const filterStatus = ref('all');
const searchQuery = ref('');
const sortBy = ref('description');
const newProhibitedWord = ref('');
const showAdminUI = ref(false);

const loadData = async (completed) => {
  try {
    const response = await ItemService.getAll(completed);
    itemsMutable.value = response;
  } catch (err) {
    error.value = 'Failed to load items';
  }
  isLoading.value = false;
};

const toggleAdminUI = () => {
  showAdminUI.value = !showAdminUI.value;
};

const handleKeyDown = (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
    toggleAdminUI();
  }
};

onMounted(() => {
  const completedParam = route.query.completed;
  if (completedParam !== undefined) {
    loadData(completedParam === 'true');
  } else {
    loadData();
  }

  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const setFilter = (completedValue) => {
  if (completedValue === null) {
    router.push('/items');
  } else {
    router.push(`/items?completed=${completedValue}`);
  }
};

const filterItems = () => {
  // The computed property filteredItems will automatically update based on filterStatus and searchQuery
};

const sortItems = () => {
  // The computed property filteredItems will automatically update based on sortBy
};

const filteredItems = computed(() => {
  let filtered = itemsMutable.value;

  if (filterStatus.value === 'completed') {
    filtered = filtered.filter(item => item.completed);
  } else if (filterStatus.value === 'incomplete') {
    filtered = filtered.filter(item => !item.completed);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(item => item.description.toLowerCase().includes(query));
  }

  return filtered.sort((a, b) => {
    if (sortBy.value === 'description') {
      return a.description.localeCompare(b.description);
    } else if (sortBy.value === 'completed') {
      return a.completed - b.completed;
    }
  });
});

const clearFilters = () => {
  filterStatus.value = 'all';
  searchQuery.value = '';
  sortBy.value = 'description';
  filterItems();
};

const addProhibitedWord = () => {
  const trimmedWord = newProhibitedWord.value.trim();
  if (trimmedWord && !prohibitedWords.value.includes(trimmedWord)) {
    prohibitedWords.value.push(trimmedWord);
    newProhibitedWord.value = '';
    saveProhibitedWords();
  }
};

const removeProhibitedWord = (index) => {
  prohibitedWords.value.splice(index, 1);
  saveProhibitedWords();
};

const saveProhibitedWords = () => {
  localStorage.setItem('prohibitedWords', JSON.stringify(prohibitedWords.value));
};

watch(prohibitedWords, saveProhibitedWords, { deep: true });

watch(
  () => route.query.completed,
  (newVal) => {
    if (newVal !== undefined) {
      loadData(newVal === 'true');
    } else {
      loadData();
    }
  }
);

</script>

<style scoped>
.admin-ui {
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>
