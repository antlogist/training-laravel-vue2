<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check availability
      <span v-if="noAvailability" class="text-danger">(not available)</span>
      <span v-if="hasAvailability" class="text-success">(available)</span>
    </h6>
    <div class="row">

      <div class="form-group col-6 pb-4">
        <label for="from">From</label>
        <input
        @keyup.enter="check"
        type="text"
        name="from"
        class="form-control form-control-sm"
        placeholder="Start date"
        v-model="from"
        :class="[{'is-invalid': errorFor('from')}]">
        <div class="invalid-feedback"
          v-for="(error, index) in errorFor('from')"
          :key="'form' + index">{{ error }}
        </div>
      </div>

      <div class="form-group col-6 pb-4">
        <label for="to">To</label>
        <input
        @keyup.enter="check"
        type="text"
        name="to"
        class="form-control form-control-sm"
        placeholder="End date"
        v-model="to"
        :class="[{'is-invalid': errorFor('to')}]">
        <div class="invalid-feedback"
          v-for="(error, index) in errorFor('to')"
          :key="'to' + index">{{ error }}
        </div>
      </div>

    </div>
    <div class="d-grid">
      <button
        class="btn btn-secondary"
        @click="check" :disabled="loading">Check</button>
    </div>

  </div>
</template>

<script>
import {is422} from './../shared/utils/response';
export default {
  props: {
    bookableId: String
  },
  data() {
    return {
      from: null,
      to: null,
      loading: false,
      status: null,
      errors: null
    }
  },
  methods: {
    check() {
      this.loading = true;
      this.errors = null;

      axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
      .then(response => {
        this.status = response.status;
      }).catch(error => {
        if(is422(error)) {
          this.errors = error.response.data.errors;
          console.log(error);
          this.loading = false;
        }
        this.status = error.response.status;
      }).then(() => {
        this.loading = false;
      });
    },
    errorFor(field) {
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
    }
  },
  computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
    hasAvailability() {
      return 200 === this.status;
    },
    noAvailability() {
      return 404 === this.status;
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