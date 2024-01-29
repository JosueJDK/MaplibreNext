"use client"

import "./map.css"
import * as React from 'react';
import {useState, useCallback} from 'react';
import maplibregl from "maplibre-gl";
import Map, {GeolocateControl, NavigationControl, useControl} from 'react-map-gl/maplibre';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import DrawControl from '../controls/draw-controls';

export default function CustomMap() {

  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e: { features: any; }) => {
    setFeatures(currFeatures => {
      const newFeatures : any = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: { features: any; }) => {
    setFeatures(currFeatures => {
      const newFeatures : any = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  
  return (
    <>
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapLib={maplibregl}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=LiH20XNxcFiTXyT4fgjM"
      >
      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          point: true,
          line_string: true,
          polygon: true,
          trash: true
        }}
        
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      <NavigationControl position='bottom-right'/>
      <GeolocateControl position='bottom-right'/>
    </Map>
  
    </>
  );
}