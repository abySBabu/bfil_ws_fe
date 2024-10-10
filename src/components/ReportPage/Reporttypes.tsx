import * as XLSX from 'xlsx';
export interface FinancialDetail {
  wfsId: number;
  wfsName: string | null;
  wfsValue: number;
}

export interface FinancialDataItem {
 activityName: string;
  financialDetails: FinancialDetail[];
  activityId: number;
  planningYear: number;
 interventionType_Components: string;
  value: string;
}

export const commonCellStyles = {
  borderRight: '1px solid #ccc',
  padding: '8px',
};

const handleOnExport = (data: FinancialDataItem[]) => {
const wb = XLSX.utils.book_new();
const sheetData = data.map(item => ({
    Activity: item.activityName,
    PlanningYear: item.planningYear,
    ...Object.fromEntries(item.financialDetails.map(detail => [detail.wfsName, detail.wfsValue])),
  }));
 const ws = XLSX.utils.json_to_sheet(sheetData);
XLSX.utils.book_append_sheet(wb, ws, "Report");
XLSX.writeFile(wb, "Financial_Report.xlsx");
};

export default handleOnExport;

