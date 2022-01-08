<template>

<div class="card mb-1">
  <div class="card-body">
    <h5 class="card-title">{{ itemTitle }}</h5>
    <p class="card-text">{{ itemContent }}</p>
    <p class="catd-text">{{ price }}</p>
  </div>
</div>

</template>

<script>
export default {
  props: {
    "itemTitle": String,
    "itemContent": String,
    "price": Number
  },

  mounted() {
    console.log({mounted: "child component" , itemTitle: this.itemTitle});
  }

}
</script>
