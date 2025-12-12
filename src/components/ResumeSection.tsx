'use client'
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from '@vnedyalk0v/react19-simple-maps';
import geoData from '../../public/maps/north-america-minus-islands.json';

const MapChart: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interactive World Map
          </h1>
          <p className="text-gray-600">
            Hover over regions to highlight them. Red marker shows example location.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 600,
              center: [-100, 45],
            }}
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#9CA3AF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { 
                        fill: '#3B82F6',
                        outline: 'none' 
                      },
                      pressed: { 
                        fill: '#1E40AF',
                        outline: 'none' 
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            <Marker coordinates={[-74.006, 40.7128]}>
              <circle r={4} fill="#EF4444" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={-15}
                style={{ 
                  fontFamily: 'system-ui',
                  fill: '#1F2937',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                NYC
              </text>
            </Marker>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default MapChart;