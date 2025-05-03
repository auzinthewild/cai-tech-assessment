/**
 * UI widget that allows the user to query the wetlands layer.
 * Uses the `useActions` hook to get the action helpers to do the actual query work.
 * Could be expanded to included more query options, like selecting a field, operator, and value.
 */
import React, { useState } from "react";
import { useActions } from "../hooks/useActions";

export default function QueryPanel() {
  const actions = useActions();
  const [expr, setExpr] = useState("SOIL_TYPE == 'WATER'");

  if (!actions) return null;
  const { labelWater } = actions;

  return (
    <div className="esri-widget" style={{ padding: 8, background: "white" }}>
      <calcite-input
        value={expr}
        oncalciteInputInput={(e: any) => setExpr(e.target.value)}
      ></calcite-input>

      <calcite-label style={{ marginTop: ".25rem", marginLeft: ".25rem" }}>
        Enter expression
      </calcite-label>

      <calcite-button
        icon-end="launch"
        style={{ marginTop: "0.5rem" }}
        onClick={() => labelWater(expr)}
      >
        Execute query
      </calcite-button>
    </div>
  );
}
