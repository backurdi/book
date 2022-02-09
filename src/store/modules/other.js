import router from "@/router";
import storePlugins from "../../plugins/storePlugin";
import { urlBase64ToUint8Array } from "../helpers";

export const getDefaultState = () => {
  return {
    isNavOpen: false,
    hasSiteNav: true,
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
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    sendEmail(_state, emailData) {
      return new Promise((resolve) => {
        this.$api.contact.post(emailData).then(() => {
          resolve("");
        });
      });
    },
    fetchGifs(_state, data) {
      return new Promise((resolve) => {
        this.$api.gif.get(data).then((res) => {
          resolve(res);
        });
      });
    },
    async subscribeForNotifications() {
      let subscription;
      navigator.serviceWorker.getRegistrations().then(async () => {
        // if (!registrations.length) {
        // Register Service Worker
        navigator.serviceWorker
          .register("./service-worker.js", {
            scope: "/",
          })
          .then(async function (registration) {
            var serviceWorker;
            if (registration.installing) {
              serviceWorker = registration.installing;
              console.log("installing");
            } else if (registration.waiting) {
              serviceWorker = registration.waiting;
              console.log("waiting");
            } else if (registration.active) {
              serviceWorker = registration.active;

              // Register Push
              subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPI_KEY),
              });
              console.log("active");
            }
            if (serviceWorker) {
              // logState(serviceWorker.state);
              serviceWorker.addEventListener("statechange", function (e) {
                console.log(e);
                // logState(e.target.state);
              });
            }
          })
          .catch((err) => console.log(err));

        // Send Push Notification
        await this.$api.notification.post(JSON.stringify(subscription));
        // }
      });
    },
  },
};

export default otherStore;
