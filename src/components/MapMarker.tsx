'use client';

import { Marker, createCoordinates } from '@vnedyalk0v/react19-simple-maps';
import { useRef } from 'react';

interface MapMarkerProps {
  id: string;
  coordinates: [number, number];
  popupLabel: string;
  labelFontSize?: number;
}

export default function MapMarker({ coordinates, popupLabel, labelFontSize = 14 }: MapMarkerProps) {
  const markerRef = useRef<SVGGElement | null>(null);
  const markerCoordinates = createCoordinates(coordinates[0], coordinates[1]);
  const labelSizeClass =
    labelFontSize >= 18 ? 'text-lg' : labelFontSize >= 16 ? 'text-base' : 'text-sm';
  const labelWidth = Math.max(40, popupLabel.length * (labelFontSize * 0.6) + labelFontSize);
  const labelHeight = Math.max(22, labelFontSize * 1.6);

  return (
    <Marker coordinates={markerCoordinates} className="cursor-default">
      <g ref={markerRef}>
        <circle r={4} className="fill-red-500 stroke-white stroke-[2]" />

        <g transform="translate(0, -25)">
          <rect
            x={-labelWidth / 2}
            y={-labelHeight / 2}
            width={labelWidth}
            height={labelHeight}
            rx="10"
            ry="10"
            className="fill-accent stroke-accent-hover stroke-[1.5]"
          />
          <text
            textAnchor="middle"
            y="0"
            className={`pointer-events-none fill-white font-bold ${labelSizeClass}`}
            dominantBaseline="middle"
            style={{ fontSize: `${labelFontSize}px` }}
          >
            {popupLabel}
          </text>
        </g>
      </g>
    </Marker>
  );
}
