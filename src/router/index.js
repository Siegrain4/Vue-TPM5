// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import TaskDetail from '../views/TaskDetail.vue';

const routes = [
  { path: '/', component: TodoList },
  { path: '/detail/:taskId', name: 'TaskDetail', component: TaskDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
