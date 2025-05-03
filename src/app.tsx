/**
 * Main entry point for the app. For a larger application,
 * I would implement a layout component to manage the header, footer, side panels, etc.
 * This would allow for a more consistent look and feel across the app
 * and abstract away the calcite components for better separation of concerns and readability.
 */
import React from "react";
import { useMap } from "./hooks/useMap";
import { defineCustomElements } from "@esri/calcite-components/loader";
import { InfoPanelWrapper } from "./components/InfoPanelWrapper";
import { ReactCalciteShell } from "@esri/calcite-components/types/react";

defineCustomElements();

export default function App() {
  const { mapDivRef, view } = useMap();
  console.log("App view", view);
  return (
    <>
      <calcite-shell>
        <calcite-shell-panel
          id="shell-panel-nav"
          slot="panel-end"
          display-mode="float"
          height="l"
        >
          <InfoPanelWrapper view={view} />
        </calcite-shell-panel>
      </calcite-shell>

      <div ref={mapDivRef} style={{ height: "100vh", width: "100%" }} />
    </>
  );
}
