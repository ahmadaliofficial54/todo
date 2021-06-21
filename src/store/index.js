import Vue from 'vue'
import Vuex from 'vuex'
import SecureLS from "secure-ls";
import authentication from './authentication/authentication'
import todo from './todo/todo'
import createPersistedState from "vuex-persistedstate"
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      authentication,
      todo
    },

    plugins: [
      createPersistedState({
        key: 'todo',
        paths: ["authentication", "todo"],
        storage: {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key)
        }
      })
    ],

    strict: process.env.DEBUGGING
  })

  return Store
}
