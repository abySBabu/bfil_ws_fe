import axios from "axios";
import { serverPath } from "../common";

export async function addWS(data: any) {
    const configs = {
        url: serverPath.bfil + "ws/wsmaster/addwatershed",
        method: 'post',
        data: data,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { console.log(serverPath.bfil + "wsmaster/addwatershed"); const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}