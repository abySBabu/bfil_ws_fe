import React from 'react';
import { Box, Card, CardContent, CardMedia, Tooltip, Typography, FormControl, InputLabel, SelectChangeEvent, MenuItem, Select, Grid, IconButton, useMediaQuery, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Square, Water, Agriculture, CurrencyRupee, Close } from '@mui/icons-material';
import { sd, ServerDownDialog } from '../../common';
import { PieChart } from '@mui/x-charts/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { DashKey, DashSupply, DashDemand, DashGraph } from '../../Services/activityService';
import { useTranslation } from 'react-i18next';
import EsriMap from '../Map';
import CircularProgress from '@mui/material/CircularProgress';
import { ListDemand, ListSupply, YearReport } from 'src/Services/dashboardService';
import { ActivityData } from '../ReportPage/DonerReportTypes';
import { listFinYear } from 'src/Services/workplanService';
import { getCurrentFinancialYear } from 'src/LocName';

const componentMap: Record<string, React.ElementType> = {
    Square,
    Water,
    Agriculture,
    CurrencyRupee,
};

const colorMap: Record<string, string> = {
    Square: '#96c22f',
    Water: '#3b77b9',
    Agriculture: '#f58e1d',
    CurrencyRupee: '#bfab55',
};

const colorPalette = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#795548'];

type ProgressEntry = {
    activityName: string,
    physicalValue: number,
    financialValue: number,
    uom: string,
    field2: string,
    field3: string,
    firstFinSource?: string;
};

type YearWiseEntry = {
    finYear: string;
    activityId: string;
    activityName: string;
    physicalValue: number;
    financialValue: number;
    uom: string;
    firstFinSource: string;
};


export const Dashboard: React.FC = () => {
    const [flipped, setFlipped] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMidScreen = useMediaQuery('(min-width:601px) and (max-width:1200px)');
    const chartHeight = isSmallScreen ? 150 : isMidScreen ? 180 : 200;
    const chartWidth = isSmallScreen ? 300 : isMidScreen ? 500 : 600;
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const { t } = useTranslation();
    const [graphM, setgraphM] = React.useState("");
    const [keyList, setkeyList] = React.useState<ProgressEntry[]>([]);
    const [supplyList, setsupplyList] = React.useState<ProgressEntry[]>([]);
    const [demandList, setdemandList] = React.useState<ProgressEntry[]>([]);
    const [yearlyList, setyearlyList] = React.useState<YearWiseEntry[]>([]);
    const [allAct, setallAct] = React.useState<any[]>([]);
    const [selectedRow, setSelectedRow] = React.useState<any>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const currentYear = new Date().getFullYear();
    const defaultYear = `${currentYear}-${(currentYear + 1).toString().slice(2)}`;
    const [selectedYear, setSelectedYear] = React.useState<string>(defaultYear);
    const [yearOptions, setYearOptions] = React.useState<any[]>([]);

    const handleYearChange = (event: SelectChangeEvent<string>) => {
        setLoadingResponse(true);
        setSelectedYear(event.target.value);
    };

    React.useEffect(() => {
        fetchData();
    }, [selectedYear]);

    React.useEffect(() => {
        const fetchYearData = async () => {
            try {
                const response2 = await listFinYear();
                // if (response2.status === 'success') { setYearOptions(response2.data) }

                if (response2.status === 'success') {
                    const currentFinYear = getCurrentFinancialYear();
                    const allYears = response2.data;

                    const overallOption = allYears.find((year: any) => year.parameterName === 'Overall');

                    const allowedYears = allYears
                        .filter((year: any) =>
                            year.parameterName !== 'Overall' &&
                            year.parameterName <= currentFinYear
                        )
                        .sort((a: any, b: any) =>
                            b.parameterName.localeCompare(a.parameterName)
                        );

                    if (overallOption) {
                        allowedYears.unshift(overallOption);
                    }

                    setYearOptions(allowedYears);
                }

            } catch (error) {
                console.log('Error fetching workplan:', error);
            }
        };
        fetchYearData();
    }, []);

    const fetchData = async () => {
        if (!selectedYear) return;

        // setLoadingResponse(true);
        try {
            const DashboardResp = await YearReport(selectedYear);
            let allData = DashboardResp;
            const Demandcategory = "DEMAND_SIDE_INTERVENTIONS";
            const Supplycategory = "SUPPLY_SIDE_INTERVENTIONS";
            const KeyImpact = "KEY_IMPACT_INDICATORS";
            const Supplyresp = await ListSupply();
            const yearWiseEntries: YearWiseEntry[] = [];

            for (const entry of allData) {
                const items = entry.overallActivity?.[KeyImpact] || [];

                for (const item of items) {
                    if (!item?.field2) continue;

                    yearWiseEntries.push({
                        finYear: item.finYear,
                        activityId: item.field2,
                        activityName: item.activityName || "",
                        physicalValue: item.publicPhysical || 0,
                        financialValue: item.publicFinancial || 0,
                        uom: item.uom || "",
                        firstFinSource: item.firstFinSource
                    });
                }
            }
            setyearlyList(Array.from(yearWiseEntries.values()));


            const demandEntriesMap = new Map<string, ProgressEntry>();

            for (const entry of allData) {
                const items = entry.progressData?.[Demandcategory] || [];
                for (const item of items) {
                    if (!item?.field2) continue;
                    const key = item.field2;

                    if (!demandEntriesMap.has(key)) {
                        demandEntriesMap.set(key, {
                            activityName: item.activityName || "",
                            physicalValue: item.publicPhysical || 0,
                            financialValue: item.publicFinancial || 0,
                            uom: item.uom || "",
                            field2: key,
                            field3: item.field3,
                        });
                    } else {
                        const existing = demandEntriesMap.get(key)!;
                        existing.physicalValue += item.publicPhysical || 0;
                        existing.financialValue += item.publicFinancial || 0;
                    }
                }
            }

            setdemandList(Array.from(demandEntriesMap.values()));

            const SupplyEntriesMap = new Map<string, ProgressEntry>();

            for (const entry of allData) {
                const items = entry.progressData?.[Supplycategory] || [];
                for (const item of items) {
                    if (!item?.field2) continue;
                    const key = item.field2;

                    if (!SupplyEntriesMap.has(key)) {
                        SupplyEntriesMap.set(key, {
                            activityName: item.activityName || "",
                            physicalValue: item.publicPhysical || 0,
                            financialValue: item.publicFinancial || 0,
                            uom: item.uom || "",
                            field2: key,
                            field3: item.field3,
                        });
                    } else {
                        const existing = SupplyEntriesMap.get(key)!;
                        existing.physicalValue += item.publicPhysical || 0;
                        existing.financialValue += item.publicFinancial || 0;
                    }
                }
            }

            setsupplyList(Array.from(SupplyEntriesMap.values()));

            const KeyImpactEntriesMap = new Map<string, ProgressEntry>();

            for (const entry of allData) {
                const items = entry.overallActivity?.[KeyImpact] || [];
                for (const item of items) {
                    if (!item?.field2) continue;
                    const key = item.field2;

                    if (!KeyImpactEntriesMap.has(key)) {
                        KeyImpactEntriesMap.set(key, {
                            activityName: item.activityName || "",
                            physicalValue: item.publicPhysical || 0,
                            financialValue: item.publicFinancial || 0,
                            uom: item.uom || "",
                            field2: key,
                            field3: item.field3,
                            firstFinSource: item.firstFinSource
                        });
                    } else {
                        const existing = KeyImpactEntriesMap.get(key)!;
                        existing.physicalValue += item.publicPhysical || 0;
                        existing.financialValue += item.publicFinancial || 0;
                    }
                }
            }

            setkeyList(Array.from(KeyImpactEntriesMap.values()));

            setserverDown(false)
        }
        catch (error: any) {
            if (error.response?.status >= 500) setserverDown(true);
            else console.log(error);
        }
        setLoadingResponse(false);
    }

    const handleChartClick = (row: ProgressEntry) => {
        setSelectedRow(row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRow('');
    };

    const ActTypeName = (code: number | string | undefined) => {
        const act = allAct.find(x => x.activityId == code);
        return act ? act.activityName : code || "";
    }

    const keyCard = { height: '120px', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', /* position: 'relative', */ color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor'), p: '8px' }

    const ActCard: React.FC<{ activity: string; value: number | string; fvalue: number | string; unit: string }> = ({ activity, value, fvalue, unit }) => {
        const [flipped, setFlipped] = React.useState(false);

        return (
            <Grid item xs={6} lg={3}>
                <Tooltip title={ActTypeName(activity)}>
                    <Box
                        onClick={() => setFlipped(!flipped)}
                        sx={{
                            perspective: '1000px',
                            cursor: 'pointer',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '85px',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.6s',
                                transform: flipped ? 'rotateY(180deg)' : 'none',
                            }}
                        >
                            {/* Front */}
                            <Card
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    borderRadius: sd('--card-bradius'),
                                    color: sd('--text-color-special'),
                                    bgcolor: sd('--card-bgcolor'),
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', padding: '8px !important' }}>
                                    <Typography
                                        sx={{
                                            fontSize: '100%',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                        }}
                                    >
                                        {ActTypeName(activity)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                            marginTop: '6px',
                                        }}
                                    >
                                        {Math.round(Number(value)).toLocaleString('en-IN')} {unit}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Back */}
                            <Card
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    borderRadius: sd('--card-bradius'),
                                    color: sd('--card-bgcolor'),
                                    bgcolor: '#bb4d53',
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', padding: '8px !important' }}>
                                    <Typography
                                        sx={{
                                            fontSize: '100%',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                        }}
                                    >
                                        {ActTypeName(activity)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            width: '100%',
                                            marginTop: '6px',
                                        }}
                                    >
                                        <CurrencyRupee sx={{ fontSize: '1.5rem', mr: 0.5, color: sd('--card-bgcolor') }} />
                                        {Math.round(Number(fvalue)).toLocaleString('en-IN')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Tooltip>
            </Grid>
        );
    };



    return (<>
        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress size={80} /></Box >
            : serverDown ? <ServerDownDialog />
                : <>
                    <Grid container spacing={1}>
                        <Grid item xs={8}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.KeyImpactIndicators_Header_Text")}</Typography></Grid>
                        <Grid item xs={4} display="flex" justifyContent="flex-end">
                            <FormControl disabled={loadingResponse} >
                                <InputLabel id="select-year-label">Select Year</InputLabel>
                                <Select
                                    labelId="select-year-label"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    label="Select Year"
                                    sx={{ height: 40, width: 120 }}
                                >
                                    <MenuItem value="" disabled>Select Year</MenuItem>
                                    {yearOptions.map((year, index) => (
                                        <MenuItem key={index} value={year.parameterName}>
                                            {year.parameterName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ columnCount: 4, columnGap: 1 }}>
                                {[...keyList]
                                    .sort((a, b) => a.field2.localeCompare(b.field2))
                                    .map((row, index) => {
                                        const getComponent = (name: string): React.ElementType => componentMap[name] ?? Box;
                                        const getColor = (name: string): string => colorMap[name] ?? '#000';
                                        return (
                                            <Card key={index} sx={{ ...keyCard, breakInside: 'avoid', mb: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography sx={{ fontSize: '125%' }}>
                                                        {row.activityName}
                                                    </Typography>
                                                    <CardMedia
                                                        component={getComponent(row.field3)}
                                                        sx={{ fontSize: '250%', color: getColor(row.field3) }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant='h5'>
                                                        {row.field2 === "D" ? <b>{row.uom} {Math.round(Number(row.financialValue)).toLocaleString('en-IN')}</b> : <b>{Math.round(Number(row.physicalValue)).toLocaleString('en-IN')} {row.uom}</b>}
                                                    </Typography>
                                                    <IconButton onClick={() => handleChartClick(row)}>
                                                        <BarChartIcon />
                                                    </IconButton>
                                                </Box>
                                            </Card>
                                        );
                                    })}
                            </Box>
                        </Grid>

                        {/* <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WaterConserved_Subheader_Text")}</Typography>
                                <CardMedia component={Water} sx={{ fontSize: '250%', color: '#3b77b9' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h5'><b>N/A</b></Typography>
                                <IconButton onClick={() => { setgraphM(t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WatershedAreaTreated_Piechart.Piechart_Header")); setGraphIndicator("WaterConserved"); }}><BarChartIcon /></IconButton>
                            </Box>
                        </Card></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Subheader_Text")}</Typography>
                                <CardMedia component={Agriculture} sx={{ fontSize: '250%', color: '#f58e1d' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h5'><b>N/A</b></Typography>
                                <IconButton onClick={() => { setgraphM(t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Piechart.Piechart_Header")); setGraphIndicator("farmer impacted"); }}><BarChartIcon /></IconButton>
                            </Box>
                        </Card></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Subheader_Text")}</Typography>
                                <CardMedia component={CurrencyRupee} sx={{ fontSize: '250%', color: '#bfab55' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h5'><b>N/A</b></Typography>
                                <IconButton onClick={() => { setgraphM(t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Piechart.Piechart_Header")); setGraphIndicator("Goverment Amount") }}><BarChartIcon /></IconButton>
                            </Box>
                        </Card></Grid> */}

                        <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_SupplySideInterventions_Header_Text")}</Typography> </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={1}>
                                {supplyList.map((activity, i) => {
                                    return (
                                        <ActCard key={i} activity={activity.activityName} value={activity.physicalValue} fvalue={activity.financialValue} unit={activity.uom} />
                                    );
                                })}
                                <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_DemandSideInterventions_Header_Text")}</Typography></Grid>
                                {demandList.map((activity, i) => {
                                    return (
                                        <ActCard key={i} activity={activity.activityName} value={activity.physicalValue} fvalue={activity.financialValue} unit={activity.uom} />
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <EsriMap />
                        </Grid>
                    </Grid >

                    <Dialog open={openDialog} onClose={handleCloseDialog} >
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {selectedRow?.activityName}
                            <IconButton onClick={handleCloseDialog}><Close /></IconButton>
                        </DialogTitle>

                        <DialogContent sx={{ gap: '8px', p: 1 }}>
                            {selectedRow && yearlyList.length > 0 ? (() => {
                                const filtered = yearlyList
                                    .filter((d) => d.activityId === selectedRow.field2)
                                    .sort((a, b) => a.finYear.localeCompare(b.finYear));

                                const limited = filtered.length > 8 ? filtered.slice(-8) : filtered;

                                if (limited.length === 0) {
                                    return (
                                        <Typography sx={{ textAlign: 'center', my: 4 }}>
                                            No graph data
                                        </Typography>
                                    );
                                }

                                const selected = limited[0];
                                const isLeveraged = selected.activityName === 'AMOUNT LEVERAGED';
                                const isFinancial = selectedRow.field2 === 'D';

                                const hasValidData = isLeveraged
                                    ? true
                                    : limited.some((d) => {
                                        const value = isFinancial ? d.financialValue : d.physicalValue;
                                        return value !== null && value !== undefined && value !== 0;
                                    });

                                if (!hasValidData) {
                                    return (
                                        <Typography sx={{ textAlign: 'center', my: 4 }}>
                                            No graph data
                                        </Typography>
                                    );
                                }

                                // const sourceData = isLeveraged ? JSON.parse(selected.firstFinSource) : limited;
                                let sourceData = limited;

                                if (isLeveraged) {
                                    try {
                                        sourceData = selected.firstFinSource
                                            ? JSON.parse(selected.firstFinSource)
                                            : null;

                                        if (!Array.isArray(sourceData) || sourceData.length === 0) {
                                            return (
                                                <Typography sx={{ textAlign: 'center', my: 4 }}>
                                                    No graph data
                                                </Typography>
                                            );
                                        }
                                    } catch (error) {
                                        console.error("Invalid firstFinSource JSON:", error);
                                        return (
                                            <Typography sx={{ textAlign: 'center', my: 4 }}>
                                                No graph data
                                            </Typography>
                                        );
                                    }
                                }

                                const xAxisLabels = isLeveraged
                                    ? sourceData.map((d: any) => d.source)
                                    : sourceData.map((d: any) => d.finYear);

                                const dataValues = isLeveraged
                                    ? sourceData.map((d: any) => d.amount)
                                    : sourceData.map((d: any) =>
                                        isFinancial ? d.financialValue ?? 0 : d.physicalValue ?? 0
                                    );


                                const pieData = isLeveraged
                                    ? sourceData.map((d: any, index: number) => ({
                                        id: d.source,
                                        value: d.amount,
                                        label: d.source,
                                        color: colorPalette[index],
                                    }))
                                    : sourceData.map((d: any, index: number) => ({
                                        id: d.finYear,
                                        value: isFinancial ? d.financialValue ?? 0 : d.physicalValue ?? 0,
                                        label: d.finYear,
                                        color: colorPalette[index],
                                    }));


                                const barLabel = isLeveraged
                                    ? 'Amount Leveraged'
                                    : isFinancial
                                        ? 'Financial Value'
                                        : 'Physical Value';

                                return (
                                    <>
                                        <BarChart
                                            height={350}
                                            margin={{ top: 50, bottom: 50, left: 80, right: 20 }}
                                            xAxis={[
                                                {
                                                    scaleType: 'band',
                                                    data: xAxisLabels,
                                                },
                                            ]}
                                            series={xAxisLabels.map((label: string, index: number) => ({
                                                label,
                                                data: xAxisLabels.map((_, i) => (i === index ? dataValues[index] : null)),
                                                color: colorPalette[index % colorPalette.length],
                                                stack: 'singleBar',
                                            }))}
                                        />

                                        <PieChart
                                            height={300}
                                            series={[
                                                {
                                                    data: pieData,
                                                },
                                            ]}
                                        />
                                    </>
                                );
                            })() : (
                                <Typography sx={{ textAlign: 'center', my: 4 }}>
                                    No graph data
                                </Typography>
                            )}

                        </DialogContent>

                    </Dialog>
                </>
        }
    </>)
}