import axios from 'axios';

import env from 'environment';

export async function register(user) {
    const url = `${env.baseUrl}/user/register`;
    const response = await axios.post(url, user);
    return response.data.id;
}

export async function login(user) {
    const url = `${env.baseUrl}/user/signin`;
    const response = await axios.post(url, user);
    return response.data.id;
}
