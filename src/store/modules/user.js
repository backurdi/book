import storePlugins from "../../plugins/storePlugin";
import router from "../../router";

export const getDefaultState = () => {
  return {
    user: {},
    invites: [],
    usersForInvite: [],
    students: [],
    token: "",
  };
};

const userStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
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
      this.commit("bookStore/resetState");
      this.commit("otherStore/resetState");
      this.commit("postStore/resetState");
      this.commit("clubStore/resetState");
      router.push({ path: "login" });
    },
    setCurrentUser(state, user) {
      state.user = { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role };
      state.invites = user.invites;
      this.commit("clubStore/setClubs", user.clubs);
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
    resetStates() {},
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
    logout({ commit }) {
      return this.$api.users.logout().then(() => {
        return commit("logout");
      });
    },
    signup({ commit }, signupInfo) {
      return this.$api.users.signup(signupInfo).then((user) => commit("login", user));
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
    updateMe({ commit }, data) {
      return new Promise((resolve) => {
        this.$api.users
          .patch("updateMe", data)
          .then((updatedUser) => {
            resolve("");
            return commit("setCurrentUser", updatedUser.data.user);
          })
          .catch((_err) => {
            return _err;
          });
      });
    },
    getStudents({ commit }) {
      return this.$api.users
        .get("students")
        .then((students) => {
          return commit("setStudents", students.data);
        })
        .catch((err) => {
          if (err) {
            return commit("logout");
          }
        });
    },
    getUsersForInvite({ commit }, isNew = false) {
      let clubId;
      if (!isNew) {
        clubId = this.state.clubStore.activeClub._id;
      }
      return this.$api.clubs.get(`${clubId}/usersForInvite`).then((userForInviteList) => {
        return commit("setUsersForInvite", userForInviteList.data);
      });
    },
    answerInvite({ commit }, data) {
      this.$api.clubs
        .answerInvite(data)
        .then((res) => commit("clubStore/answerInvite", { accepted: data.accepted, club: res.data }));
    },
    inviteUsers({ state }, invites) {
      this.$api.clubs.inviteUsers(invites, state.activeClub._id);
    },
  },
};

export default userStore;
