<template>
  <div class="container">
    <h1>Delete</h1>
    <p>Are you sure you want to delete this?</p>
    <hr />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <dl class="row">
      <dt class="col-sm-2">Description</dt>
      <dd class="col-sm-10">{{ item.description }}</dd>
      <dt class="col-sm-2">Completed</dt>
      <dd class="col-sm-10">
        <input type="checkbox" :checked="item.completed" disabled />
      </dd>
    </dl>
    <div>
      <button @click="handleDelete" class="btn btn-danger mt-3 me-2">Delete</button>
      <router-link to="/items" class="btn btn-secondary mt-3">Back to List</router-link>
    </div>
    <br />
  </div>
</template>

<script>
import ItemService from '@/services/ItemService'

export default {
  data() {
    return {
      item: {},
      error: null
    }
  },
  async created() {
    try {
      this.item = await ItemService.getById(this.$route.params.id)
    } catch (error) {
      this.error = 'Failed to fetch item'
    }
  },
  methods: {
    async handleDelete() {
      try {
        await ItemService.delete(this.$route.params.id)
        this.$router.push('/items')
      } catch (error) {
        this.error = 'Failed to delete item'
      }
    }
  }
}
</script>
