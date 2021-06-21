import { supabase } from "../../utils/supabase";

async function validateUser(payload) {
  return await supabase.auth
    .signIn(payload)
    .then(response => {
      return response.error ? [] : response.data;
    })
    .catch(function(error) {
      return error;
    });
}

async function signUpUser(payload) {
  return await supabase.auth
    .signUp(payload)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return error;
    });
}

const state = {
  loginResponse: [],
};

const mutations = {
  setLoginResponse(state, response) {
    state.loginResponse = response;
  },
  logout(state, response) {
    state.loginResponse = response;
  }
};

const actions = {
  async loginUser({ commit }, payload) {
    return validateUser(payload).then(response => {
      commit("setLoginResponse", response);
    });
  },
  async signUpUser({ commit }, payload) {
    return signUpUser(payload);
  },
  async logout({ commit }, payload) {
    commit("logout", []);
  }
};

const getters = {
  getLoginResponse: state => {
    return state.loginResponse;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
