import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageTile from 'ol/source/ImageTile';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import KML from 'ol/format/KML';
import { defaults } from 'ol/control/defaults';
import { defaults as interactionDefaults } from 'ol/interaction/defaults';

const EsriMap: React.FC = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if (mapDiv.current) {
            const layer1 = new TileLayer({
                source: new OSM(),
            });

            const kmlLayer = new VectorLayer({
                source: new VectorSource({
                    url: 'http://139.162.45.53:9091/TA2/2024/10/18/1729256165530Kalaburagi3.kml',
                    format: new KML(),
                }),
            });

            const rasterLayer = new TileLayer({
                source: new ImageTile({
                    url: 'https://kgis.ksrsac.in/kgismaps2/rest/services/CadastralData_Admin/Cached_CadastralData_Admin/MapServer/tile/{z}/{y}/{x}',
                }),
            });

            const olMap = new Map({
                target: mapDiv.current,
                layers: [layer1, rasterLayer, kmlLayer],
                view: new View({
                    center: fromLonLat([75.9218, 14.4644]),
                    zoom: 7,
                }),
                controls: defaults(),
                interactions: interactionDefaults({}),
            });

            setMap(olMap);

            return () => {
                olMap.setTarget(undefined); 
            };
        }
    }, []);

    // Full-screen toggle function
    const toggleFullScreen = () => {
        if (mapDiv.current) {
            if (!document.fullscreenElement) {
                mapDiv.current.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Box style={{
            height: '44vh', position: 'relative', border: '2px solid gray',
            borderRadius: '4px',
        }}>
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
                gap: '10px'
            }}>
                {/* Zoom In Button */}
            </Box>

            <Box style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
            }}>
                {/* Fullscreen Button */}
                <IconButton
                    onClick={toggleFullScreen}
                    style={{ backgroundColor: 'lightblue' }}
                >
                    <FullscreenIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default EsriMap;
