import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";

const routes = [
  {
    path: "/",
    component: Bookables,
    name: "home"
  },
  {
    path: "/bookable/:id",
    component: Bookable,
    name: "bookable"
  },
  {
    path: "/example",
    component: Bookables,
    name: "example"
  },
  {
    path: "/contact",
    component: Bookables,
    name: "contact"
  }

];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
