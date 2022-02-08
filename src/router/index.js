import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Teacher from "../views/Teacher.vue";
import StudentPage from "../views/StudentPage.vue";
import ProfileSettings from "../views/ProfileSettings.vue";
import CreateClub from "../views/CreateClub.vue";
import EditClub from "../views/EditClub.vue";
import multiguard from "vue-router-multiguard";
import VueJwtDecode from "vue-jwt-decode";

function guardMyroute(to, from, next) {
  let isAuthenticated = false;
  const token = localStorage.getItem("jwt");
  if (token) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

function roleGuard(to, from, next) {
  let isTeacher = false;
  if (VueJwtDecode.decode(localStorage.getItem("jwt")).role === "Teacher") {
    isTeacher = true;
  }
  if (isTeacher && to.name !== "Teacher") {
    next("/teacher");
  } else if (!isTeacher && to.name === "Teacher") {
    next("/");
  } else {
    next();
  }
}

const routes = [
  {
    path: "/:clubId?",
    name: "Home",
    component: Home,
    beforeEnter: multiguard([guardMyroute, roleGuard]),
    meta: {
      layout: "appLayoutHome",
      sideNav: true,
    },
  },
  {
    path: "/:clubId?/:postId?",
    name: "Home",
    component: Home,
    beforeEnter: multiguard([guardMyroute, roleGuard]),
    meta: {
      layout: "appLayoutHome",
      sideNav: true,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
      sideNav: false,
    },
  },
  {
    path: "/me",
    name: "Me",
    component: ProfileSettings,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
      sideNav: false,
    },
  },
  {
    path: "/club",
    name: "Create Club",
    component: CreateClub,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
      sideNav: false,
    },
  },
  {
    path: "/club/:clubId",
    name: "Club",
    component: EditClub,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
      sideNav: false,
    },
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: Teacher,
    beforeEnter: multiguard([guardMyroute, roleGuard]),
    meta: {
      layout: "appLayoutHome",
    },
  },
  {
    path: "/teacher/:studentId",
    name: "Student Page",
    component: StudentPage,
    beforeEnter: guardMyroute,
    meta: {
      layout: "appLayoutHome",
    },
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
