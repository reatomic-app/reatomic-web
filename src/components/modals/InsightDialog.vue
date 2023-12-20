<template src="./InsightDialog.html"></template>
<style src="./InsightDialog.css" scoped></style>

<script lang="ts" setup>
 import XDialog from "../XDialog.vue";

 const emit = defineEmits(["return"]);

 const input = {
   description: "",
   url: "",
 }

 function handleSubmitClick() {
   const card = {
     cardType: "insight",
     description: input.description,
     url: input.url
   }
   emit("return", card);
 }
</script>
