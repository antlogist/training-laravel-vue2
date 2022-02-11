<template>
  <div>
    <div class="invalid-feedback"
      v-for="(error, index) in errors"
      :key="key(index)">{{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['errors'],
  methods: {
    key(index) {
      return `validation_error_${Math.random()}_${index}`;
    }
  }
}
</script>

<style scoped>
.form-control.is-invalid ~ div > .invalid-feedback {
  display: block;
}
.form-select.is-invalid ~ div > .invalid-feedback {
  display: block;
}
</style>
