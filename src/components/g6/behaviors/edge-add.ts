import type { BehaviorOption, IG6GraphEvent, Item, IEdge, Graph } from '@antv/g6/lib';
import type { ReatomicModel } from "../nodes/base";
import type { Link } from "../../../domain";

// import { ProjectManagerStore } from '@/reatomic/projects/application/services/ProjectManagerStore';

function hasClickedOnSourceLink(ev: IG6GraphEvent): boolean {
  const shapeClicked = ev.shape;
  //console.log(!!ev.propagationPath.find((it) => it.get("id") === "plusBtn" ));
  return (shapeClicked.attr() && shapeClicked.attr("text") && shapeClicked.attr("text") === "source")
    || !!ev.propagationPath.find((it) => it.get("id") === "plusBtn" );
}

function isValidTarget(source: ReatomicModel, target: ReatomicModel): boolean {
  return (source.type === "data-source" && target.type === "fact") ||
    (source.type === "fact" && target.type === "insight") ||
    (source.type === "insight" && target.type === "conclusion");
}

export const AddEdgeByClickBehavior = (graph: Graph, onAddLink: (link: Link) => void): BehaviorOption => {
  let edge: Item | null = null;

  return {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
      return {
        'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
        "mousemove": 'onMousemove', // The event is mousemove, the responsing function is onMousemove
        "keyup": "onKeyUp",
        'edge:click': 'onEdgeClick', // The event is edge:click, the responsing function is onEdgeClick
      };
    },

    onKeyUp(ev: KeyboardEvent) {
      if (ev.code === "Escape" && edge) {
        graph.removeItem(edge);
        edge = null;
      }
    },

    // The responsing function for node:click defined in getEvents
    onClick(ev: IG6GraphEvent) {
      const node = ev.item;
      const isSourceClicked = hasClickedOnSourceLink(ev);
      // console.log("isSourceClicked", isSourceClicked);

      const target = node?.getModel() as ReatomicModel;
      const source = edge?.getSource().getModel() as ReatomicModel;

      // TODO Move this to its custom behavior
      if (isSourceClicked) {
        // window.open(model.url);
        return;
      }

      // The position where the mouse clicks
      if (target && !edge){
        // Add anew edge, the end node is the current node user clicks
        edge = graph.addItem('edge', {
          source: target.id,
          target: target.id,
          // edges go from source bottom center to target top center
          sourceAnchor: 2,
          targetAnchor: 0,
        }) as Item;
      } else if (edge && target && isValidTarget(source, target)) {
        const source = edge.getSource().getModel() as ReatomicModel;
        // graph.updateItem(edge, { target: target.id });
        const myEdge = edge as IEdge;
        const link = {
          source: myEdge.getSource().getID(),
          target: myEdge.getTarget().getID()
        };
        onAddLink(link);

        graph.removeItem(edge);
        edge = null;
      }
    },

    // The responsing function for mousemove defined in getEvents
    onMousemove(ev: IG6GraphEvent) {
      // The current position the mouse clicks
      let point = { x: ev.x, y: ev.y };

      let toNode = null;

      if (ev.item && ev.item.getType() === "node"){
        const source = edge.getSource().getModel() as ReatomicModel;
        const target = ev.item.getModel() as ReatomicModel;
        if (isValidTarget(source, target)) {
          toNode = ev.item;
          point = ev.item.getID();
        }
      }

      if (edge) {
        // Update the end node to the current node the mouse clicks
        graph.updateItem(edge, {
          target: point,
          style: {
            stroke: (!toNode) ? "red" : "black",
          },
        });
      }
    },

    // The responsing function for edge:click defined in getEvents
    onEdgeClick(ev: IG6GraphEvent) {
      const currentEdge: Item | null = ev.item;

      if (!edge && currentEdge.getType() === "edge") {
        edge = currentEdge;
      }
    },
  }
};
