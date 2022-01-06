import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import ExampleComponent2 from "./components/ExampleComponent2";
import Bookables from "./bookable/Bookables";

const routes = [
  {
    path: "/",
    component: Bookables,
    name: "home"
  },
  {
    path: "/example",
    component: ExampleComponent,
    name: "example"
  },
  {
    path: "/contact",
    component: ExampleComponent2,
    name: "contact"
  }

];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
