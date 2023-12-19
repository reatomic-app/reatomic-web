<script lang="ts" setup>
 import EasyMDE from "easymde";
 import { marked } from "marked";
 import { ref, onMounted } from "vue";

 const props = defineProps({
   data: String
 });

 const areaRef = ref(null);

 function parseData() {
   if (props.data) {
     return marked.parse(props.data);
   } else {
     return "Error";
   }
 }

 const htmlContent = "<h2>KKFUTI</h2>";

 onMounted(() => {
   console.log(areaRef.value);

   if (areaRef.value) {
     new EasyMDE({
       element: areaRef.value,
       status: false,
     });  
   }
 });
</script>

<template>
  
  <textarea ref="areaRef" :value="data"></textarea>
  <div v-html="parseData()"></div>
  
</template>

<style>
 
</style>
