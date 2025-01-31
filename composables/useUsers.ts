import { ref } from 'vue';
import { fetchUsersFromAPI } from '~/utils/api';
import type { User } from '~/interfaces/users';

const users = ref<User[]>([]);
const searchQuery = ref<String>('');

const fetchUsers = async () => {
  users.value = await fetchUsersFromAPI();
};
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
const useUsers = () => ({
  users,
  searchQuery,
  fetchUsers,
  filteredUsers,
});

export default useUsers;