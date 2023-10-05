import axios from 'axios'

const apiRequest = axios.create({
    // baseURL: 'http://localhost:3005',
    baseURL: 'https://portfolio-server.iran.liara.run/',
    headers: {
        'Content-Type': 'application/json'
    }
})

//* Add a request interceptor
apiRequest.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        console.log('store/Axiox/config => Error Request Message :', error.message);
        return Promise.reject(error)
    },
)

//* Add a responce interceptor
apiRequest.interceptors.response.use(
    (response) => {
        console.log('store/Axiox/config => response :', response.status);
        return response
    },
    (error) => {
        console.log('store/Axiox/config => Error Response Message :', error.message);
        // console.log('config.js=> Error Response Message :', error);
        return Promise.reject(error)
    }
)

export default apiRequest