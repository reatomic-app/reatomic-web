import Group from "@antv/g-canvas/lib/group";
import { ShapeOptions } from "@antv/g6/lib/interface/shape";
import { ReatomicModel, createContentCard } from "./base";

export const ConclusionNode = (): ShapeOptions => {
  return {
    draw: (cfg: ReatomicModel, group: Group) => {
      const cardColors = {
        principal: "#FFD3CC",
        shadow: "#FFD3CC",
        text: "#FF5345",
      };

      return createContentCard(cfg, group, cardColors);
    },
    getAnchorPoints: () => {
      return [
        [0.5, 0], // middle of top side
        [1, 0.5], // middle of right side
        [0.5, 1.05], // middle of bottom side
        [0, 0.5], // middle of left side
      ];
    },
  };
}
