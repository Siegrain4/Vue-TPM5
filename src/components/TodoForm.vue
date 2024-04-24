<template>
    <div>
      <h1 :style="titleStyle">Todo List</h1>
      <input type="text" v-model="task" :style="inputStyle">
      <button @click="addTask" :style="buttonStyle">Add</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        task: ''
      };
    },
    props: {
      titleSize: {
        type: String,
        default: '24px'
      },
      inputSize: {
        type: String,
        default: '18px'
      },
      buttonSize: {
        type: String,
        default: '18px'
      }
    },
    computed: {
      titleStyle() {
        return {
          fontSize: this.titleSize,
          fontWeight: 'bold'
        };
      },
      inputStyle() {
        return {
          fontSize: this.inputSize
        };
      },
      buttonStyle() {
        return {
          fontSize: this.buttonSize,
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        };
      }
    },
    watch: {
      titleSize(newValue) {
        this.titleStyle.fontSize = newValue;
      },
      inputSize(newValue) {
        this.inputStyle.fontSize = newValue;
      },
      buttonSize(newValue) {
        this.buttonStyle.fontSize = newValue;
      }
    },
    methods: {
      addTask() {
        if (this.task.trim() !== '') {
          this.$store.dispatch('addTask', this.task);
          this.task = '';
        }
      }
    }
  };
  </script>
  