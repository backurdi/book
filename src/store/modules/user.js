import storePlugins from "../../plugins/storePlugin";
import router from "../../router";
import { getDefaultState } from "../helpers";

const userStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    user: {},
    invites: [],
    usersForInvite: [],
    students: [],
    token: "",
  }),
  mutations: {
    login(state, userData) {
      localStorage.setItem("jwt", userData.token);
      state.token = userData.token;
      state.user = userData.data;
      router.push({ path: "/" });
    },
    logout(state) {
      localStorage.removeItem("jwt");
      Object.assign(state, getDefaultState());
      router.push({ path: "login" });
    },
    setCurrentUser(state, user) {
      state.user = { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role };
      state.invites = user.invites;
      this.commit("clubStore/insertClub", user.clubs);
      if (user.clubs.length) {
        const currentClubId = router.currentRoute._value.params.clubId
          ? router.currentRoute._value.params.clubId
          : user.clubs[0]._id;
        this.dispatch("clubStore/getActiveClub", currentClubId, { root: true });
      }
    },
    setUsersForInvite(state, usersForInvite) {
      state.usersForInvite = usersForInvite;
    },
    setStudents(state, students) {
      state.students = students;
    },
  },
  actions: {
    login({ commit }, loginInfo) {
      return this.$api.users
        .login(loginInfo)
        .then((user) => commit("login", user))
        .catch((err) => {
          console.log(err);
          return commit("logout", err);
        });
    },
    logout() {
      return this.$api.users.logout().then(() => {
        return this.commit("logout");
      });
    },
    signup(_state, signupInfo) {
      return this.$api.users.signup(signupInfo).then((user) => this.commit("login", user));
    },
    getMe({ commit }) {
      return this.$api.users
        .get("me")
        .then((user) => {
          return commit("setCurrentUser", user.data);
        })
        .catch((err) => {
          if (err) {
            return commit("logout");
          }
        });
    },
    updateMe(_state, data) {
      return new Promise((resolve) => {
        this.$api.users
          .patch("updateMe", data)
          .then((updatedUser) => {
            resolve("");
            return this.commit("setCurrentUser", updatedUser.data.user);
          })
          .catch((_err) => {
            return _err;
          });
      });
    },
    getStudents() {
      return this.$api.users
        .get("students")
        .then((students) => {
          return this.commit("setStudents", students.data);
        })
        .catch((err) => {
          if (err) {
            return this.commit("logout");
          }
        });
    },
    getUsersForInvite(_state, isNew = false) {
      let clubId;
      if (!isNew) {
        clubId = this.state.clubStore.activeClub._id;
      }
      return this.$api.clubs.get(`${clubId}/usersForInvite`).then((userForInviteList) => {
        return this.commit("setUsersForInvite", userForInviteList.data);
      });
    },
    answerInvite(_state, data) {
      this.$api.clubs
        .answerInvite(data)
        .then((res) => this.commit("clubStore/answerInvite", { accepted: data.accepted, club: res.data }));
    },
    inviteUsers({ state }, invites) {
      this.$api.clubs.inviteUsers(invites, state.activeClub._id);
    },
  },
};

export default userStore;
