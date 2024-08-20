import axios from "axios";
import { serverPath } from '../common';

const companyId = parseInt(sessionStorage.getItem("companyId") || '0');


export async function usersList() {
    console.log('companyId', sessionStorage.getItem("companyId"));
    const configuration = {
        url: serverPath.authserver + 'user-service/getUserByCompanyId/' + companyId,
        method: 'get',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
    };
    try { const response = await axios(configuration); return response.data; }
    catch (error) { throw error }
}