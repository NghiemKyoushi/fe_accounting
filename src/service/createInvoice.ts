
import axiosInstance from "../config";

export const fetchDataTest = () => {
    console.log("fetch data")
    return axiosInstance.get('https://jsonplaceholder.typicode.com/posts/1');
}


