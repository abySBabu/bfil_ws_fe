export const StateName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("StateList")) || null;
        if (list) {
            const obj = list.find(x => x.stateId == id);
            return obj ? obj.stateName : '-';
        }
        return '-';
    }
    return '-';
}

export const DistrictName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("DistrictList")) || null;
        if (list) {
            const obj = list.find(x => x.districtId == id);
            return obj ? obj.districtName : '-';
        }
        return '-';
    }
    return '-';
}

export const TalukName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("TalukList")) || null;
        if (list) {
            const obj = list.find(x => x.talukId == id);
            return obj ? obj.talukName : '-';
        }
        return '-';
    }
    return '-';
}

export const PanName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("PanList")) || null;
        if (list) {
            const obj = list.find(x => x.panchayatId == id);
            return obj ? obj.panchayatName : '-';
        }
        return '-';
    }
    return '-';
}

export const WsName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("WsList")) || null;
        if (list) {
            const obj = list.find(x => x.watershedId == id);
            return obj ? obj.wsDescription : '-';
        }
        return '-';
    }
    return '-';
}

export const VillageName = (id) => {
    if (id !== null && id !== undefined) {
        const list = JSON.parse(localStorage.getItem("VillageList")) || null;
        if (list) {
            const obj = list.find(x => x.villageId == id);
            return obj ? obj.villageName : '-';
        }
        return '-';
    }
    return '-';
}

export const DateTime = (dt) => new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export const DateTimeWT = (dt) => new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })

export const DateString = (dt) => new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })

export const TimeString = (dt) => new Date(dt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })

export const getCurrentFinancialYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 

    if (month >= 4) {
        return `${year}-${(year + 1).toString().slice(-2)}`;
    } else {
        return `${year - 1}-${year.toString().slice(-2)}`;
    }
};