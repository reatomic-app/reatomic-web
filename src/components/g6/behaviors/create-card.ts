import type { Component } from "vue";
import type { BehaviorOption, IG6GraphEvent, Item, IEdge, Graph } from '@antv/g6/lib';
import { openModal } from "jenesius-vue-modal";
import type { Card, Link } from "@/domain";

import InsightDialog from "@/components/modals/InsightDialog.vue";
import FactDialog from "@/components/modals/FactDialog.vue";
import ConclusionDialog from "@/components/modals/ConclusionDialog.vue";

import type { ReatomicModel } from "../nodes/base";

async function open(component: Component, cb: Function) {
  const modal = await openModal(component);
  modal.on('return', (value: Card) => {
    modal.close();
    cb(value);
  });
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
      if (nodeItem) {
        graph.setItemState(nodeItem, 'hover', true);
      }
    },

    onLeaveNode(ev: IG6GraphEvent) {
      const nodeItem = ev.item;
      if (nodeItem) {
        graph.setItemState(nodeItem, 'hover', false);
      }
    },

    onClickNode(ev: IG6GraphEvent) {
      const plusBtn = !!ev.propagationPath.find((it) => it.get("id") === "plusBtn" );
      if (!plusBtn) {
        return;
      }
      const model: Card = ev.item?.getModel() as any;

      switch(model.cardType) {
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
