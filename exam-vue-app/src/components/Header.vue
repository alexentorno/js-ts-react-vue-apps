<script setup lang="ts"></script>

<template>
  <header>
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand">WebApp</router-link>
        <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <router-link to="/items" class="nav-link text-dark">ListItem</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
