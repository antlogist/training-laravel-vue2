<template>
  <div>
    <div v-if="loading">
      Data is loading...
    </div>

    <div v-else>
      <div class="row" v-for="row in rows" :key="'row' + row">
        <div
          class="col d-flex align-items-stretch"
          v-for="(bookable, index) in colsInRow(row)"
          :key="'col' + index">
          <bookable-list-item v-bind="bookable">
          </bookable-list-item>
        </div>
        <div
          class="col"
          v-for="(placeholder, index) in placeholdersInRow(row)"
          :key="'placeholder' + index">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
  data() {
    return {
      bookables: null,
      loading: false,
      columns: 3
    }
  },
  computed: {
    rows() {
      return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns);
    }
  },
  methods: {
    colsInRow(row) {
      return this.bookables.slice((row - 1) * this.columns, row * this.columns);
    },
    placeholdersInRow(row) {
      return this.columns - this.colsInRow(row).length;
    }
  },
  created() { //Using for getting the data from the DB
    this.loading = true;
    const request = axios.get('/api/bookables').then(
      response => {
        this.bookables = response.data;
        this.loading = false;
      });
  },
  components: {
    BookableListItem
  }
}
</script>