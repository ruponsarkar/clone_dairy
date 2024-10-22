
import axios from 'axios';
// import AuthUser from './token';
// 
// const {token} = AuthUser();

const uploadAPI = axios.create({
    baseURL : "https://milksubsidydairyassam.com:8800/",
    // baseURL : "http://127.0.0.1:8800/",
    headers :{
        "Content-Type": "multipart/form-data",
        // "Authorization" : `Bearer ${token}`
    }
});


export default uploadAPI;
