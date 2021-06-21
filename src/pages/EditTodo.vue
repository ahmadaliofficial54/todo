<template>
  <q-page class="flex flex-center">
    <div>
      <div class="fields-div">
        <div class="q-pb-sm">Edit todo</div>

        <q-input
          dense
          outlined
          v-model="todo.title"
          placeholder="Title"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        >
        </q-input>

        <q-input
          dense
          outlined
          v-model="todo.description"
          type="textarea"
          placeholder="Description"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        >
        </q-input>

        <div class="row">
          <q-btn
            @click="edit"
            label="Edit"
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
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [notification],
  data() {
    return {
      todo: {},
    };
  },
  computed: {
    ...mapGetters("todo", ["getTodoList"]),
  },
  methods: {
    ...mapActions("todo", ["editToDo"]),
    // This method will edit todo
    async edit() {
      // start screen loader
      this.$q.loading.show();
      //calling method from centerlized store
      await this.editToDo(this.todo).then((response) => {
        // stop screen loader
        this.$q.loading.hide();
        if (!response.error) {
          this.showNotification("Todo edited successfully!");
          this.$router.push("/toDoList");
        } else {
          this.alertMessage("Error!", "There is something wrong");
        }
      });
    },
  },
  created() {
    //getting specific todo for editing
    this.getTodoList.forEach((element) => {
      if (element.id == this.$route.query.id) {
        this.todo = { ...element };
        return;
      }
    });
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
