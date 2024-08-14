import axios from "axios";
import { serverPath } from '../common';
export async function login(data: any) {
    const configuration = {
        url: serverPath.authserver + "user-profile-service/login",
        method: "post",
        data: data
    };
    console.log("login", configuration)
    try {
        const response = await axios(configuration);
        return response.data
        // sessionStorage.setItem('token',response.data.jwtBearer);
    } catch (error) {
        throw (error)
    }

};