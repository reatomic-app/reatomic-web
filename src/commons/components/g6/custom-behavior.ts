import { BehaviorOption, IG6GraphEvent, Item } from '@antv/g6/lib/types';
import Graph from '@antv/g6/lib/graph/graph';


export const AddEdgeByClickBehavior = (graph: Graph): BehaviorOption => {
  let edge: Item | null = null;
  let addingEdge = false;

  return {
  // Set the events and the corresponding responsing function for this behavior
  getEvents() {
    return {
      'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
      mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
      'edge:click': 'onEdgeClick', // The event is edge:click, the responsing function is onEdgeClick
    };
  },
  // The responsing function for node:click defined in getEvents
  onClick(ev: IG6GraphEvent) {
    const node = ev.item;
    // The position where the mouse clicks
    const model = node ? node.getModel() : null;
    if (addingEdge && edge && model) {
      graph.updateItem(edge, {
        target: model.id,
      });
      edge = null;
      addingEdge = false;
    } else if (model){
      // Add anew edge, the end node is the current node user clicks
      edge = graph.addItem('edge', {
        source: model.id,
        target: model.id,
        // edges go from source bottom center to target top center
        sourceAnchor: 2,
        targetAnchor: 0,
      });
      addingEdge = true;
    } else if (edge) {
      graph.removeItem(edge);
    }
  },
  // The responsing function for mousemove defined in getEvents
  onMousemove(ev: IG6GraphEvent) {
    // The current position the mouse clicks
    const point = { x: ev.x, y: ev.y };
    if (addingEdge && edge) {
      // Update the end node to the current node the mouse clicks
      graph.updateItem(edge, {
        target: point,
      });
    }
  },
  // The responsing function for edge:click defined in getEvents
  onEdgeClick(ev: IG6GraphEvent) {
    const currentEdge: Item | null = ev.item;

    if (!addingEdge) {
      graph.removeItem(currentEdge ? currentEdge : "");
      edge = null;
      addingEdge = false;
    }
  },
}
};
