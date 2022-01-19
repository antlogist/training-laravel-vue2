<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check availability
    </h6>
    <div class="row">

      <div class="form-group col-6 pb-4">
        <label for="from">From</label>
        <input type="text" name="from" class="form-control form-control-sm" placeholder="Start date" v-model="from">
      </div>

      <div class="form-group col-6 pb-4">
        <label for="to">To</label>
        <input type="text" name="to" class="form-control form-control-sm" placeholder="End date" v-model="to">
      </div>

    </div>
    <div class="d-grid">
      <button class="btn btn-secondary">Check</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      from: null,
      to: null
    }
  }
}
</script>

<style scoped>
label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: bolder;
}
</style>