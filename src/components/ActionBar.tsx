/**
 * UI component that displays a horizontal action bar with icons and labels.
 * The action bar allows the user to select different actions by clicking on the icons.
 * The selected action is highlighted, and the corresponding action ID is passed to the onSelect callback
 * which is used to update the active action in the parent component and render the corresponding info panel.
 */
import React, { useRef, useEffect } from "react";

export interface ActionSpec {
  id: string;
  icon: string;
  label: string;
}

interface ActionBarType {
  actions: readonly ActionSpec[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ActionBar({ actions, activeId, onSelect }: ActionBarType) {
  const barRef = useRef<HTMLCalciteActionBarElement | null>(null);

  const handleClick = (e) => {
    const action = (e.target as HTMLElement).closest("calcite-action");
    if (!action) return;
    const id = action.getAttribute("data-action-id")!;
    onSelect(id);
  };

  // keeps .active attribute in sync with state
  useEffect(() => {
    if (!barRef.current) return;
    barRef.current
      .querySelectorAll("calcite-action")
      .forEach(
        (el) =>
          ((el as any).active = el.getAttribute("data-action-id") === activeId)
      );
  }, [activeId]);

  return (
    <calcite-action-bar
      id="map-actions"
      slot="action-bar"
      layout="horizontal"
      ref={barRef}
      onClick={handleClick}
    >
      {actions.map(({ id, icon, label }) => (
        <calcite-action key={id} icon={icon} text={label} data-action-id={id} />
      ))}
    </calcite-action-bar>
  );
}
