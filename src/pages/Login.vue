<template>
  <q-page class="flex flex-center">
    <div>
      <div class="fields-div">
        <div class="q-pb-sm">Login to your account</div>

        <q-input
          dense
          outlined
          v-model="email"
          placeholder="Email Address"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:prepend>
            <q-icon name="las la-address-card" />
          </template>
        </q-input>

        <q-input
          dense
          outlined
          v-model="password"
          type="password"
          placeholder="Password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please enter password']"
        >
          <template v-slot:prepend>
            <q-icon name="las la-lock" />
          </template>
        </q-input>

        <div class="row">
          <q-btn
            @click="validateUser"
            :disable="password.length > 0 && email.length > 0 ? false : true"
            label="Login"
            no-caps
            text-color="white"
            class="login-button col"
          />
        </div>

        <div class="q-pt-md flex flex-center">
          Don't have an account?
          <span @click="$router.push('signup')" class="q-ml-sm signup-text cursor-pointer"
            >Signup</span
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import notification from "../common/notificationsAndDialogues.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [notification],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("authentication", ["getLoginResponse"]),
  },
  methods: {
    ...mapActions("authentication", ["loginUser"]),
    //this method for user login
    async validateUser() {
      //start screen loader
      this.$q.loading.show();

      //making request
      var request = { email: this.email, password: this.password };

      //calling method from centerlized store
      await this.loginUser(request);
      if (this.getLoginResponse && this.getLoginResponse.access_token) {
        this.$q.loading.hide();
        this.$router.push("toDoList");
      } else {
        this.$q.loading.hide();
        this.alertMessage("Error!", "Invalid username or password.");
      }
    },
  },
};
</script>

<style scoped>
.signup-text {
  color: blue;
}
.fields-div {
  min-width: 300px;
}
.login-button {
  background: linear-gradient(to right, black, #0173bc);
}
</style>
