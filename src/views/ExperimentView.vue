<script lang="ts" setup>
 import { watch, ref, computed, onMounted } from "vue";
 import MarkdownArea from "@/components/MarkdownArea.vue";
 import { projectStore } from "../stores/project";

 const store = projectStore();

 const props = defineProps({
   id: String,
   experimentId: String
 });

 const edit = ref(false);
 const data = ref("");

 const documentText = computed({
   get() {
     return data.value;
   },
   set(value) {
     data.value = value;
   }
 });

 watch(
   () => props.experimentId && store.cardData[props.experimentId]?.data,
   (data) => {
     if (data) {
       documentText.value = data
     }
   }
 );


 onMounted(() => {
   if (props.id && store.current.state === 'empty') {
     store.fetchProjectDetail(props.id);
   }
 });

 if (props.id && props.experimentId) {
   store.fetchCardData(props.id, props.experimentId);
 }

 watch(() => props.experimentId, (id) => {
   if (props.id && props.experimentId) {
     store.fetchCardData(props.id, props.experimentId);
   }
 });

 function startEdit() {
   edit.value = true;
 }

 function saveDocument() {
   edit.value = false;
   if (props.id && props.experimentId && data.value) {
     store.updateCardData(props.id, props.experimentId, data.value);
   }
 }
</script>

<template src="./ExperimentView.html">
</template>

<style scoped src="./ExperimentView.css"></style>
