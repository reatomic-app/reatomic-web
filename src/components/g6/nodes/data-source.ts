import type { ShapeOptions, ModelConfig, IGroup } from "@antv/g6/lib";
import type { ReatomicModel } from "./base";
import { createContentCard, resolveHeight, resolveWidth } from "./base";

export const DataSourceNode = (): ShapeOptions => {
  return {
    draw: (model: ModelConfig, group: IGroup) => {
      const cfg: ReatomicModel = model as ReatomicModel;
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
          text: `${cfg.date.toISOString()}`,//i18n.d(cfg.date, "short", "es-ES"),
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

    setState(name, value, node) {
      if (name === "hover") {
        const group = node.getContainer();
        const bb = group.getBBox()
        if (value) {
          const plusBtn = group.addGroup({
            id: "plusBtn",
            attrs: {
              cursor: "pointer"
            }
          });

          plusBtn.addShape('circle', {
            attrs: {
              x: bb.x + (bb.width / 2),
              y: bb.maxY - 10,
              fill: "white",
              stroke: "#C4BFD9",
              lineWidth: 3,
              r: 20,
              cursor: "pointer"
            },
            name: "buttonBackground",
          });
        } else {
          const child = group.findById("plusBtn");
          group.removeChild(child);
        }
      }
    },

  };
}
