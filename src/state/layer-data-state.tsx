/**
 * This module is responsible for fetching the wetlands layer data and creating a FeatureLayer instance.
 * There isn't really much 'state' to manage here currently, but the idea is that this could be expanded to include
 * a state management solution like Redux to manage multiple layer handling, data editing, etc.
 */
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { getLayerUrls } from "../actions/get-layer-urls";

export interface LayerDataProviderType {
  getLayers(): Promise<FeatureLayer>;
}

// declare a module-level variable to hold the promise (**talking point**)
let layerPromise: Promise<FeatureLayer> | null = null;

// create and return an instance of the wetlands feature layer
export const LayerDataProvider: LayerDataProviderType = {
  async getLayers(): Promise<FeatureLayer> {
    if (layerPromise) return layerPromise;

    layerPromise = (async () => {
      const [url] = await getLayerUrls();

      return new FeatureLayer({
        url,
        outFields: ["SOIL_TYPE"],
        renderer: new SimpleRenderer({
          symbol: new SimpleFillSymbol({
            color: [76, 129, 205, 191],
            outline: {
              type: "simple-line",
              style: "dash",
              width: 1.5,
              color: [255, 0, 0, 1],
            },
          }),
        }),
      });
    })();

    return layerPromise;
  },
};
