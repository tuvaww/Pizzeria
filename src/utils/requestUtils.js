import axios from 'axios';

const constructApiUrl = (url) => {
    return process.env.REACT_APP_INTERNAL_API_HOST + url;
};

export const getRequest = async (url) => {
    try {
        const apiUrl = constructApiUrl(url);
        console.log(url);
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postRequest = async (url, data) => {
    try {
        const apiUrl = constructApiUrl(url);

        const response = await axios.post(apiUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const returnErrors = (error) => {
    console.error(error);

    const errors = (error?.response?.data?.errors || []).map((e) => ({
        message: e.message,
        path: e.path,
    }));

    if (errors.length) {
        return { errors };
    }
};
