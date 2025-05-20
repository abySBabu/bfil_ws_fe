export type ActivitySources = {
  [key: string]: number;
  IBL: number;
  BFIL: number;
  "Other Gov Scheme": number;
  MGNREGA: number;
  Community: number;
  Other: number;
};

export type Activities = {
  [activityName: string]: ActivitySources;
};

export interface ComponentData {
  components: string;
  activities: Activities;

}

export interface FinancialData {
  progress: number;
  plan: number;
}

export interface PhysicalData {
  progress: number;
  plan: number;
}

export interface Watershed {
  watershedDesc: string;
  watershedName: string;
  physical: PhysicalData;
  financial: FinancialData;
}

export interface LandType {
  [watershedId: string]: Watershed;
}

export interface Activity {
  activityName: string;
  uom: string | null;
  landTypeMap: {
    Private: LandType;
    Public: LandType;
  };
}

export interface ActivityData {
  id: number;
  district: string;
  watershed: string | null;
  finYear: string;
  startDate: string;
  endDate: string;
  activityName: string;
  landType: string;
  uom: string;
  publicPlanPhysical: number;
  publicPlanFinancial: number;
  privatePlanPhysical: number;
  privatePlanFinancial: number;
  publicPhysical: number;
  publicFinancial: number;
  privatePhysical: number;
  privateFinancial: number;
  firstFinSource: string | null;
  secondFinSource: string | null;
  thirdFinSource: string | null;
  createdDate: number;
  updatedDate: number;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  publicRemark: string | null;
  privateRemark: string | null;
  sno: string;
}


export interface ActivitySystem {
  typeOfWork: string;
  uom: string | null;
  physical: {
    progress: string;
    plan: string;
  };
  financial: {
    progress: string;
    plan: string;
  };
}

export type WatershedActivities = Activity[];
export interface WorkPlan {
  planningYear: string;
  activityId?: number;
  activityName?: string;
}

