import { supabase } from "../../utils/supabase";

async function getTodoList(payload) {
  return await supabase
    .from("todo")
    .select("*")
    .then(response => {
      if (!response.error) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch(function(error) {
      return error;
    });
}

async function deleteTodo(id) {
  return await supabase
    .from("todo")
    .delete()
    .eq("id", id)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return error;
    });
}

async function createTodo(payload) {
  return await supabase
    .from("todo")
    .insert(payload)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return error;
    });
}

async function updateTodo(payload) {
  return await supabase
    .from("todo")
    .update(payload)
    .eq("id", payload.id)
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return error;
    });
}

const state = {
  todoList: []
};

const mutations = {
  setTodoList(state, response) {
    state.todoList = response;
  },
  reset(state, response) {
    state.todoList = response;
  }
};

const actions = {
  async fetchTodoList({ commit }, payload) {
    return getTodoList().then(response => {
      commit("setTodoList", response);
    });
  },
  async deleteToDo({ commit }, id) {
    return deleteTodo(id);
  },
  async addToDo({ commit }, payload) {
    return createTodo(payload);
  },
  async editToDo({ commit }, payload) {
    return updateTodo(payload);
  },
  async resetStore({ commit }, payload) {
    commit("reset", []);
  }
};

const getters = {
  getTodoList: state => {
    return state.todoList;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
