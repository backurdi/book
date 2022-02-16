import router from "@/router";
import storePlugins from "../../plugins/storePlugin";
import { urlBase64ToUint8Array } from "../helpers";

export const getDefaultState = () => {
  return {
    isNavOpen: false,
    hasSiteNav: true,
    socket: null,
    notifications: [],
    notificationCount: 0,
  };
};

const otherStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
  mutations: {
    toggleHasSiteNav(state) {
      state.hasSiteNav = router.currentRoute._value.meta.sideNav;
    },
    toggleNav(state, routeChange) {
      const body = document.querySelector("body");
      if (state.isNavOpen || routeChange) {
        state.isNavOpen = false;
        body.classList.remove("nav-is-showing");
      } else {
        state.isNavOpen = true;
        body.classList.add("nav-is-showing");
      }
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    setNotifications(state, { notifications, count }) {
      if (Array.isArray(notifications)) {
        state.notifications.push(...notifications);
        state.notificationCount = count ? count : state.notificationCount++;
      } else {
        state.notifications.unshift(notifications);
      }
    },
    setNotificationsRead(state, notification) {
      state.notifications.forEach((stateNotification) => {
        if (notification === stateNotification._id) {
          stateNotification.read = true;
        }
      });
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async sendEmail(_state, emailData) {
      const email = await this.$api.contact.post(emailData);
      return email;
    },
    fetchGifs(_state, data) {
      return new Promise((resolve) => {
        this.$api.gif.get(data).then((res) => {
          resolve(res);
        });
      });
    },
    async initiateSocket({ commit }) {
      const socket = await this.$api.notification.initiateSocket();
      return commit("setSocket", socket);
    },
    async getNotifications({ commit }, page) {
      const notifications = await this.$api.notification.get(`?page=${page}&limit=5`);
      commit("setNotifications", notifications.data);
    },
    async subscribeForNotifications() {
      navigator.serviceWorker.getRegistrations().then(async () => {
        // if (!registrations.length) {
        // Register Service Worker
        const register = await navigator.serviceWorker.register("/service-worker.js", {
          scope: "/",
        });

        // Register Push
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPI_KEY),
        });

        // Send Push Notification
        await this.$api.notification.post(JSON.stringify(subscription));
        // }
      });
    },
    async setNotificationRead({ commit }, notification) {
      await this.$api.notification.patch(notification);
      return commit("setNotificationsRead", notification);
    },
  },
};

export default otherStore;
