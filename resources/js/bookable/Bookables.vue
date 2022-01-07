<template>
  <div>
    <div v-if="loading">
      Data is loading...
    </div>

    <div v-else>
      <div class="row" v-for="row in rows" :key="'row' + row">
        <div
          class="col"
          v-for="(bookable, index) in colsInRow(row)"
          :key="'col' + index">
          <bookable-list-item
            :item-title="bookable.title"
            :item-content="bookable.content"
            :price="1000">
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
    setTimeout(()=>{
      this.bookables = [{
        title: "New Title One",
        content: "New Content One"
      },
      {
        title: "New Title Two",
        content: "New Content Two"
      },
      {
        title: "New Title Three",
        content: "New Content Two"
      },
      {
        title: "New Title Four",
        content: "New Content Two"
      },
      {
        title: "New Title Five",
        content: "New Content Two"
      },
      {
        title: "New Title Six",
        content: "New Content Two"
      },
      {
        title: "New Title Seven",
        content: "New Content Two"
      },
      {
        title: "New Title Eight",
        content: "New Content Two"
      },
      {
        title: "New Title Nine",
        content: "New Content Two"
      },
      {
        title: "New Title Ten",
        content: "New Content Two"
      }]
      this.loading = false;
    }, 2000);
  },
  components: {
    BookableListItem
  }
}
</script>