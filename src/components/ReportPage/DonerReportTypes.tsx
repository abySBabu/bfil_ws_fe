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

export type WatershedActivities = Activity[];
export interface WorkPlan {
    planningYear: string;
    activityId?: number; 
    activityName?: string; 
    }

