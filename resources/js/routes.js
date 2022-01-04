import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import ExampleComponent2 from "./components/ExampleComponent2";

const routes = [
  {
    path: "/",
    component: ExampleComponent,
    name: "home"
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
