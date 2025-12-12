'use client';

import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Marker } from '@vnedyalk0v/react19-simple-maps';
import { Fragment, useEffect, useRef } from 'react';
import { useMapPopup } from './MapChart';

interface MapMarkerProps {
  id: string;
  coordinates: [number, number];
  popupTitle: string;
  popupText: string;
  popupLabel: string;
  labelFontSize?: number;
}

export default function MapMarker({
  id,
  coordinates,
  popupTitle,
  popupText,
  popupLabel,
  labelFontSize = 14,
}: MapMarkerProps) {
  const { openId, setOpenId } = useMapPopup();
  const isOpen = openId === id;
  const markerRef = useRef<SVGGElement | null>(null);
  const labelSizeClass =
    labelFontSize >= 18 ? 'text-lg' : labelFontSize >= 16 ? 'text-base' : 'text-sm';
  const labelWidth = Math.max(40, popupLabel.length * (labelFontSize * 0.6) + labelFontSize);
  const labelHeight = Math.max(22, labelFontSize * 1.6);

  useEffect(() => {
    if (isOpen && markerRef.current?.parentElement?.parentElement) {
      const markerGroup = markerRef.current.parentElement;
      markerRef.current.parentElement.parentElement.appendChild(markerGroup);
    }
  }, [isOpen]);

  const handleClick = () => {
    setOpenId(isOpen ? null : id);
  };

  return (
    <Fragment>
      <Marker coordinates={coordinates} onClick={handleClick} className="cursor-pointer">
        <g ref={markerRef}>
          <circle r={4} className="fill-red-500 stroke-white stroke-[2]" />

          <g transform="translate(0, -15)">
            <rect
              x={-labelWidth / 2}
              y={-labelHeight / 2}
              width={labelWidth}
              height={labelHeight}
              rx="10"
              ry="10"
              className="fill-emerald-500 stroke-emerald-600 stroke-[1.5]"
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={() => setOpenId(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-[#F2F0E5] p-6 text-center shadow-2xl shadow-black/10">
                  <DialogTitle className="text-2xl font-semibold text-gray-900">
                    {popupTitle}
                  </DialogTitle>
                  <Description className="mt-3 text-base text-gray-600">
                    {popupText}
                  </Description>
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    Close
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
