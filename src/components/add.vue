<template>
  <v-dialog v-model="dialogVisible" max-width="300px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="isAdd"
        @click="
          dialogVisible = !dialogVisible;
          this.form = {};
        "
        :elevation="3"
        ><v-icon>mdi-plus-circle</v-icon> Add</v-btn
      >
      <v-btn
        v-else
        @click="
          dialogVisible = !dialogVisible;
          this.form = { ...saved };
        "
        :elevation="3"
        color="primary"
        ><v-icon>mdi-square-edit-outline</v-icon> UPDATE</v-btn
      >
    </template>

    <v-app-bar color="primary" :elevation="0" dense>
      <v-app-bar-title v-if="isAdd"
        ><v-icon>mdi-plus-circle</v-icon>Add Task</v-app-bar-title
      >
      <v-app-bar-title v-else
        ><v-icon>mdi-square-edit-outline</v-icon>Edit Task</v-app-bar-title
      >
    </v-app-bar>

    <v-main>
      <v-card>
        <v-card-text>
          <v-form @submit.prevent ref="form">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="isAdd"
                  v-model="form.title"
                  label="Title"
                  :disabled="!isAdd"
                  :rules="[(v) => !!v || 'Title is required!']"
                  :error-messages="
                    this.titleLists.includes(this.form.title) && isAdd
                      ? [duplicateError]
                      : []
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  v-model="form.description"
                  :rules="[(v) => !!v || 'Description is required!']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  id="deadline"
                  label="Deadline"
                  v-model="form.deadline"
                  type="date"
                  :rules="[(v) => !!v || 'Deadline is required!']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  inline
                  v-model="form.priority"
                  :rules="[(v) => !!v || 'Priority is required!']"
                >
                  <template v-slot:label> Priority </template>
                  <v-radio label="Low" :value="'low'"></v-radio>
                  <v-radio label="Med" :value="'med'"></v-radio>
                  <v-radio label="High" :value="'high'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="5">
                <v-btn
                  v-if="isAdd"
                  id="add"
                  color="primary"
                  @click="onSubmit"
                  type="submit"
                  variant="elevated"
                  block
                >
                  <v-icon>mdi-plus-circle</v-icon>ADD
                </v-btn>
                <v-btn
                  v-else
                  id="add"
                  color="primary"
                  @click="onEdit"
                  type="submit"
                  variant="elevated"
                  block
                >
                  <v-icon>mdi-square-edit-outline</v-icon>EDIT
                </v-btn>
              </v-col>
              <v-col cols="5">
                <v-btn
                  color="red"
                  variant="elevated"
                  @click="
                    dialogVisible = false;
                    this.form = this.saved;
                    console.log(this.saved);
                  "
                  block
                >
                  <v-icon>mdi-cancel</v-icon>CANCEL
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isAdd: Boolean,
    saved: {
      title: String,
      description: String,
      deadline: Date,
      priority: String,
      isComplete: Boolean,
    },
    titleList: Array,
  },

  mounted() {
    this.titleLists = this.titleList;
  },

  data() {
    return {
      dialogVisible: false,
      form: {
        title: '',
        description: '',
        deadline: '',
        priority: '',
      },
      titleLists: [],
      duplicateError: 'Duplicate title not allowed!',
    };
  },

  methods: {
    onSubmit() {
      if (
        this.form.title &&
        this.form.description &&
        this.form.deadline &&
        this.form.priority
      ) {
        if (this.titleLists.includes(this.form.title)) {
        } else {
          this.$emit('add', this.form);
          this.dialogVisible = false;
        }
      }
    },
    onEdit() {
      if (
        this.form.title &&
        this.form.description &&
        this.form.deadline &&
        this.form.priority
      ) {
        this.$emit('update');
        this.saved.title = this.form.title;
        this.saved.description = this.form.description;
        this.saved.deadline = this.form.deadline;
        this.saved.priority = this.form.priority;
        this.dialogVisible = false;
      }
    },
  },
};
</script>
