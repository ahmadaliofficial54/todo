<template>
  <q-page class="flex flex-center">
    <div>
      <div class="fields-div">
        <div class="q-pb-sm">Create your account</div>

        <q-input
          dense
          outlined
          v-model="email"
          placeholder="Email address"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
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
          :rules="[val => (val && val.length > 0) || 'Please enter password']"
        >
          <template v-slot:prepend>
            <q-icon name="las la-lock" />
          </template>
        </q-input>

        <div class="row">
          <q-btn
            @click="signup"
            :disable="email.length > 0 && password.length > 0 ? false : true"
            label="Signup"
            no-caps
            text-color="white"
            class="signup-button col"
          />
        </div>

        <div class="q-pt-md flex flex-center">
          Do you have an account?
          <span
            @click="$router.push('login')"
            class="q-ml-sm login-text cursor-pointer"
            >Login</span
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import notification from "../common/notificationsAndDialogues.js";
import { mapActions } from "vuex";
export default {
  mixins: [notification],
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions("authentication", ["signUpUser"]),
    //this method for user signup
    async signup() {
      //start screen loader
      this.$q.loading.show();
      //making request
      var request = { email: this.email, password: this.password };

      //calling method from centerlized store
      this.signUpUser(request).then(response => {
        this.$q.loading.hide();
        if (!response.error) {
          this.showNotification("Please check your email inbox");
          this.$router.push("login");
        } else if (response.error.status === 422) {
          this.alertMessage("Error", "Invalid email or password");
        } else {
          this.alertMessage("Error", "Email already exist");
        }
      });
    }
  },
  created() {}
};
</script>

<style scoped>
.login-text {
  color: blue;
}
.fields-div {
  min-width: 300px;
}
.signup-button {
  background: linear-gradient(to right, black, #0173bc);
}
</style>
