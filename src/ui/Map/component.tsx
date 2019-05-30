import React from "react";
import {
  Map as LeafletMap,
  MapProps as LeafletMapProps,
  TileLayer as LeafletTileLayer,
  Marker as LeafletMarker,
  CircleMarker as LeafletCircle
} from "react-leaflet";

import { Location } from "../../domain/model/Location";
import { DragEndEvent, LeafletEvent, LeafletMouseEvent } from "leaflet";

export interface Marker {
  id: string;
  position: Location;
  onClick?: (id: string) => void;
}

export interface MapProps {
  isFixed: boolean;
  className?: string;
  style?: { [key: string]: string };
  currentPosition?: Location;
  center: Location;
  onCenterChange?: (newCenter: Location) => void;
  zoomLevel: number;
  onZoomLevelChange?: (newZoomLevel: number) => void;
  onSelectLocation?: (location: Location) => void;
  markers?: Marker[];
}

export const Map: React.FC<MapProps> = ({
  isFixed,
  center,
  className,
  style,
  currentPosition,
  onCenterChange,
  onSelectLocation,
  zoomLevel,
  onZoomLevelChange,
  markers
}) => {
  // Map configuration
  const additionalMapProps: Partial<LeafletMapProps> = {};

  if (isFixed) {
    additionalMapProps.dragging = false;
    additionalMapProps.zoomControl = false;
    additionalMapProps.scrollWheelZoom = false;
  }

  // Event Handlers
  function handleDragEnd(e: DragEndEvent) {
    const newCenter = e.target.getCenter();

    onCenterChange &&
      onCenterChange({
        latitude: newCenter.lat,
        longitude: newCenter.lng
      });
  }

  function handleZoomEnd(e: LeafletEvent) {
    onZoomLevelChange && onZoomLevelChange(e.target.getZoom());
  }

  function handleClick(e: LeafletMouseEvent) {
    const location = e.target.getCenter();

    onSelectLocation &&
      onSelectLocation({
        latitude: location.lat,
        longitude: location.lng
      });
  }

  return (
    <LeafletMap
      className={["map", className].join(" ")}
      style={style}
      center={[center.latitude, center.longitude]}
      zoom={zoomLevel}
      ondragend={handleDragEnd}
      onzoomend={handleZoomEnd}
      onclick={handleClick}
      {...additionalMapProps}
    >
      <LeafletTileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {currentPosition && (
        <LeafletCircle
          center={[currentPosition.latitude, currentPosition.longitude]}
          fillOpacity={0.5}
          radius={30}
        />
      )}

      {markers &&
        markers.map(marker => (
          <LeafletMarker
            key={marker.id}
            position={[marker.position.latitude, marker.position.longitude]}
            onclick={() => marker.onClick && marker.onClick(marker.id)}
          />
        ))}
    </LeafletMap>
  );
};
