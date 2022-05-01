export default {
  isAuthenticated(state) {
    if (state.loggedInUser) return true;
    return false;
  },
  users(state) {
    return state.users;
  },
};
