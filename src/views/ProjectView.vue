<script lang="ts" setup>
 import { watch } from "vue";
 import { projectStore } from "../stores/project";
 import type { Card, DataSource } from "../domain";
 import { openModal } from "jenesius-vue-modal";

 import CreateDataSource from "../components/modals/CreateDataSource.vue";
 import InsightDialog from "../components/modals/InsightDialog.vue";
 import FactDialog from "../components/modals/FactDialog.vue";
 import ConclusionDialog from "../components/modals/ConclusionDialog.vue";

 import G6Graph from "../components/g6/G6Graph.vue";

 const props = defineProps({
   id: String
 });

 const store = projectStore();

 store.fetchProjectDetail(props.id);
 watch(() => props.id, (id) => {
   store.fetchProjectDetail(props.id);
 });

 const current = store.current;

 async function open(component) {
   const modal = await openModal(component);
   modal.on('return', (value: Card) => {
     modal.close();
     store.addCard(value);
   });
 }

 function showDatasource() {
   open(CreateDataSource);
 }
 
 function showConclusion() {
   open(ConclusionDialog);
 }

 function showFact() {
   open(FactDialog);
 }

 function showInsight() {
   open(InsightDialog);
 }

 function handleLinkCreated(link: Link) {
   store.addLink(link.source, link.target);
 }
</script>

<template src="./ProjectView.html"></template>
<style scoped src="./ProjectView.css"/> 
