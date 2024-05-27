<template>
    <div>
      <h1>Edit Category ID: {{ categoryId }}</h1>
      <!-- Component Logic -->
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const categoryId = route.params.id; // Accessing dynamic parameter
  </script>