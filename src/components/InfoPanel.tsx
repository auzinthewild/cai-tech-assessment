/**
 * UI component used to display information about the map.
 * It can show a layer list, legend, query panel, other widgets, or a custom component.
 * I've hardcoded the layerlist and legend, but depending on the complexity or use case,
 * these could be abstracted out into their own components like the QueryPanel.
 */
import React, { useEffect, useRef } from "react";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import QueryPanel from "../components/QueryPanel";

interface Props {
  id: string;
  label: string;
  activeId: string | null;
  view?: __esri.MapView | __esri.SceneView | null;
  panelStyle?: React.CSSProperties;
}

export const InfoPanel: React.FC<Props> = ({
  id,
  label,
  activeId,
  view,
  panelStyle,
}) => {
  const widgetDiv = useRef<HTMLDivElement | null>(null);

  const layerListRef = useRef<LayerList | null>(null);
  const legendRef = useRef<Legend | null>(null);

  // I'm using side effects to create the widgets, but these could be abstracted out into their own components
  useEffect(() => {
    if (!view || !widgetDiv.current) return;

    if (id === "layers" && !layerListRef.current) {
      layerListRef.current = new LayerList({
        view,
        container: widgetDiv.current,
      });
    }

    if (id === "legend" && !legendRef.current) {
      legendRef.current = new Legend({
        view,
        container: widgetDiv.current,
      });
    }

    return () => {
      layerListRef.current?.destroy();
      layerListRef.current = null;

      legendRef.current?.destroy();
      legendRef.current = null;
    };
  }, [id, view]);

  return (
    <calcite-block
      open
      data-block-id={id}
      hidden={activeId !== id}
      style={panelStyle}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>{label}</h3>

      {id === "layers" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div ref={widgetDiv} />
          <p style={{ margin: 0 }}>Click to toggle visibility</p>
        </div>
      )}
      {id === "legend" && <div ref={widgetDiv} />}
      {id === "query" && <QueryPanel />}
    </calcite-block>
  );
};
