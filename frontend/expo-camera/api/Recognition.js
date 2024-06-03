import axios from 'axios';

const BaseUrl = 'your server';

export async function fetchFaces() {
    try {
        const response = await axios.get(BaseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching recognized faces:', error);
        throw new Error('Error fetching recognized faces');
    }
}

export async function deleteFaceByName(name) {
    try {
        const response = await axios.delete(`${BaseUrl}/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting recognized face '${name}':`, error);
        throw new Error(`Error deleting recognized face '${name}'`);
    }
}

export async function fetchFacesByName(name) {
    try {
        const response = await axios.get(`${BaseUrl}/${name}`);
        return response.data;
    } catch (error) {
        // console.error(`Error fetching recognized face '${name}':`, error);
        // console.log('Response:', error.response); // Log the response for more details
        throw new Error(`Error fetching recognized face '${name}'`);
    }
}
