<template>
<div>
  <bookable-list-item :item-title="bookable.title" :item-content="bookable.content" :price="1000"></bookable-list-item>
</div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
  data() {
    return {
      bookable: {
        title: "Test Title",
        content: "Test content"
      }
    }
  },
  created() {
    setTimeout(()=>{
      this.bookable.title = "New Title"
    }, 5000);
  },
  components: {
    BookableListItem
  }
}
</script>