<template>
  <q-page class="q-px-md q-py-md">
    <div>
      <div class="row justify-between q-pb-sm">
        <span class="text-h6">Todo List</span>
        <div class="row">
          <q-input
            v-model="searchQuery"
            outlined
            dense
            placeholder="Search"
            class="q-pr-sm"
            @input="search"
          />
          <q-btn label="Create" no-caps color="blue" to="/create" />
        </div>
      </div>
      <q-table :data="rows" :columns="columns">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-bold"
              >{{ col.label }}</q-th
            >
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name !== 'action'">
                {{ col.value }}
              </span>
              <div v-if="col.name == 'action'" class="row justify-center">
                <div class="text-blue cursor-pointer" @click="view(props.row)">Edit</div>
                <q-separator vertical color="grey" class="q-mx-sm" />
                <div class="text-red cursor-pointer" @click="deleteTodo(props.row)">
                  Delete
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
      searchQuery: "",
      columns: [
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
        },
        {
          name: "description",
          align: "left",
          label: "Description",
          field: "description",
        },
        {
          name: "action",
          align: "center",
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };
  },
  computed: {
    ...mapGetters("todo", ["getTodoList"]),
  },
  methods: {
    ...mapActions("todo", ["fetchTodoList", "deleteToDo"]),
    //search methof
    search() {
      this.rows = this.getTodoList.filter((element) =>
        element.title.toUpperCase().includes(this.searchQuery.toUpperCase())
      );
    },
    //method for view/update todo
    view(value) {
      this.$router.push({ path: "/edit", query: { id: value.id } });
    },
    //delete todo method
    async deleteTodo(value) {
      this.$q.loading.show();
      await this.deleteToDo(value.id).then(() => {
        this.showNotification("Todo deleted successfully!");
        this.readToDoList();
      });
      this.$q.loading.hide();
    },
    // read all todos
    async readToDoList() {
      await this.fetchTodoList();
      this.rows = this.getTodoList;
    },
  },
  created() {
    this.readToDoList();
  },
};
</script>
