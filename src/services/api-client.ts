/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

const api = 'http://localhost:8080/';


export default axios.create({
    baseURL: api
})