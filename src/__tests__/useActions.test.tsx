/**
 * Super simple unit‑test example for the useActions hook.
 * Invokes useActions.labelWater() and verifies that it
 *      • writes a `labelingInfo` definition
 *      • sets `labelsVisible` to `true`
 *      • calls the layer’s `refresh()` method
 */
import { describe, vi, it, expect } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";

const stubLayer = {
  labelingInfo: undefined as any,
  labelsVisible: false,
  refresh: vi.fn(),
};

vi.mock("../state/layer-data-state", () => ({
  getLayers: vi.fn().mockResolvedValue(stubLayer),
}));

describe("useActions.labelWater()", () => {
  it("has visible, defined labels and refreshes ", async () => {
    // import the hook after the mock is defined to avoid hoisting issues (ask me how I know)
    const { useActions } = await import("../hooks/useActions");
    const { result } = renderHook(() => useActions());

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    act(() => {
      result.current!.labelWater("example-expression");
    });

    // assert side‑effects on the stub layer
    expect(stubLayer.labelingInfo).toBeDefined();
    expect(stubLayer.labelsVisible).toBe(true);
    expect(stubLayer.refresh).toHaveBeenCalled();
  });
});
