import axios from 'axios';

const baseUrl = 'your server'; // Updated base URL with your IP address

export async function fetchUsers() {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
}

export async function fetchUserById(id) {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

export async function fetchUserByName(name) {
    const response = await axios.get(`${baseUrl}/name/${name}`);
    return response.data;
}

export async function createUser(user) {
    try {
        const response = await axios.post(`${baseUrl}`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function updateUser(id, user) {
    const response = await axios.put(`${baseUrl}/${id}`, user);
    return response.data;
}

export async function deleteUserById(id) {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}
