import Group from "@antv/g-canvas/lib/group";
import { ShapeOptions } from "@antv/g6/lib/interface/shape";
import VueI18n from "vue-i18n";
import {
  ReatomicModel,
  createContentCard,
  resolveHeight,
  resolveWidth,
} from "./base";

export const DataSourceNode = (i18n: VueI18n): ShapeOptions => {
  return {
    draw: (cfg: ReatomicModel, group: Group) => {
      const x = cfg.x || 0;
      const y = cfg.y || 0;
      const width = resolveWidth(cfg.size);
      const height = resolveHeight(cfg.size);
      const colors = {
        principal: "#C4BFD9",
        shadow: "#C4BFD9",
        text: "#413673"
      };

      const container = createContentCard(cfg, group, colors);

      group.addShape('text', {
          attrs: {
              text: cfg.dataSourceType,
              x: x + (width * 0.1),
              y: y + (height * 0.12),
              textAnchor: "middle",
              fontSize: 20,
              fontFamily: "Cabin",
              fontWeight: "bold",
              textBaseline: 'middle',
              fill: '#413673',
              cursor: 'pointer',
            },
            name: 'ip-text-shape',
      });
      group.addShape('text', {
          attrs: {
              text: i18n.d(cfg.date, "short", "es-ES"),
              x: x + (width * 0.1),
              y: y + (height * 0.21),
              textAnchor: "middle",
              fontSize: 14,
              fontFamily: "Cabin",
              fontWeight: "normal",
              textBaseline: 'middle',
              fill: 'rgba(196, 191, 217, 1)',
              cursor: 'pointer',
            },
            name: 'ip-text-shape',
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
