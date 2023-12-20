<template src="./G6Graph.html"></template>

<style scoped>
 .graph, canvas {
   width: 100%;
   height: 100%;
 }

</style>

<script setup lang="ts">
 import { ref, watch, onMounted } from "vue";
 import type { Card, Link } from '../../domain';

 import G6, { Graph } from "@antv/g6";
 import type { GraphData } from '@antv/g6/lib';

 import { AddEdgeByClickBehavior, UpdateNodePosition } from "./behaviors";
 import { ConclusionNode, DataSourceNode, FactNode, InsightNode } from "./nodes";
 import { convertToData } from "./graph";

 const emit = defineEmits([
   "onLinkCreated",
   "onLinkRemoved",
   "onCardCreated",
   "onCardDeleted"
 ]);

 const props = defineProps<{
   cards?: Card[],
   links?: Link[]
 }>();

 const graphContainer = ref<HTMLElement | null>(null);

 let graph: Graph;

 if (props.cards) {
   watch(props.cards, onCardsChanged);
 }

 if (props.links) {
   watch(props.links, onLinksChanged);
 }

 onMounted(() => {
   try {
     if (graphContainer.value) {
       registerNodes();

       const contextMenu = new G6.Menu({
         getContent(evt) {
           let header;
           if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
             header = 'Canvas ContextMenu';
           } else if (evt.item) {
             const itemType = evt.item.getType();
             header = `${itemType.toUpperCase()} ContextMenu`;
           }
           return `
    <h3>${header}</h3>
    <ul>
      <li title='1'>li 1</li>
      <li title='2'>li 2</li>
      <li>li 3</li>
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
         },
         handleMenuClick: (target, item) => {
           console.log(target, item);
         },
         offsetX: 16 + 10,
         offsetY: 0,
         itemTypes: ['node', 'edge', 'canvas'],
       });

       graph = new Graph({
         container: graphContainer.value || "",
         //width: graphContainer.value?.offsetWidth || 0,
         //height: graphContainer.value?.offsetHeight || 0,
         plugins: [contextMenu],
         modes: {
           default: [
             "drag-canvas",
             //"drag-node",
             "zoom-canvas",
             "click-add-edge",
             // "update-node-position"
           ],
           addEdge: [
             //'click-add-edge',
             'click-select'
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
             stroke: "black",
           },
         },
       });

       graph.on('node:mouseenter', (e) => {
         const nodeItem = e.item;
         graph.setItemState(nodeItem, 'hover', true);
       });

       graph.on('node:mouseleave', (e) => {
         const nodeItem = e.item;
         graph.setItemState(nodeItem, 'hover', false);
       });

       graph.on('node:click', (e) => {
         const plusBtn = !!e.propagationPath.find((it) => it.get("id") === "plusBtn" );
         console.log("CLICK BUTTON", plusBtn);
       });

       registerBehaviors();

       const data = convertToData(props.cards || [], props.links || []);
       graph.data(data);
       graph.setMode("default");
       graph.render();
       graph.fitView([50, 50, 50, 50]);
       //graph.moveTo(30,100);
     }
   } catch(err) {
     console.error(err);
   }
 });

 function registerBehaviors() {
   G6.registerBehavior('click-add-edge', AddEdgeByClickBehavior(graph, (link) => {
     emit("onLinkCreated", link);
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
   const data = convertToData(val, props.links);
   refreshData(data);
 }

 // @Watch("links")
 function onLinksChanged(val: Link[]) {
   const data = convertToData(props.cards, val);
   refreshData(data);
 }

 function refreshData(data: GraphData) {
   const zoom = graph.getZoom();
   const pos = graph.getPointByCanvas(0, 0);
   graph.changeData(data);
   //graph.refresh();
   //graph.render();
   //graph.zoom(zoom);
   //graph.moveTo(-pos.x, -pos.y);
 }


</script>
