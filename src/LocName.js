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

export const formatDateTime = (input) => {
  if (!input) return "";

  let [datePart, timePart, ampm] = input.split(" ");

  const [year, month, day] = datePart.split("-");
  let [hour, min, sec] = timePart.split(":");

  let hoursNum = parseInt(hour, 10);
  if (ampm?.toUpperCase() === "PM" && hoursNum < 12) {
    hoursNum += 12;
  } else if (ampm?.toUpperCase() === "AM" && hoursNum === 12) {
    hoursNum = 0;
  }

  const finalHour = String(hoursNum).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${finalHour}:${min}`;

  return `${formattedDate} ${formattedTime}`;
};

export const beneficiaryRemarks = [
  {
    remarks: "Earthen bunding helped prevent soil erosion and improved moisture retention, increasing crop yield.Earthen bunding helped prevent soil erosion and improved moisture retention, increasing crop yield.",
    createdBy: "Mahantappa Hatapad",
    createdTime: "2025-01-12 10:45 AM"
  },
  {
    remarks: "Well cleaning increased water storage capacity and ensured sufficient water for irrigation throughout the season.",
    createdBy: "Mallikarjun Pujari",
    createdTime: "2025-02-03 02:18 PM"
  },
  {
    remarks: "Farm pond construction allowed the farmer to harvest rainwater and reduce dependency on borewell water.",
    createdBy: "Praveen Bhandari",
    createdTime: "2025-01-28 09:05 AM"
  },
  {
    remarks: "Tank desilting improved groundwater recharge and provided additional water for livestock and irrigation.",
    createdBy: "S D Kalyanshetti",
    createdTime: "2025-03-10 04:22 PM"
  },
  {
    remarks: "Earthen bunding increased moisture levels in the field, enabling the farmer to grow an additional crop.",
    createdBy: "Shivaraja Shetty",
    createdTime: "2025-01-17 11:30 AM"
  },
  {
    remarks: "Farm pond helped store runoff water, ensuring water availability even during dry spells.",
    createdBy: "Asad Ahmad",
    createdTime: "2025-02-21 08:55 AM"
  }
];






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