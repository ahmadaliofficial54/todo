<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title> ToDo App </q-toolbar-title>

        <div v-if="getLoginResponse.access_token" class="text-black q-ml-sm">
          <q-icon size="md" @click="logoutUser" color="grey" name="las la-sign-out-alt" />
        </div>
        <div v-else class="row">
          <a href="/#/login">Login</a>
          <q-separator vertical color="grey" class="q-mx-sm" />
          <a href="/#/signup">SignUp</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("authentication", ["getLoginResponse"]),
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    ...mapActions("todo", ["resetStore"]),
    logoutUser() {
      this.logout();
      this.resetStore();
      this.$router.push("/");
    },
  },
};
</script>
