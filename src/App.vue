<template>
  <v-app>

    <v-app-bar color="primary" :elevation="0">
      <v-spacer></v-spacer>
      <v-app-bar-title class="mx-auto"
        ><v-app-bar-nav-icon></v-app-bar-nav-icon>FRAMEWORKS</v-app-bar-title
      >
      <Add
        :isAdd="true"
        :saved="{}"
        :titleList="this.titleList"
        @add="addTask"
      />
    </v-app-bar>

    <v-card class="pa-4 fill-height">
      <toastr/>
      <v-table class="fill-width">
        <thead>
          <tr>
            <th style="width: 15%; text-align: center">Title</th>
            <th style="width: 15%; text-align: center">Description</th>
            <th style="width: 16%; text-align: center">Deadline</th>
            <th style="width: 16%; text-align: center">Priority</th>
            <th style="width: 16.7%; text-align: center">Is Complete</th>
            <th style="width: 16.7%; text-align: center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ formattedDeadline(task.deadline) }}</td>
            <td>{{ task.priority }}</td>
            <td style="position: relative; text-align: center;">
              <v-checkbox
                @click="
                  task.isComplete = !task.isComplete;
                "
                style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);"
                true-value="true"
                false-value="false"
              ></v-checkbox>
            </td>
            <td >
              <div style="margin: 20px;">
              <Add
                :isAdd="false"
                v-if="!task.isComplete"
                color="primary"
                @update="updateTask"
                :saved="task"
                :titleList="this.titleList"
              ></Add>
              <br v-if="!task.isComplete" />

              <v-btn
                color="red"
                @click="
                  deleteTask(task);
                "
                ><v-icon>mdi-close-circle</v-icon>Delete</v-btn
              >
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-app>
</template>

<script>
import Add from './components/add.vue';
import toastr from 'toastr';



export default {
  components: {
    Add,
    toastr
  },

  data() {
    return {
      complete: false,
      tasks: [],
      timeout: 1800,
      barMessage: '',
      titleList: [],
    };
  },

  methods: {
    addTask(event) {
      this.submittedTitle = event;
      event.isComplete = false;
      this.titleList.push(event.title);
      let date = new Date(event.deadline);
      event.formattedDeadline = date.toLocaleDateString();
      this.tasks.push(event);
      this.formSubmitted = true;
      this.barMessage = 'New Task Added!';
      this.showToast();
    },
    deleteTask(task) {
      let index = this.tasks.findIndex((t) => t.title === task.title);
      let tiindex = this.titleList.findIndex((g) => g === task.title);
      console.log(tiindex);
      // If the task exists, remove it from the tasks array
      this.titleList.splice(tiindex, 1);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.barMessage = 'Task Deleted!';
        this.showToast(); 
      }
    },
    updateTask() {
      this.barMessage = 'Task Updated!';
      this.snackbar = true;
      this.showToast();
    },
    formattedDeadline(deadline) {
      let date = new Date(deadline);
      return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
    },
    showToast() {
      toastr.success(this.barMessage, 'Success', {
        positionClass: 'toast-bottom-right'
      }); 
    }

  },
};
</script>
