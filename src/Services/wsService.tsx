import axios from "axios";
import { serverPath } from '../common';

export async function addWS(data: any) {
    const configs = {
        url: "192.168.1.42:8080/bfil/wsmaster/addwatershed",
        method: 'post',
        data: data
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}