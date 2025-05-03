/**
 * UI wrapper component that contains the action bar and info panels.
 * The action bar allows the user to select which info panel to display.
 * The info panels can be a layer list, legend, query panel, or other widgets/components.
 */
import React, { useState, useCallback } from "react";
import { ActionBar } from "./ActionBar";
import { InfoPanel } from "./InfoPanel";
import type MapView from "@arcgis/core/views/MapView";

interface Props {
  view: MapView | null;
}

export const InfoPanelWrapper: React.FC<Props> = ({ view }) => {
  const [activeId, setActiveId] = useState<string | null>("query");

  const handleSelect = useCallback(
    (id: string) => setActiveId((prev) => (prev === id ? null : id)),
    []
  );

  const ACTIONS = [
    { id: "query", icon: "query", label: "Query" },
    { id: "layers", icon: "layers", label: "Layers" },
    { id: "legend", icon: "legend", label: "Legend" },
  ] as const;

  return (
    <calcite-panel id="app-heading" width="l">
      <ActionBar
        actions={ACTIONS}
        activeId={activeId}
        onSelect={handleSelect}
      />

      {ACTIONS.map(({ id, label }) => (
        <InfoPanel
          key={id}
          id={id}
          label={label}
          activeId={activeId}
          view={view}
          panelStyle={{ padding: "0.5rem 1rem" }}
        />
      ))}
    </calcite-panel>
  );
};
