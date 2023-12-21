<script lang="ts" setup>
 import { watch, ref, computed, onMounted } from "vue";
 import { openModal } from "jenesius-vue-modal";

 import type { Card } from "@/domain";
 import { projectStore } from "@/stores/project";
 import MarkdownArea from "@/components/MarkdownArea.vue";
 import PlusIcon from "@/components/icons/plus-icon.vue";
 import FactDialog from "@/components/modals/FactDialog.vue";

 const elRef = ref<HTMLElement | null>(null);
 const store = projectStore();

 const selectedText = ref("");

 const props = defineProps({
   id: String,
   experimentId: String
 });

 const edit = ref(false);
 const data = ref("");

 const currentData = props.experimentId && store.cardData[props.experimentId]?.data
 if(currentData) {
   data.value = currentData;
 }

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
   (value) => {
     if (value) {
       data.value = value;
     }
   }
 );

 onMounted(() => {
   if (props.id && store.current.state === 'empty') {
     store.fetchProjectDetail(props.id);
   }
 });

 watch(() => props.experimentId, (id) => {
   if (props.id && props.experimentId) {
     store.fetchCardData(props.id, props.experimentId);
   }
 }, {immediate: true});

 function startEdit() {
   edit.value = true;
 }

 function saveDocument() {
   edit.value = false;
   if (props.id && props.experimentId && data.value) {
     store.updateCardData(props.id, props.experimentId, data.value);
   }
 }

 async function createFact() {
   const modal = await openModal(FactDialog, {data: selectedText.value});
   modal.on('return', async (value: Card) => {
     console.log(value);
     modal.close();

     const newCard = await store.addCard(value);
     if (props.experimentId && newCard && newCard.id) {
       store.addLink(props.experimentId, newCard.id);
     }
   });
 }

 function handleMouseUp() {
   const selection = window.getSelection();

   if (!edit.value && selection && selection.toString() !== "") {
     const range = selection.getRangeAt(0).cloneRange(); //get the text range
     range.collapse(false);
     const bcr = range.getBoundingClientRect();

     if (elRef.value) {
       elRef.value.style.setProperty('--left', bcr.left + bcr.width + "px");
       elRef.value.style.setProperty('--top', bcr.top + bcr.height + "px");
       elRef.value.style.setProperty("--display-button", "block");
     }

     selectedText.value = selection.toString();
   } else {
     if (elRef.value) {
       elRef.value.style.setProperty("--display-button", "none");
     }
     selectedText.value = "";
   }
 }
</script>

<template src="./ExperimentView.html">
</template>

<style scoped src="./ExperimentView.css"></style>
