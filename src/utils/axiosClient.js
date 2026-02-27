
/*
It is used to make API requests easier and cleaner we make API request to backend from Frontend.
Instead of writing the full backend URL again and again, we create one axios client with fixed settings.
*/
import axios from "axios";
const axiosClient = axios.create({
baseURL: import.meta.env.VITE_BASE_URL, 
// by this the cookies is send with request 
  withCredentials:true,
//Tell the server that we are sending data in JSON format
  headers: { 
    'Content-Type':'application/json'
   }
});
export default axiosClient;

