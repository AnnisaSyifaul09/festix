// src/store/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: null,
    name: null,
    role_id: null,
    id: null,
  }),
  actions: {
    setUserData(data) {
      this.email = data.email;
      this.name = data.name;
      this.role_id = data.role_id;
      this.id = data.id;
    },
  },
});
