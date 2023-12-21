<script lang="ts" setup>
 import type { Component } from "vue";
 import type { Card, DataSource, Link } from "@/domain";

 import { watch } from "vue";
 import { openModal } from "jenesius-vue-modal";

 import { projectStore } from "@/stores/project";
 
 import CreateDataSource from "@/components/modals/CreateDataSource.vue";
 import InsightDialog from "@/components/modals/InsightDialog.vue";
 import FactDialog from "@/components/modals/FactDialog.vue";
 import ConclusionDialog from "@/components/modals/ConclusionDialog.vue";
 import G6Graph from "@/components/g6/G6Graph.vue";

 const props = defineProps({
   id: String
 });

 const store = projectStore();

 if (props.id) {
   store.fetchProjectDetail(props.id);
 }
 watch(() => props.id, (id) => {
   if (props.id) {
     store.fetchProjectDetail(props.id);
   }
 });

 const current = store.current;

 async function open(component: Component) {
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
   if (link.source && link.target) {
     store.addLink(link.source, link.target);
   }
 }

 async function handleCardCreated(source: Card | null, target: Card) {
   const newCard = await store.addCard(target);
   if (source && source.id && newCard && newCard.id) {
     store.addLink(source.id, newCard.id);
   }
 }

</script>

<template src="./ProjectView.html"></template>
<style scoped src="./ProjectView.css"/> 
