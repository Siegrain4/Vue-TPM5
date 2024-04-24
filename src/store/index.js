import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask(state, { index, task }) {
      if (index >= 0 && index < state.tasks.length) {
        state.tasks.splice(index, 1, task);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask(state, index) {
      if (index >= 0 && index < state.tasks.length) {
        state.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    editTask({ commit }, { index, task }) {
      commit('editTask', { index, task });
    },
    deleteTask({ commit }, index) {
      commit('deleteTask', index);
    },
    fetchTasks({ commit }) {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        commit('setTasks', JSON.parse(tasks));
      }
    }
  },
  getters: {
    getTasks: state => state.tasks
  }
});
