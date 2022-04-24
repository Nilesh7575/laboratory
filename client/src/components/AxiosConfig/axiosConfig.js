import axios from "axios"

const baseURL = 'http://localhost:3000/'
const token = JSON.parse(localStorage.getItem('token'))



const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export default axiosInstance