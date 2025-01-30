import { ref } from 'vue';

interface User {
  username: string;
}
const user = ref<User | null>(null);

const login = (username: string, password: string) => {
  if (username === 'Daptee' && password === 'Daptee2025') {
    user.value = { username };
    localStorage.setItem('user', JSON.stringify(user.value));
  } else {
    throw new Error('Las credenciales no son correctas')
  }
}
const logout = () => {
  user.value = null;
  localStorage.removeItem('user');
}

const useAuth = () => ({
  user,
  login,
  logout
})

export default useAuth;