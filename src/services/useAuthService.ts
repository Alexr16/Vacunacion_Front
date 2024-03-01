import apiClient from './api-client';

export interface User {
    id: string;
    username: string;
    email: string ;
    role: string ;
    cedula: string ;
    nombres: string ;
    lastnames: string ;
    vaccineDate: string ;
    vaccineType: string ;
    password: string ;
    isVaccinated: boolean ;
    doseNumber: string ;
    birthdate: string ;
    phone: string ;
    address: string ;

}

type LoginData = {
    username: string;
    password: string;
}

const useAuthService = () => {

    const resourceUrl = 'usuario';

    const login = async (data: LoginData) => {

        try {
            const response = await apiClient.post(`${resourceUrl}/login`, data);
            
            return response.data;
        } catch (error) {
            logout();
            throw error;
        }
    }

    const logout = () => {
        removeToken();
        removeUser();
    }


    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const removeToken = () => {
        localStorage.removeItem('token');
    }

    const setUser = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user') as string);
    }

    const removeUser = () => {
        localStorage.removeItem('user');
    }



    return {
        login,
        logout,
        getUser,
        getToken
    }
}

export default useAuthService;

