/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import useAuthService from './useAuthService';
import { messageService } from './messageService';

const api = 'http://127.0.0.1:8080/usuario';



export default function useAxiosInstance() {
    const { getToken } = useAuthService();
    const instance = axios.create({
        baseURL: api,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    instance.interceptors.request.use(function (config) {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
        return config;
    }, function (error) {
        messageService.error(error);
        return Promise.reject(error);
    });

    return {
        instance
    }
}