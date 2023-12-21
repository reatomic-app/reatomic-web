import type { BehaviorOption, IG6GraphEvent, Item, IEdge, Graph } from '@antv/g6/lib';
import type { ReatomicModel } from "../nodes/base";
import type { Card, Link } from "../../../domain";
import { openModal } from "jenesius-vue-modal";

import InsightDialog from "@/components/modals/InsightDialog.vue";
import FactDialog from "@/components/modals/FactDialog.vue";
import ConclusionDialog from "@/components/modals/ConclusionDialog.vue";

async function open(component, cb) {
  const modal = await openModal(component);
  modal.on('return', (value: Card) => {
    modal.close();
    cb(value);
  });
}

function handleLinkCreated(link: Link) {
  store.addLink(link.source, link.target);
}

export const CreateCardBehavior = (graph: Graph, onAddCard: (source: Card, target: Card) => void): BehaviorOption => {
  return {
    getEvents() {
      return {
        "node:mouseenter": "onEnterNode",
        "node:mouseleave": "onLeaveNode",
        "node:click": "onClickNode"
      };
    },

    onEnterNode(ev: IG6GraphEvent) {
      const nodeItem = ev.item;
      graph.setItemState(nodeItem, 'hover', true);
    },

    onLeaveNode(ev: IG6GraphEvent) {
      const nodeItem = ev.item;
      graph.setItemState(nodeItem, 'hover', false);
    },

    onClickNode(ev: IG6GraphEvent) {
      const plusBtn = !!ev.propagationPath.find((it) => it.get("id") === "plusBtn" );
      if (!plusBtn) {
        return;
      }
      const model = ev.item?.getModel() as ReatomicModel;


      switch(model.type) {
        case "data-source":
          open(FactDialog, onAddCard.bind(null, model));
          return;

        case "fact":
          open(InsightDialog, onAddCard.bind(null, model));
          return;

        case "insight":
          open(ConclusionDialog, onAddCard.bind(null, model));
          return;
      }
    }
  };
};
