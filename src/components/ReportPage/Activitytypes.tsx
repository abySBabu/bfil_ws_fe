
export interface Activity {
  activityWorkflowStatus: string;
  "Activity-Date Time": string;
  ActivityName: string;
  ActivityCode: number;
  Village: string;
  "Survey No": string;
  Grampanchayat: number;
  State: number;
  "Area Treated": number;
  Watershed: number;
  Taluk: number;
  "Amount Spend": number;
  Farmer: number;
  District: number;
  InterventionType: number;
  Location: string; 
}

export interface ActivityData {
  [key: string]: Activity[];
}

export const fmrDef = {
  "wsfarmerId": "",
  "mobileNumber": "",
  "wsfarmerName": "",
  "relationalIdentifiers": '',
  "identifierName": '',
  "remarks": "",
};


