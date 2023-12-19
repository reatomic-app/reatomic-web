<script setup lang="ts">
 import type { Card } from "../domain";
 import { openModal } from "jenesius-vue-modal";
 import CreateDataSource from "../components/modals/CreateDataSource.vue";

 import ProjectDialog from "../components/modals/ProjectDialog.vue";
 import InsightDialog from "../components/modals/InsightDialog.vue";
 import FactDialog from "../components/modals/FactDialog.vue";
 import ConclusionDialog from "../components/modals/ConclusionDialog.vue";
 import MarkdownArea from "../components/MarkdownArea.vue";

 import G6Graph from "../components/g6/G6Graph.vue";

 const documentText = `
# Titulo 1
## Titulo 2
### Titulo 3

- Uno
- Dos
- Tres

1. Uno
2. Dos
3. Tres
 `;

 const cards: Card[] = [
   {
     id: "id1",
     type: "data-source",
     dataSourceType: "Interview",
     date: new Date(),
     description: "datasource",
   },
   {
     id: "id2",
     type: "fact",
     description: "fact",
     factType: "good"
   },
   {
     id: "id3",
     type: "insight",
     description: "insight",
   },
   {
     id: "id4",
     type: "conclusion",
     description: "conclusion",
   }
 ];

 async function showProject() {
   const modal = await openModal(ProjectDialog);
   modal.on('return', (value) => {
     modal.close();
   });
 }
 async function showDatasource() {
   const modal = await openModal(CreateDataSource);
   modal.on('return', (value) => {
     modal.close();
   });
 }
 async function showConclusion() {
   const modal = await openModal(ConclusionDialog);
   modal.on('return', (value) => {
     modal.close();
   });
 }
 async function showFact() {
   const modal = await openModal(FactDialog);
   modal.on('return', (value) => {
     modal.close();
   });
 }
 async function showInsight() {
   const modal = await openModal(InsightDialog);
   modal.on('return', (value) => {
     modal.close();
   });
 }
 
</script>

<template src="./TestView.html"></template>

<style scoped>
 .home {
   height: 100vh;
 }
</style>
