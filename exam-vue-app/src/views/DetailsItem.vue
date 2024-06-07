<template>
  <div class="container">
    <h1>Details</h1>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">Description</dt>
      <dd class="col-sm-10">{{ item.description }}</dd>
      <dt class="col-sm-2">Completed</dt>
      <dd class="col-sm-10">
        <input type="checkbox" :checked="item.completed" disabled />
      </dd>
    </dl>
    <div>
      <router-link :to="{ name: 'editItem', params: { id: item.id } }" class="btn btn-primary me-2"
        >Edit</router-link
      >
      <router-link to="/items" class="btn btn-secondary">Back to List</router-link>
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
  }
}
</script>
