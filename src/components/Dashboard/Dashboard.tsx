import React from 'react';
import { Box, Card, CardHeader, CardContent, CardMedia, Typography, Grid, Modal, IconButton } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Square, Water, Agriculture, CurrencyRupee } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { sd } from '../../common';
import { DashKey, DashSupply, DashDemand } from '../../Services/activityService';
import { useTranslation } from 'react-i18next';
import EsriMap from '../Map';


const keyCard = { height: '120px', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', /* position: 'relative', */ color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor'), p: '8px' }

const actCard = { height: '85px', overflow: 'auto', borderRadius: sd('--card-bradius'), color: sd('--text-color-special'), bgcolor: sd('--card-bgcolor') }

const ActivityCard: React.FC<{ activity: string, value: number, unit: string }> = ({ activity, value, unit }) => (
    <Grid item xs={6} lg={3}>
        <Card sx={actCard}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant='body1' fontWeight='bold'>{activity}</Typography>
                <Typography variant='body2'>{value} {unit}</Typography>
            </CardContent>
        </Card>
    </Grid>
)

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const [gMod, setgMod] = React.useState("");
    const [keyList, setkeyList] = React.useState<{ [key: string]: string }>({});
    const [supplyList, setsupplyList] = React.useState<{ [key: string]: { [unit: string]: number } }>({});
    const [demandList, setdemandList] = React.useState<{ [key: string]: { [unit: string]: number } }>({});

    React.useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const resp1 = await DashKey(); if (resp1) { setkeyList(resp1) }
            const resp2 = await DashSupply(); if (resp2) { setsupplyList(resp2) }
            const resp3 = await DashDemand(); if (resp3) { setdemandList(resp3) }
        }
        catch (error) { console.log(error) }
    }

    return (<>
        <Grid container spacing={1}>
            <Grid item xs={12}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.KeyImpactIndicators_Header_Text")}</Typography></Grid>
            <Grid item xs={12} md={3}><Card sx={keyCard}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Subheader_Text")}</Typography>
                    <CardMedia component={Square} sx={{ fontSize: '250%', color: '#96c22f' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'><b>{keyList?.totalAreaTreated || ''}</b></Typography>
                    <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton>
                </Box>
            </Card></Grid>
            <Grid item xs={12} md={3}><Card sx={keyCard}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WaterConserved_Subheader_Text")}</Typography>
                    <CardMedia component={Water} sx={{ fontSize: '250%', color: '#3b77b9' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'><b>{keyList?.totalWaterConserved || ''}</b></Typography>
                    <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.WaterConserved_Subheader.WatershedAreaTreated_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton>
                </Box>
            </Card></Grid>
            <Grid item xs={12} md={3}><Card sx={keyCard}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Subheader_Text")}</Typography>
                    <CardMedia component={Agriculture} sx={{ fontSize: '250%', color: '#f58e1d' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'><b>{keyList?.Farmers || ''}</b></Typography>
                    <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.FarmersImpacted_Subheader.FarmersImpacted_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton>
                </Box>
            </Card></Grid>
            <Grid item xs={12} md={3}><Card sx={keyCard}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '125%' }}>{t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Subheader_Text")}</Typography>
                    <CardMedia component={CurrencyRupee} sx={{ fontSize: '250%', color: '#bfab55' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'><b>{keyList?.totalAmountSpent || ''}</b></Typography>
                    <IconButton onClick={() => setgMod(t("p_Dashboard.ss_KeyImpactIndicators_Header.GovernmentAmountLeveraged_Subheader.GovernmentAmountLeveraged_Piechart.Piechart_Header"))}><BarChartIcon /></IconButton>
                </Box>
            </Card></Grid>

            <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_SupplySideInterventions_Header_Text")}</Typography> </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={1}>
                    {
                        Object.entries(supplyList)?.map(([activity, data], i) => {
                            const [unit, value] = Object.entries(data)[0];
                            return (
                                <ActivityCard key={i} activity={activity} value={value} unit={unit} />
                            );
                        })
                    }
                    <Grid item xs={12} sx={{ mt: 1 }}><Typography variant='h6' fontWeight='bold' sx={{ ml: 1, color: sd('--text-color-special') }}>{t("p_Dashboard.ss_DemandSideInterventions_Header_Text")}</Typography></Grid>
                    {
                        Object.entries(demandList)?.map(([activity, data], i) => {
                            const [unit, value] = Object.entries(data)[0];
                            return (
                                <ActivityCard key={i} activity={activity} value={value} unit={unit} />
                            );
                        })
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <EsriMap />
            </Grid>
        </Grid >

        <Modal open={Boolean(gMod)} onClose={() => setgMod('')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <Card sx={{ outline: 'none' }}>
                <CardHeader title={gMod} sx={{ color: '#fff', bgcolor: sd('--text-color-special') }} />

                <CardContent sx={{ gap: '8px', p: 1 }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                        height={200}
                        width={600}
                    />
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.Bunding_data") },
                                    { id: 1, value: 15, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.NalaTreatment_data") },
                                    { id: 2, value: 20, label: t("p_Dashboard.ss_KeyImpactIndicators_Header.WatershedAreaTreated_Subheader.WatershedAreaTreated_Piechart.CheckDam_data") },
                                ]
                            }
                        ]}
                        height={200}
                        width={600}
                    />
                </CardContent>
            </Card>
        </Modal>
    </>)
}