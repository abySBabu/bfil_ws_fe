import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import TileLayer from '@arcgis/core/layers/TileLayer';

const EsriMap: React.FC = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<MapView | null>(null);

    useEffect(() => {
        if (mapDiv.current) {
            const map = new Map({
                basemap: 'topo-vector',
            });

            const mapView = new MapView({
                container: mapDiv.current,
                map: map,
                center: [76.8343, 17.3297],
                zoom: 8,
            });

            const featureLayer1 = new TileLayer({
                url: 'https://kgis.ksrsac.in/kgismaps1/rest/services/NR_V2/Watershed/MapServer/4'
            });

            const featureLayer2 = new TileLayer({
                url: 'https://kgis.ksrsac.in/kgismaps2/rest/services/Boundaries/Admin_Cached/MapServer/1'
            });

            map.addMany([featureLayer1, featureLayer2]);
            mapView.ui.components = [];            
            setView(mapView);

            return () => {
                if (mapView) {
                    mapView.destroy();
                }
            };
        }
    }, []);

    // Full-screen toggle function
    const toggleFullScreen = () => {
        if (mapDiv.current) {
            if (!document.fullscreenElement) {
                mapDiv.current.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Box style={{ height: '50vh', position: 'relative' }}>
            {/* Map Div */}
            <div ref={mapDiv} style={{ height: '100%' }}></div>

            {/* Overlayed Zoom In, Zoom Out, and Fullscreen Buttons */}
            <Box style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px' // Space between buttons
                }}
>
                {/* Zoom In Button */}
                <IconButton
                    color="primary"
                    onClick={() => view?.goTo({ zoom: view.zoom + 1 })}
                    style={{ marginBottom: 10, backgroundColor: 'white' }}
                >
                    <ZoomInIcon />
                </IconButton>

                {/* Zoom Out Button */}
                <IconButton
                    color="primary"
                    onClick={() => view?.goTo({ zoom: view.zoom - 1 })}
                    style={{ marginBottom: 10, backgroundColor: 'white' }}
                >
                    <ZoomOutIcon />
                </IconButton>

                {/* Fullscreen Button */}
                <IconButton
                    color="primary"
                    onClick={toggleFullScreen}
                    style={{ backgroundColor: 'white' }}
                >
                    <FullscreenIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default EsriMap;
