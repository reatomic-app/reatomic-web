<template src="./edit/EditProject.html"></template>
<style src="./edit/EditProject.css"></style>
<script lang="ts">

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import G6, { Graph } from "@antv/g6";
import { CardNode } from "@/commons/components/g6/custom-nodes";

const data = {
  // The array of nodes
  nodes: [
    {
      id: 'node1',
      x: 0,
      y: 100,
      type: "card",
      cardType: "experiment",
      experimentType: "interview",
      createdAt: "20/10/2020",
    },
    {
      id: 'node2',
      x: 0,
      y: 200,
      type: "card",
      cardType: "fact",
      factType: "QUOTE",
    },  
    {
      id: 'node3',
      x: 0,
      y: 400,
      type: "card",
      cardType: "fact",
      factType: "SAD",
    },     
    {
      id: 'node4',
      x: 0,
      y: 600,
      type: "card",      
      cardType: "insight",
      insightType: "medium",
    },      
    {
      id: 'node5',
      x: 0,
      y: 700,
      type: "card",      
      cardType: "insight",
      insightType: "high",
    },          
    {
      id: 'node6',
      x: 0,
      y: 800,
      type: "card",      
      cardType: "insight",
      insightType: "low",
    },      
    {
      id: 'node7',
      x: 0,
      y: 900,
      type: "card",
      cardType: "conclusion",
    },                  
  ],
  // The array of edges
  edges: [
      
  ],
};

@Component
export default class EditProject extends Vue {

    @Prop(String)
    public id!: string;

    @Ref("graph")
    public projectGraphElement!: HTMLElement;

    public projectGraph!: Graph;

    public mounted() {
        if (this.projectGraphElement) {
            G6.registerNode('card', CardNode, 'single-node');

            this.projectGraph = new Graph({
                container: this.projectGraphElement,
                width: this.projectGraphElement.offsetWidth,
                height: this.projectGraphElement.offsetHeight,                

                defaultNode: {
                    type: 'card',
                    size: [120, 40],
                },
                layout: {
                    type: 'dagre',
                    direction: 'TB',
                },
            });

            this.projectGraph.data(data);
            this.projectGraph.render();
            this.projectGraph.fitCenter();
        }
    }
}
</script>