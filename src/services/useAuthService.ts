import useAxiosInstance from '../hooks/useAxiosInstance';

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    cedula: string
    names: string;
    lastnames: string;
    vaccineDate: string;
    vaccineType: string;
    password: string;
    isVaccinated: boolean;
    doseNumber: string;

}

const useAuthService = () => {

    const { instance } = useAxiosInstance();

    const resourceUrl = '/auth';

    const login = async (username: string, password: string) => {
        const payload = {
            username,
            password
        }

        try {
            const response = await instance.post(`${resourceUrl}/login`, payload);
            setToken(response.data.token);
            setUser(response.data.data);
            return response.data.data;
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