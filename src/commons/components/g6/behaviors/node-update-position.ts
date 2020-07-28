import { INode } from '@antv/g6/lib/interface/item';
import { Graph } from "@antv/g6";
import { BehaviorOption, IG6GraphEvent } from '@antv/g6/lib/types';
import { ProjectManagerStore } from '@/reatomic/projects/application/services/ProjectManagerStore';

export const UpdateNodePosition = (graph: Graph, store: ProjectManagerStore): BehaviorOption => {
  return {
    getEvents() {
      return {
        "node:dragend": "dragend",
      };
    },
    dragend(ev: IG6GraphEvent) {
      const node = ev.item as INode;
      const bound = node.getBBox();
      const nodeId = node.getID();

      // updates the card new position
      store.updateCardPosition(nodeId, { x: bound.x, y: bound.y });

      // shows all the nodes with new position
      graph.layout();
    },
  }
};
