<template src="./edit/EditProject.html"></template>
<style src="./edit/EditProject.css"></style>
<script lang="ts">

import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import G6, { Graph } from "@antv/g6";
import { CardNode } from "@/commons/components/g6/custom-nodes";
import ContextMenu from "./edit/context-menu/ContextMenu.vue";
import DataSourceDialog from "./edit/modal/datasource/DataSourceDialog.vue";
import ConclusionDialog from "./edit/modal/conclusion/ConclusionDialog.vue";
import FactDialog from "./edit/modal/fact/FactDialog.vue";
import InsightDialog from "./edit/modal/insight/InsightDialog.vue";

const data = {
  // The array of nodes
  nodes: [
    {
      id: 'node1',
      x: 0,
      y: 0,
      type: "card",
      cardType: "experiment",
      experimentType: "interview",
      createdAt: "20/10/2020",
    },
    {
      id: 'node2',
      x: 0,
      y: 150,
      type: "card",
      cardType: "fact",
      factType: "QUOTE",
    },  
    {
      id: 'node3',
      x: 150,
      y: 150,
      type: "card",
      cardType: "fact",
      factType: "SAD",
    },     
    {
      id: 'node4',
      x: 0,
      y: 300,
      type: "card",      
      cardType: "insight",
      insightType: "medium",
    },      
    {
      id: 'node5',
      x: 150,
      y: 300,
      type: "card",      
      cardType: "insight",
      insightType: "high",
    },          
    {
      id: 'node6',
      x: 300,
      y: 300,
      type: "card",      
      cardType: "insight",
      insightType: "low",
    },      
    {
      id: 'node7',
      x: 0,
      y: 450,
      type: "card",
      cardType: "conclusion",
    },                  
  ],
  // The array of edges
  edges: [
      
  ],
};

@Component({
  components: {
    ContextMenu,
    DataSourceDialog,
    ConclusionDialog,
    InsightDialog,
    FactDialog,
  }
})
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
                modes: {
                  default: [
                   "drag-canvas", "zoom-canvas"
                  ],
                },
                defaultNode: {
                    type: 'card',
                    size: [200, 260],
                },

            });

            this.projectGraph.data(data);            
            this.projectGraph.render();
            //this.projectGraph.zoom(0.9, undefined);
            this.projectGraph.fitView();
            this.projectGraph.moveTo(0,0);
        }
    }

    public handleDataSource() {
      this.$modal.show("create-datasource-dialog");
    }

    public handleFact() {
      this.$modal.show("create-fact-dialog");
    }

    public handleInsight() {
      this.$modal.show("create-insight-dialog");            
    }

    public handleConclusion() {
      this.$modal.show("create-conclusion-dialog");                  
    }
}
</script>