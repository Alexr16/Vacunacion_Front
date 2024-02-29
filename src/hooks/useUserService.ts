import apiClient from '../services/api-client';
import { User } from '../services/useAuthService';

export default function useUserService() {

     const resourceUrl = 'usuario';

    async function getUsers(search = '', startedDate='', endedDate='') {
        const response = await apiClient.get(`${resourceUrl}`, {
            params: {
                search,
                startedDate,
                endedDate
            }
        });

        return response.data.data;
    }

    async function getUser(userId: string) {
        const response = await apiClient.get(`${resourceUrl}/${userId}`);
        return response.data;
    }

    async function getAllUsers() {
        const response = await apiClient.get(`${resourceUrl}`);
        return response.data;
    }

    async function storeUser(user: User) {
        const response = await apiClient.post(`${resourceUrl}/create`, user);
        return response.data;
    }

    async function loginUser(user: User) {
        const response = await apiClient.post(`${resourceUrl}/login`, user);
        
        return response.data;
    }

    async function editUser(data: any) {
        const response = await apiClient.patch(`${resourceUrl}/actualizar/${data.id}`, data);
        return response.data;
    }

    async function deleteUser(userId: string) {
        const response = await apiClient.delete(`${resourceUrl}/${userId}`);
        return response.data;
    }




    return {
        getUsers,
        getUser,
        storeUser,
        editUser,
        deleteUser,
        loginUser,
        getAllUsers
    }
}
