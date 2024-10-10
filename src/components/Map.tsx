import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Map from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Query from '@arcgis/core/rest/query'; // Import Query

const EsriMap: React.FC = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const [details, setDetails] = useState<string | null>(null);

    useEffect(() => {
        if (mapDiv.current) {

            const basemap = new Basemap({
                portalItem: {
                    id: "3731ffe6b1b64168b9c3a4381698afee"  // WGS84 Streets Vector webmap
                }
            });
            const map = new Map({
                basemap: 'topo-vector',
            });

            const view = new MapView({
                container: mapDiv.current,
                map: map,
                center: [76.8343, 17.3297],
                zoom: 8
            });

            const featureLayer1 = new TileLayer({
                url: 'https://kgis.ksrsac.in/kgismaps1/rest/services/NR_V2/Watershed/MapServer/4'
            });

            const featureLayer2 = new TileLayer({
                // url: 'https://kgis.ksrsac.in/kgismaps1/rest/services/CadastralData_Admin/Cached_CadastralData_Admin/MapServer'
                url: 'https://kgis.ksrsac.in/kgismaps2/rest/services/Boundaries/Admin_Cached/MapServer/1'
            });

            // map.add(featureLayer1);
            map.addMany([featureLayer1, featureLayer2]);

            view.on('click', (event) => {
                const mapPointDetails = JSON.stringify(event.mapPoint, null, 2);

                setDetails(`MapPoint Details:\n${mapPointDetails}`);
            });


            // view.on('click', (event) => {
            //     const query1 = featureLayer1.createQuery();
            //     const query2 = featureLayer2.createQuery();
            //     query1.geometry = event.mapPoint;
            //     query1.returnGeometry = true;
            //     query1.outFields = ['*']; // Adjust fields as needed
            //     query2.geometry = event.mapPoint;
            //     query2.returnGeometry = true;
            //     query2.outFields = ['*']; // Adjust fields as needed

            //     featureLayer1.queryFeatures(query1).then((response) => {
            //         if (response.features.length > 0) {
            //             const attributes = response.features[0].attributes;
            //             setDetails(JSON.stringify(attributes, null, 2));
            //         } else {
            //             setDetails('No feature found.');
            //         }
            //     }).catch(error => {
            //         console.error("Query error:", error);
            //         setDetails('Error retrieving feature details.');
            //     });
            //     featureLayer2.queryFeatures(query2).then((response) => {
            //         if (response.features.length > 0) {
            //             const attributes = response.features[0].attributes;
            //             setDetails1(JSON.stringify(attributes, null, 2));
            //         } else {
            //             setDetails1('No feature found.');
            //         }
            //     }).catch(error => {
            //         console.error("Query error:", error);
            //         setDetails('Error retrieving feature details.');
            //     });
            // });

            view.on('pointer-move', (event) => {
                // Optionally, you could highlight or show tooltips on hover
            });

            view.ui.components = []; // Remove default UI components

            return () => {
                if (view) {
                    view.destroy(); // Properly destroy the view
                }
            };
        }
    }, []); // Only run once

    return (
        <Container style={{ height: '50vh', width: '50vw', margin: '5%' }}>
            <div ref={mapDiv} style={{ height: '100%' }}></div>
            <Box mt={2}>
                <Typography variant="h6">Feature Details:</Typography>
                <Typography variant="body1" component="pre">
                    {details || 'Click on a feature to see details'}
                </Typography>
            </Box>
        </Container>
    );
};

export default EsriMap;
