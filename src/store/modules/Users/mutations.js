export default {
  setAuthentication(state, userData) {
    state.loggedInUser = userData;
  },
  setLoggedOut(state) {
    state.loggedInUser = null;
  },
  addUser(state, user) {
    user.user_name = state.user_name.trim().toLowerCase();
    if(user.name.trim() == "" || user.user_name == "" || user.password.trim() == "") return false;

    for(let userData of state.users){
      if (userData.user_name == user.user_name) return false;
    }
    
    state.users.push({
      name: user.name,
      user_name: user.user_name,
      password: user.password,
    });
  },
  removeUser(state, user) {
    state.users.splice(state.users.indexOf(user), 1);
  },
};
