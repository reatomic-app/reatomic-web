import type { BehaviorOption, IG6GraphEvent } from '@antv/g6/lib';

export const UpdateNodePosition = (): BehaviorOption => {
  return {
    getEvents() {
      return {
        "node:dragend": "dragend",
      };
    },
    // The responsing function for node:click defined in getEvents
    dragend(ev: IG6GraphEvent) {
      console.log("node position changed!: ", ev);
    },
  }
};
