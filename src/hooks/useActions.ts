/**
 * Custom hook that provides high-level actions for the layer.
 * Currently, it only provides a single action to label water features
 * per the exercise requirements, but it could be extended to
 * include more actions, i.e. adding/removing layers, changing
 * symbology, querying, spatial operations like buffering/etc.
 */
import { useEffect, useMemo, useState } from "react";
import { LayerDataProvider } from "../state/layer-data-state";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export interface ActionsType {
  labelWater: (expression: string) => void;
}

export function useActions(): ActionsType | null {
  const [layer, setLayer] = useState<FeatureLayer | null>(null);

  useEffect(() => {
    const loadLayer = async () => {
      const layer = await LayerDataProvider.getLayers();
      setLayer(layer);
    };

    loadLayer();
  }, []);

  // I'm memoize-ing the actions to avoid re-creating them on every render
  return useMemo(() => {
    if (!layer) return null;

    const labelWater = (expression: string) => {
      const definitionExpression = expression;
      layer.labelingInfo = [
        {
          labelExpressionInfo: {
            expression: `Iif($feature.${definitionExpression}, 'TRUE', 'FALSE')`,
          },
          symbol: {
            type: "text",
            color: "black",
            haloColor: "white",
            haloSize: "3px",
            font: {
              family: "Noto Sans",
              size: 14,
              weight: "bold",
            },
          },
        } as any,
      ];
      layer.labelsVisible = true;
      layer.refresh();
    };

    return { labelWater };
  }, [layer]);
}
