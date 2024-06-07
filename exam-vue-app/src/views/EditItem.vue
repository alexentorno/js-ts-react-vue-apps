<template>
  <div class="container">
    <h1>Edit</h1>
    <hr />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="description" required />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="completed" v-model="completed" />
        <label class="form-check-label" for="completed">Completed</label>
      </div>
      <button type="submit" class="btn btn-primary mt-3 me-2">Save</button>
      <router-link to="/items" class="btn btn-secondary mt-3">Back to List</router-link>
    </form>
    <div>
      <br />
    </div>
  </div>
</template>

<script>
import ItemService from '@/services/ItemService'

export default {
  data() {
    return {
      item: null,
      description: '',
      completed: false,
      error: null
    }
  },
  async created() {
    try {
      const item = await ItemService.getById(this.$route.params.id)
      this.item = item
      this.description = item.description
      this.completed = item.completed
    } catch (error) {
      this.error = 'Failed to fetch item'
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await ItemService.update({
          id: this.$route.params.id,
          description: this.description,
          completed: this.completed
        })
        this.$router.push('/items')
      } catch (error) {
        this.error = 'Failed to update item'
      }
    }
  }
}
</script>
