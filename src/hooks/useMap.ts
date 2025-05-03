/**
 * Custom hook that creates a Map and MapView widget and adds layers to the map.
 * Side‑effect only – it does not return anything.
 */
import React from "react";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { LayerDataProvider } from "../state/layer-data-state";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export function useMap() {
  const mapDivRef = useRef(null);
  const [view, setView] = useState<MapView | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const wetlands: FeatureLayer = await LayerDataProvider.getLayers();

      if (!mapDivRef.current) return;
      const map = new Map({
        basemap: "topo",
        layers: [wetlands],
      });

      const mapView = new MapView({
        container: mapDivRef.current,
        map,
      });

      mapView.when(() => {
        wetlands.when(() => mapView.goTo(wetlands.fullExtent));
      });

      if (isMounted) setView(mapView);

      return () => mapView.destroy();
    })();

    return () => {
      isMounted = false;
      setView(null);
    };
  }, []);

  return { mapDivRef, view };
}
