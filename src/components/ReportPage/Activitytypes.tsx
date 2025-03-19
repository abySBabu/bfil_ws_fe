
export interface Activity {
  ActivityWorkflowStatus: string;
  "Activity-Date Time": string;
  CreatedTime:string,
  ActivityName: string;
  ActivityCode: number;
  ActivityDescription:string,
  Village: string;
  Total:string,
  WaterConserved:string,
  SurveyNo: string;
  Grampanchayat: number;
  State: number;
  AreaTreated: string;
  LandType:number,
  BfilAmount:number,
  OtherGovScheme:number,
  Mgnrega:number,
  Other:number,
  Community:number,
  Ibl:number,
  WatershedId: number;
  Taluk: number;
  AmountSpend: number;
  FarmerId: string;
  District: number;
  InterventionType: number;
  GeoCoordinates: string; 
  history:{
    ActivityWorkflowStatus: string;
    UpdatedTime:string;
    ActivityImage: string;
    CreatedTime: string;
    Remarks: string;
    CreatedUser: string;
    Status: string;
  }[];
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


