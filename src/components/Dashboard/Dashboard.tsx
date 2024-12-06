import React from 'react';
import { Box, Card, CardHeader, CardContent, CardMedia, Typography, Grid, Modal, IconButton, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Square, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { sd, ServerDownDialog } from '../../common';
import { DashKey, DashSupply, DashDemand } from '../../Services/activityService';
import { useTranslation } from 'react-i18next';
import EsriMap from '../Map';
import CircularProgress from '@mui/material/CircularProgress';
import { ListDemand, ListSupply } from 'src/Services/dashboardService';

export const Dashboard: React.FC = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMidScreen = useMediaQuery('(min-width:601px) and (max-width:1200px)');

    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const { t } = useTranslation();
    const [gMod, setgMod] = React.useState("");
    const [keyList, setkeyList] = React.useState<{ [key: string]: string }>({});
    const [supplyList, setsupplyList] = React.useState<{ [key: string]: { [unit: string]: number } }>({});
    const [demandList, setdemandList] = React.useState<{ [key: string]: { [unit: string]: number } }>({});
    const [allAct, setallAct] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoadingResponse(true);
            try {
                const Supplyresp = await ListSupply();
                const Demandresp = await ListDemand();
                if (Supplyresp && Demandresp)
                    setallAct([...Supplyresp.data, ...Demandresp.data])

                const resp1 = await DashKey();
                if (resp1) {
                    setkeyList(resp1);
                }

                const resp2 = await DashSupply();
                if (resp2.status === 'success') {
                    //Edited by lakshmi- fetch resp.data
                    setsupplyList(resp2.data)
                }

                const resp3 = await DashDemand();
                if (resp3.status === 'success') {
                    //Edited by lakshmi- fetch resp.data
                    setdemandList(resp3.data)
                }

                setserverDown(false)
            }
            catch (error: any) {
                if (error.response?.status >= 500 || !error.response?.status) setserverDown(true);
                else console.log(error);
            }
            setLoadingResponse(false);
        }; fetchData();
    }, [])

    const chartHeight = isSmallScreen ? 150 : isMidScreen ? 180 : 200;
    const chartWidth = isSmallScreen ? 300 : isMidScreen ? 500 : 600;

    const ActTypeName = (code: number | string | undefined) => {
        const act = allAct.find(x => x.activityId == code);
        return act ? act.activityName : code || "";
    }

    const keyCard = { height: '120px', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', /* position: 'relative', */ color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor'), p: '8px' }

    const ActCard: React.FC<{ activity: string, value: number | string, unit: string }> = ({ activity, value, unit }) => (
        <Grid item xs={6} lg={3}>
            <Card sx={{ height: '85px', overflow: 'auto', borderRadius: sd('--card-bradius'), color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor') }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='body1' fontWeight='bold'>{ActTypeName(activity)}</Typography>
                    <Typography variant='body2'>{value} {unit}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )

    return (<>
        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress size={80} /></Box >
            : serverDown ? <ServerDownDialog />
                : <>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.KeyImpactIndicators_Header_Text")}</Typography></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Subheader_Text")}</Typography>
                                <CardMedia component={Square} sx={{ fontSize: '250%', color: '#96c22f' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h4'><b>{keyList?.totalAreaTreated ? keyList?.totalAreaTreated : "N/A"}</b></Typography>
                                {/* <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton> */}
                            </Box>
                        </Card></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WaterConserved_Subheader_Text")}</Typography>
                                <CardMedia component={Water} sx={{ fontSize: '250%', color: '#3b77b9' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h4'><b>{keyList?.totalWaterConserved ? keyList?.totalWaterConserved : "N/A"}</b></Typography>
                                {/* <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WatershedAreaTreated_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton> */}
                            </Box>
                        </Card></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Subheader_Text")}</Typography>
                                <CardMedia component={Agriculture} sx={{ fontSize: '250%', color: '#f58e1d' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h4'><b>{keyList?.beneficiary ? keyList?.beneficiary : "N/A"}</b></Typography>
                                {/* <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton> */}
                            </Box>
                        </Card></Grid>
                        <Grid item xs={12} md={3}><Card sx={keyCard}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Subheader_Text")}</Typography>
                                <CardMedia component={CurrencyRupee} sx={{ fontSize: '250%', color: '#bfab55' }} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h4'><b>{keyList?.totalAmountSpent ? keyList?.totalAmountSpent : "N/A"}</b></Typography>
                                {/* <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton> */}
                            </Box>
                        </Card></Grid>

                        {Object.keys(supplyList).length > 0 && <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_SupplySideInterventions_Header_Text")}</Typography> </Grid>}
                        <Grid item xs={12} md={8}><Grid container spacing={1}>
                            {Object.keys(supplyList).map((activity, i) => {
                                const data = supplyList[activity];
                                const [unit, value] = data ? Object.entries(data)[0] : ["N/A", ""];
                                return <ActCard key={i} activity={activity} value={value} unit={unit} />;
                            })}

                            {Object.keys(demandList).length > 0 && <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_DemandSideInterventions_Header_Text")}</Typography></Grid>}
                            {Object.keys(demandList).map((activity, i) => {
                                const data = demandList[activity];
                                const [unit, value] = data ? Object.entries(data)[0] : ["N/A", ""];
                                return <ActCard key={i} activity={activity} value={value} unit={unit} />;
                            })}
                        </Grid></Grid>

                        <Grid item xs={12} md={4}>
                            <EsriMap />
                        </Grid>
                    </Grid >

                    <Modal open={Boolean(gMod)} onClose={() => setgMod('')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <Card sx={{ outline: 'none' }}>
                            <CardHeader title={gMod} sx={{ color: '#fff', bgcolor: sd('--text-color-special') }} />
                            <CardContent sx={{ gap: '8px', p: 1 }}>
                                <Box sx={{ overflowX: 'auto' }}>
                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                                        height={chartHeight}
                                        width={chartWidth}
                                    />
                                </Box>
                                <Box sx={{ mt: 2, width: "100%" }}>
                                    <PieChart
                                        margin={{ right: 170 }}
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 10, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.Bunding_data") },
                                                    { id: 1, value: 15, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.NalaTreatment_data") },
                                                    { id: 2, value: 20, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.CheckDam_data") },
                                                ],
                                            }
                                        ]}
                                        height={chartHeight}
                                    //width={chartWidth}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Modal>
                </>
        }
    </>)
}