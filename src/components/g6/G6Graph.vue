<script setup lang="ts">
 import { ref, watch, onMounted } from "vue";
 import { openModal } from "jenesius-vue-modal";
 import G6, { Graph } from "@antv/g6";
 import type { GraphData } from '@antv/g6/lib';
 
 import type { Card, Link } from '@/domain';

 import { AddEdgeByClickBehavior, UpdateNodePosition, CreateCardBehavior } from "./behaviors";
 import { ConclusionNode, DataSourceNode, FactNode, InsightNode } from "./nodes";
 import { convertToData } from "./graph";

 import CreateDataSource from "@/components/modals/CreateDataSource.vue";

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
           let options = "";
           if (evt?.target && evt.target.isCanvas && evt.target.isCanvas()) {
             options = `
               <li data-event='create-datasource'>Create Experiment</li>`;
           } else if (evt?.item) {
             options = `
               <li data-event='delete-card'>Delete</li>`;
           }
           return `
             <ul class="context-menu">
               ${options}
             </ul>`;
         },
         handleMenuClick: (target: HTMLElement, item) => {
           const event = target.dataset['event'];
           const model: Card = item?.getModel() as any;
           handleContextMenu(event, model);
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
             // "update-node-position",
             "create-card"
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

       registerBehaviors();

       const data = convertToData(props.cards || [], props.links || []);
       graph.data(data);
       graph.setMode("default");
       graph.render();
       graph.fitView([50, 50, 50, 50]);
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
   G6.registerBehavior('create-card', CreateCardBehavior(graph, (source: Card, target: Card) => {
     emit("onCardCreated", source, target);
   }));
 }

 function registerNodes() {
   G6.registerNode("data-source", DataSourceNode(), "single-node");
   G6.registerNode("fact", FactNode(), "single-node");
   G6.registerNode("insight", InsightNode(), "single-node");
   G6.registerNode("conclusion", ConclusionNode(), "single-node");
 }

 function onCardsChanged(val: Card[]) {
   if (props.links) {
     const data = convertToData(val, props.links);
     refreshData(data);
   }
 }

 function onLinksChanged(val: Link[]) {
   if (props.cards) {
     const data = convertToData(props.cards, val);
     refreshData(data);
   }
 }

 function refreshData(data: GraphData) {
   const zoom = graph.getZoom();
   const pos = graph.getPointByCanvas(0, 0);
   graph.changeData(data);
 }

 async function handleContextMenu(event: String | undefined, target: Card) {
   if (event === "create-datasource") {
     const modal = await openModal(CreateDataSource);
     modal.on('return', (value: Card) => {
       modal.close();
       emit("onCardCreated", null, value);
     });
   }
 }

</script>

<template src="./G6Graph.html"></template>
<style src="./G6Graph.css"></style>
