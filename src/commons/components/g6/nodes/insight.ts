import Group from "@antv/g-canvas/lib/group";
import { ShapeOptions } from "@antv/g6/lib/interface/shape";
import {
  ReatomicModel,
  createContentCard,
} from "./base";
import { createEmptyCard } from "./empty";

export const InsightNode = (): ShapeOptions => {
  return {
    draw: (cfg: ReatomicModel, group: Group) => {
      const colors = {
        principal: "#F1DAE7",
        shadow: "#F1DAE7",
        text: "#C93F8D",
      };

      if (cfg.empty) {
        return createEmptyCard(cfg, group, colors);
      }

      const x = cfg.x || 0;
      const y = cfg.y || 0;

      const high = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERDRFMyIvPgo8L3N2Zz4K";
      const low = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZFRjZENiIvPgo8L3N2Zz4K";
      const medium = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgd2lkdGg9Ijg4IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgODggMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBINzBDNzkuOTQxMSAwIDg4IDguMDU4ODggODggMThWMzZIMThDOC4wNTg4NyAzNiAwIDI3Ljk0MTEgMCAxOFYwWiIgZmlsbD0iI0ZERUFENCIvPgo8L3N2Zz4K";

      const values = {
          high: {
              text: "high",
              image: high,
          },
          medium: {
              text: "medium",
              image: medium,
          },
          low: {
              text: "low",
              image: low,
          }
      }

      const resolved = cfg.insightType === "high"
          ? values.high
          : cfg.insightType === "low"
          ? values.low
          : values.medium;

      const container = createContentCard(cfg, group, colors);
      group.addShape("image", {
          attrs: {
              x: x + (200 - 88),
              y,
              width: 88,
              height: 36,
              img: resolved.image,
          }
      });

      group.addShape("text", {
          attrs: {
              x: x + (200 - (56 + resolved.text.length)),
              y: y + 24,
              width: 88,
              height: 36,
              textAnchor: "middle",
              fontSize: 12,
              fontWeight: "normal",
              textBaseline: 'middle',
              fill: '#F60057',
              text: resolved.text,
          }
      });

      return container;
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
