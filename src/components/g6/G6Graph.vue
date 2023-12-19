<template src="./G6Graph.html"></template>

<style scoped>
 .graph,canvas {
   width: 100%;
   height: 100%;
 }
 
</style>

<script setup lang="ts">
 import { ref, onMounted } from "vue";
 import type { Card, Link } from '../../domain';
 
 import G6, { Graph } from "@antv/g6";
 import type { GraphData } from '@antv/g6/lib';
 
 import { AddEdgeByClickBehavior, UpdateNodePosition } from "./behaviors";
 import { ConclusionNode, DataSourceNode, FactNode, InsightNode } from "./nodes";
 import { convertToData } from "./graph";

 //import projectManagerStore from "@/reatomic/projects/application/services/ProjectManagerStore";

 const props = defineProps<{
   cards?: Card[],
   links?: Link[]
 }>();

 const graphContainer = ref<HTMLElement | null>(null);

 let graph: Graph;

 onMounted(() => {
   try {
     if (graphContainer.value) {
       registerNodes();

       graph = new Graph({
         container: graphContainer.value || "",
         //width: graphContainer.value?.offsetWidth || 0,
         //height: graphContainer.value?.offsetHeight || 0,
         modes: {
           default: [
             "drag-canvas",
             //"drag-node",
             "zoom-canvas",
             "click-add-edge",
             "update-node-position"
           ],
           addEdge: [
             'click-add-edge', 'click-select'
           ]
         },
         defaultNode: {
           type: 'card',
           size: [200, 260],
         },
         defaultEdge: {
           type: "line",
           style: {
             lineWidth: 2,
             stroke: "#ABA4B2",
           },
         },
       });

       registerBehaviors();

       const data = convertToData(props.cards || [], props.links || []);
       
       graph.data(data);
       graph.setMode("default");
       graph.render();
       //graph.moveTo(30,100);
     }
   } catch(err) {
     console.error(err);
   }
 });

 function registerBehaviors() {
   G6.registerBehavior('click-add-edge', AddEdgeByClickBehavior(graph, (link) => {
     console.log(link);
   }));
   G6.registerBehavior('update-node-position', UpdateNodePosition());
 }

 function registerNodes() {
   G6.registerNode("data-source", DataSourceNode(), "single-node");
   G6.registerNode("fact", FactNode(), "single-node");
   G6.registerNode("insight", InsightNode(), "single-node");
   G6.registerNode("conclusion", ConclusionNode(), "single-node");
 }

 ///@Watch("cards")
 function onCardsChanged(val: Card[]) {
   if (props.links) {
     const data = convertToData(val, props.links);
     refreshData(data);
   }
 }

 // @Watch("links")
 function onLinksChanged(val: Link[]) {
   if (props.cards) {
     const data = convertToData(props.cards, val);
     refreshData(data);
   }
 }

 function refreshData(data: GraphData) {
   const zoom = graph.getZoom()
   graph.data(data);
   graph.refresh();
   graph.render();
   // graph.moveTo(30,100);
   // graph.zoom(zoom);
 }
 
 
</script>
