import axios from "axios";
import { serverPath } from "../common";

export async function listAct() {
    const configs = {
        url: serverPath.bfil + "activity/getAllActivity",
        method: 'get',
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    try { const response = await axios(configs); return response.data; }
    catch (error) { console.error(error); throw error; }
}
