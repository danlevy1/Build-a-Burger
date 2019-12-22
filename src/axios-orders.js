import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-a-burger-a4cff.firebaseio.com/'
});

export default instance;