import axios from "axios";
import { serverPath } from "../common";

export async function listWS() {
    const configs = {
        url: serverPath.bfil + "wsmaster/getallwatershed",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}

// export async function addWS(data: any) {
//     const configs: AxiosRequestConfig = {
//         url: `${serverPath.bfil}ws/wsmaster/addwatershed`,
//         method: 'post',
//         data: data,
//         headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             "Content-Type": "application/vnd.api+json",
//         }
//     };

//     try {
//         const response = await axios(configs);
//         return response.data;
//     } catch (error) {
//         console.error('Error occurred while adding watershed:', error);
//         throw error;
//     }
// }


export async function addWS(data: any) {
    const configs = {
        url: serverPath.bfil + "wsmaster/addwatershed",
        method: 'post',
        data: data,
<<<<<<< HEAD
        headers: {
            Authorization: `Bearer${sessionStorage.getItem("token")}`,
            "Content-Type": "application/vnd.api+json",
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br' // Add Accept-Encoding header
        },
        // CORS configuration
        withCredentials: true, // Include cookies and authorization headers in the request
    };

    try {
        const response = await axios(configs);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Response Status:', error.response.status);
                console.error('Error Response Headers:', error.response.headers);
           } 
           //else if (error.request) {
             //   console.error('No response received:', error.request);
            else {
                console.error('Error setting up the request:', error.message);
            }
        } 
        console.error('Error occurred while adding watershed:', error);
        throw error;
=======
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
>>>>>>> branch 'master' of https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/bfil_ws_fe
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}


export async function editWS(data: any, id: number) {
    const configs = {
        url: serverPath.bfil + `wsmaster/updateWsById/${id}`,
        method: 'post',
        data: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}