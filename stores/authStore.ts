import { defineStore } from 'pinia';

interface AuthUser {
  username: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useCookie<AuthUser | null>('authUser', { default: () => null }).value
  }),

  actions: {
    login(userData: { username: string; password: string; }) {
      const authCookie = useCookie<AuthUser | null>('authUser', { maxAge: 60 * 60 * 24 });

      this.user = { username: userData.username };
      authCookie.value = this.user;
    },

    logout() {
      const authCookie = useCookie<AuthUser | null>('authUser');

      this.user = null;
      authCookie.value = null;
    },

    setUserFromCookie() {
      const authCookie = useCookie<AuthUser | null>('authUser');

      this.user = authCookie.value;
    }
  }
});
