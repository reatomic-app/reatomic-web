<script lang="ts" setup>
 import XDialog from "@/components/XDialog.vue";

 const emit = defineEmits(["return"]);

 const input = {
   description: "",
   url: "",
 }

 function handleSubmitClick() {
   const card = {
     cardType: "conclusion",
     description: input.description,
     url: input.url
   }
   emit("return", card);
 }
 
</script>

<template src="./ConclusionDialog.html"></template>
<style src="./ConclusionDialog.css" scoped></style>
