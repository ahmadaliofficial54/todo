<template>
  <q-page class="flex flex-center">
    <div>
      <div class="fields-div">
        <div class="q-pb-sm">Create new todo</div>

        <q-input
          dense
          outlined
          v-model="title"
          placeholder="Title"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        >
        </q-input>

        <q-input
          dense
          outlined
          v-model="description"
          type="textarea"
          placeholder="Description"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        >
        </q-input>

        <div class="row">
          <q-btn
            @click="create"
            :disable="title.length > 0 && description.length > 0 ? false : true"
            label="Create"
            no-caps
            text-color="white"
            class="button col"
          />
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
      title: "",
      description: "",
    };
  },
  methods: {
    ...mapActions("todo", ["addToDo"]),
    // This method will create todo
    async create() {
      // start screen loader
      this.$q.loading.show();
      //making request
      var request = { title: this.title, description: this.description };
      //calling method from centerlized store
      await this.addToDo(request).then((response) => {
        // stop screen loader
        this.$q.loading.hide();
        if (!response.error) {
          this.showNotification("Todo created successfully!");
          this.$router.push("/toDoList");
        } else {
          this.alertMessage("Error!", "There is something wrong");
        }
      });
    },
  },
};
</script>

<style scoped>
.fields-div {
  min-width: 300px;
}
.button {
  background: linear-gradient(to right, black, #0173bc);
}
</style>
