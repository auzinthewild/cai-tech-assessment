/**
 * Fetches (mock) layer URLs.
 * I'm pretending this is fetching from a back‑end service that returns a list of FeatureServer URLs.
 * In a real application, this would be replaced with an actual API call.
 * For this example, I just return the hardcoded URL of the wetlands layer.
 */
export async function getLayerUrls(): Promise<string[]> {
  // fake latency
  await new Promise((r) => setTimeout(r, 10));
  return [
    "https://services1.arcgis.com/6lR7mtkopfEfHUZf/arcgis/rest/services/Designated_Wetlands/FeatureServer/0",
  ];
}
