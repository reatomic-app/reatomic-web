import type { ShapeOptions, ModelConfig, IGroup } from "@antv/g6/lib";
import type { ReatomicModel } from "./base";

import {
  resolveWidth,
  resolveHeight,
  createContentCard
} from "./base";

import icons from "./icons";

const resolveIcon = (key: string): string => {
  switch(key) {
    case "wish": return icons.HeartIcon;
    case "pain": return icons.SadIcon;
    case "quote": return icons.QuoteIcon;
    default:
      return icons.HappyIcon;
  }
}

export const createIcon = (x: number, y: number, group: IGroup, width: number, height: number, type: string): void => {
  group.addShape("image", {
    attrs: {
      x: x + (width * 0.1),
      y: y + (height * 0.1),
      width: 25,
      height: 25,
      img: resolveIcon(type),
    },
    name: "fact-type",
  })
}

export const FactNode = (): ShapeOptions => {
  return {
    draw: (model: ModelConfig, group: IGroup) => {
      const cfg: ReatomicModel = model as ReatomicModel;
      const x = cfg.x || 0;
      const y = cfg.y || 0;
      const width = resolveWidth(cfg.size);
      const height = resolveHeight(cfg.size);
      const attrs = {
        colors: {
          principal: "#CDE4E4",
          shadow: "#CDE4E4",
          text: "#479696"
        },
        iconType: cfg.factType,
      };

      const container = createContentCard(cfg, group, attrs.colors);

      if (attrs.iconType) {
        createIcon(x, y, group, width, height, attrs.iconType);
      }

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
      if (name === "hover" && node) {
        const group = node.getContainer();
        const child = group.findById("plusBtn");
        
        if (value) {
          child.attr("opacity", 1);
        } else {
          child.attr("opacity", 0);
        }
      }
    },

  };
}
