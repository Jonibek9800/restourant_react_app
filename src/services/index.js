import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const  instance = axios.create({
    baseURL: BASE_URL
})