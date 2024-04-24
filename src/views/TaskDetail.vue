<template>
    <div>
      <button @click="goBack">Kembali</button>
      <h1 :style="titleStyle">Detail Task</h1>
      <p><strong>{{taskId }}</strong></p>
      <textarea v-if="editMode" v-model="editedDescription"></textarea>
      <p v-else-if="!description">{{ defaultText }}</p>
      <p v-else>{{ description }}</p>
      <button @click="toggleEditMode" v-if="!editMode">Edit Deskripsi</button>
      <button @click="saveDescription" v-else>Simpan</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['taskId'],
    data() {
      return {
        description: '',
        defaultText: 'Belum ada deskripsi nih',
        editMode: false,
        editedDescription: ''
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      toggleEditMode() {
        this.editMode = !this.editMode;
        this.editedDescription = this.description;
      },
      saveDescription() {
        this.description = this.editedDescription;
        this.editMode = false;
        localStorage.setItem('task_description_' + this.taskId, this.description);
      }
    },
    computed: {
      titleStyle() {
        return {
          fontSize: '22px',
          fontWeight: 'bold'
        };
      }
    },
    created() {
      const storedDescription = localStorage.getItem('task_description_' + this.taskId);
      if (storedDescription) {
        this.description = storedDescription;
      }
    }
  };
  </script>
  