<template>
    <div>
      <h1 :style="titleStyle">Todo List</h1>
      <input type="text" v-model="task" :style="inputStyle" @keyup.enter="saveTask">
      <button @click="addTask" :style="buttonStyle">{{ buttonLabel }}</button>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <span @click="goToDetail(task)">{{ displayTask(task, index) }}</span>
          <input v-if="editingIndex === index" v-model="tasks[index]" @keyup.enter="saveTask" @keyup.esc="cancelEdit">
          <button @click="editTask(index)">{{ editButtonLabel(index) }}</button>
          <button @click="deleteTask(index)">Hapus</button>
        </li>
      </ul>
      <p v-if="isAwesome">Hebat!</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        task: '',
        editingIndex: -1
      };
    },
    computed: {
      tasks() {
        return this.$store.getters.getTasks;
      },
      titleStyle() {
        return {
          fontSize: '24px',
          fontWeight: 'bold'
        };
      },
      inputStyle() {
        return {
          fontSize: '18px'
        };
      },
      buttonStyle() {
        return {
          fontSize: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        };
      },
      buttonLabel() {
        return this.editingIndex === -1 ? 'Tambah' : 'Simpan';
      },
      isAwesome() {
        return this.tasks.length >= 4;
      }
    },
    created() {
      this.$store.dispatch('fetchTasks');
    },
    methods: {
      addTask() {
        if (this.task.trim() !== '') {
          if (this.editingIndex !== -1) {
            this.$store.dispatch('editTask', { index: this.editingIndex, task: this.task });
          } else {
            this.$store.dispatch('addTask', this.task);
          }
          this.task = '';
          this.editingIndex = -1;
        }
      },
      editTask(index) {
        this.task = this.tasks[index];
        this.editingIndex = index;
      },
      saveTask() {
        this.addTask();
      },
      cancelEdit() {
        this.task = '';
        this.editingIndex = -1;
      },
      deleteTask(index) {
        this.$store.dispatch('deleteTask', index);
      },
      goToDetail(task) {
        this.$router.push({ name: 'TaskDetail', params: { taskId: task } });
      },
      displayTask(task, index) {
        return this.editingIndex === index ? '' : task;
      },
      editButtonLabel(index) {
        return this.editingIndex === index ? 'Simpan' : 'Edit';
      }
    }
  };
  </script>
  