import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Circle } from "react-leaflet";
import { DragEndEvent, LeafletMouseEvent } from "leaflet";

import { Spot } from "../../../domain/model/Spot";
import { Location } from "../../../domain/model/Location";
import { history } from "../../../helpers/history";

export interface MapProps {
  center: Location;
  userPosition: Location;
  spots: Spot[];
  onCenterChange: (center: Location) => void;
  onSelectLocation: (location: Location) => void;
}

export const Map: React.FC<MapProps> = ({
  center,
  userPosition,
  spots,
  onCenterChange,
  onSelectLocation
}) => {
  const [zoom, setZoom] = useState(13);

  function updateCenter(e: DragEndEvent) {
    const newCenter = e.target.getCenter();

    onCenterChange({
      latitude: newCenter.lat,
      longitude: newCenter.lng
    });
  }

  function updateLocation(e: LeafletMouseEvent) {
    const location = e.target.getCenter();

    onSelectLocation({
      latitude: location.lat,
      longitude: location.lng
    });
  }

  return (
    <LeafletMap
      className="map"
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      ondragend={updateCenter}
      onzoomend={e => setZoom(e.target.getZoom())}
      onclick={updateLocation}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Circle
        center={[userPosition.latitude, userPosition.longitude]}
        color="red"
        fillColor="#f03"
        fillOpacity={0.5}
        radius={100}
      />

      {spots.map(spot => (
        <Marker
          key={spot.id}
          position={[spot.location.latitude, spot.location.longitude]}
          onclick={() => history.push(`/s/${spot.id}`)}
        />
      ))}
    </LeafletMap>
  );
};
