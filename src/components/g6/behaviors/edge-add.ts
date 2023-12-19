import type { BehaviorOption, IG6GraphEvent, Item, IEdge, Graph } from '@antv/g6/lib';
import type { ReatomicModel } from "../nodes/base";
import type { Link } from "../../../domain";

// import { ProjectManagerStore } from '@/reatomic/projects/application/services/ProjectManagerStore';


const hasClickedOnSourceLink = (ev: IG6GraphEvent): boolean => {
  const shapeClicked = ev.shape;
  return shapeClicked.attr() && shapeClicked.attr("text") && shapeClicked.attr("text") === "source";
}

export const AddEdgeByClickBehavior = (graph: Graph, onAddLink: (link: Link) => void): BehaviorOption => {
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
      const isSourceClicked = hasClickedOnSourceLink(ev);
      const model: ReatomicModel = (node ? node.getModel() : null) as ReatomicModel;

      if (isSourceClicked && model && model.url) {
        window.open(model.url);
        return;
      }
      
      // The position where the mouse clicks
      if (addingEdge && edge && model) {
        graph.updateItem(edge, {
          target: model.id,
        });

        // TODO: check we're not linking one with itself
        const myEdge = edge as IEdge;
        const link = {
          id: myEdge.getID(),
          source: myEdge.getSource().getID(),
          sourceAnchor: 2,
          target: myEdge.getTarget().getID(),
          targetAnchor: 0
        };

        onAddLink(link);
        
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
        }) as Item;
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
