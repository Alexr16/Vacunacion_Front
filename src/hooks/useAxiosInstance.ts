/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import useAuthService from '../services/useAuthService';
import { messageService } from '../services/messageService';

const api = 'http://127.0.0.1:8080/';

export default function useAxiosInstance() {
    const { getToken } = useAuthService();
    const instance = axios.create({
        baseURL: api,
    });

    instance.interceptors.request.use();

    if(getToken() === null){
        return messageService.error('No hay token');
        }

    return {
        instance
    }
}