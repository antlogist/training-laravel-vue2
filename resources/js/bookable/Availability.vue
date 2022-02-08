<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check availability

      <transition name="fade">
        <span v-if="noAvailability" class="text-danger">(not available)</span>
        <span v-if="hasAvailability" class="text-success">(available)</span>
      </transition>

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
        <ValidationErrors :errors="errorFor('from')"></ValidationErrors>
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
        <ValidationErrors :errors="errorFor('to')"></ValidationErrors>
      </div>

    </div>
    <div class="d-grid">
      <button
        class="btn btn-secondary"
        @click="check" :disabled="loading">
          <span v-if="!loading">Check!</span>
          <span v-if="loading">
            <i class="fas fa-circle-notch fa-spin"></i>
            Checking
          </span>
      </button>
    </div>

  </div>
</template>

<script>
import {is422} from './../shared/utils/response';
import validationErrors from './../shared/mixins/validationErrors';

export default {
  mixins: [validationErrors],
  props: {
    bookableId: [Number, String]
  },
  data() {
    return {
      from: this.$store.state.lastSearch.from,
      to: this.$store.state.lastSearch.to,
      loading: false,
      status: null,
    }
  },
  methods: {
    async check() {
      this.loading = true;
      this.errors = null;

      this.$store.dispatch('setLastSearch', {
        from: this.from,
        to: this.to
      });

      try {
        this.status = (await(axios
        .get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
        ))).status;
        this.$emit("availability", this.hasAvailability);
      } catch(error) {
        if(is422(error)) {
          this.errors = error.response.data.errors;
        }
        this.status = error.response.status;
        this.$emit("availability", this.hasAvailability);
      }
      this.loading = false;

    },
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