import axios from "axios";
import { serverPath } from '../common';

const companyId = parseInt(localStorage.getItem("companyId") || '0');


export async function getAllUserByCompanyId() {
    const configs = {
        url: serverPath.authserver + 'user-service/getUserByCompanyId/' + companyId,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    };
}