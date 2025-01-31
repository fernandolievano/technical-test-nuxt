import { useAsyncData } from '#app';
import { ref } from 'vue';
import type { User } from '~/interfaces/users';

export function useUsers() {
  const searchQuery = ref<String>('');
  const { data: users, status: loading, error, refresh } = useAsyncData<User[]>(
    'users',
    async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      return response.json();
    },
    {
      server: true
    }
  );

  const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const fields = ['name', 'email', 'username'] as const;

    if (!users.value) return [];
    return users.value.filter(user => fields.some(key => user[key].toLowerCase().includes(query)));
  });

  const deleteUser = (id: number) => {
    if (users.value) {
      users.value = users.value.filter(user => user.id !== id);
    }
  };

  return {
    users, loading, error, refresh, searchQuery, filteredUsers, deleteUser
  };
}