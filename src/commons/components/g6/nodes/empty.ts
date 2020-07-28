import Group from '@antv/g-canvas/lib/group';
import { IShape } from "@antv/g-base/lib/interfaces";
import { ReatomicModel, resolveHeight, resolveWidth, CardColors } from "./base"

export const createEmptyCard = (cfg: ReatomicModel, group: Group, colors: CardColors): IShape => {
  const width = resolveWidth(cfg.size);
  const height = resolveHeight(cfg.size);
  const x = cfg.x || 0;
  const y = cfg.y || 0;

  // BACKGROUND
  const container = group.addShape('rect', {
      attrs: {
          x,
          y,
          width,
          height,
          fill: "#FFF",
          stroke: colors.principal,
          radius: 20,
      },
      name: "card",
      draggable: true
  });

  return container;
}
