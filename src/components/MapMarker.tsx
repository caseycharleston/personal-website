'use client';

import { Marker } from '@vnedyalk0v/react19-simple-maps';
import { useState } from 'react';

interface MapMarkerProps {
  coordinates: [number, number];
  popupTitle: string;
  popupText: string;
  popupLabel: string;
}

export default function MapMarker({
  coordinates,
  popupTitle,
  popupText,
  popupLabel,
}: MapMarkerProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Marker
      coordinates={coordinates}
      onClick={() => setShowPopup(!showPopup)}
      className="cursor-pointer"
    >
      <circle r={4} fill="#EF4444" stroke="#fff" strokeWidth={2} />

      <g transform="translate(0, -15)">
        <rect
          x="-20"
          y="-10"
          width="40"
          height="20"
          rx="10"
          ry="10"
          fill="#10b981"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text
          textAnchor="middle"
          y="4"
          style={{
            fontFamily: 'system-ui',
            fill: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          {popupLabel}
        </text>
      </g>

      {showPopup && (
        <g transform="translate(0, -40)">
          <rect
            x="-60"
            y="-30"
            width="120"
            height="50"
            rx="8"
            ry="8"
            fill="white"
            stroke="#10b981"
            strokeWidth="2"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
          />
          <text
            textAnchor="middle"
            y="-15"
            style={{
              fontFamily: 'system-ui',
              fill: '#1F2937',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {popupTitle}
          </text>
          <text
            textAnchor="middle"
            y="0"
            style={{
              fontFamily: 'system-ui',
              fill: '#6B7280',
              fontSize: '11px',
            }}
          >
            {popupText}
          </text>
          <polygon
            points="0,5 -8,-5 8,-5"
            fill="white"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
        </g>
      )}
    </Marker>
  );
}
