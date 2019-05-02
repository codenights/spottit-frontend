import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Circle } from "react-leaflet";

import { Spot } from "../../../domain/model/Spot";
import { Location } from "../../../domain/model/Location";
import { history } from "../../../helpers/history";

export interface MapProps {
  center: Location;
  userPosition: Location;
  spots: Spot[];
  onCenterChange: (center: Location) => void;
}

export const Map: React.FC<MapProps> = ({
  center,
  userPosition,
  spots,
  onCenterChange
}) => (
  <LeafletMap
    className="map"
    center={[center.latitude, center.longitude]}
    zoom={13}
    ondragend={e => {
      const newCenter = e.target.getCenter();

      onCenterChange({
        latitude: newCenter.lat,
        longitude: newCenter.lng
      });
    }}
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
