import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ProfileSettings from "../views/ProfileSettings.vue";
import CreateClub from "../views/CreateClub.vue";

function guardMyroute(to, from, next) {
  let isAuthenticated = false;
  if (localStorage.getItem("jwt")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

const routes = [
  {
    path: "/:clubId?",
    name: "Home",
    component: Home,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
    },
  },
  {
    path: '/me',
    name: 'Me',
    component: ProfileSettings,
    beforeEnter: guardMyroute,
    meta:{
      layout: 'appLayoutHome'
    }
  },
  {
    path: '/club',
    name: 'Create Club',
    component: CreateClub,
    beforeEnter: guardMyroute,
    meta:{
      layout: 'appLayoutHome'
    }
  },
  {
    path: '/club/:clubId',
    name: 'Club',
    component: CreateClub,
    beforeEnter: guardMyroute,
    meta:{
      layout: 'appLayoutHome'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
