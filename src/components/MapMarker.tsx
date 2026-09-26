'use client';

import { Marker, createCoordinates } from '@vnedyalk0v/react19-simple-maps';
import { useRef } from 'react';

interface MapMarkerProps {
  coordinates: [number, number];
  popupLabel: string;
  labelFontSize?: number;
  /** Positions the label above these coordinates instead, so labels of nearby markers can share a column. */
  labelAnchor?: [number, number];
  /** Stacks the label this many rows above the default position, for markers too close to label side by side. */
  labelStackIndex?: number;
}

export default function MapMarker({
  coordinates,
  popupLabel,
  labelFontSize = 14,
  labelAnchor = coordinates,
  labelStackIndex = 0,
}: MapMarkerProps) {
  const markerRef = useRef<SVGGElement | null>(null);
  const markerCoordinates = createCoordinates(coordinates[0], coordinates[1]);
  const labelCoordinates = createCoordinates(labelAnchor[0], labelAnchor[1]);
  const labelSizeClass =
    labelFontSize >= 18 ? 'text-lg' : labelFontSize >= 16 ? 'text-base' : 'text-sm';
  const labelWidth = Math.max(40, popupLabel.length * (labelFontSize * 0.6) + labelFontSize);
  const labelHeight = Math.max(22, labelFontSize * 1.6);
  const labelOffsetY = -25 - labelStackIndex * (labelHeight + 4);

  return (
    <>
      <Marker coordinates={markerCoordinates} className="cursor-default">
        <g ref={markerRef}>
          <circle r={4} className="fill-red-500 stroke-white stroke-[2]" />
        </g>
      </Marker>
      <Marker coordinates={labelCoordinates} className="cursor-default">
        <g transform={`translate(0, ${labelOffsetY})`}>
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
      </Marker>
    </>
  );
}
