<template>

<div class="card mb-1 w-100">
  <div class="card-body">
    <router-link :to="{ name: 'bookable', params: {id} }"><h5>{{ title }}</h5></router-link>
    <p class="card-text">{{ description }}</p>
    <p class="catd-text">{{ id }}</p>
  </div>
</div>

</template>

<script>
export default {
  props: {
    "title": String,
    "description": String,
    "id": Number
  },

  mounted() {
    console.log({mounted: "child component" ,
    itemTitle: this.itemTitle});
  }

}
</script>
