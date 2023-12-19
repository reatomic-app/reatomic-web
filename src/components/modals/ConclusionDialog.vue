<template src="./ConclusionDialog.html"></template>
<style src="./ConclusionDialog.css" scoped></style>

<script lang="ts" setup>
 import XDialog from "../XDialog.vue";

 const emit = defineEmits(["return"]);

 const input = {
   description: "",
   url: "",
 }

 function handleSubmitClick() {
   emit("return", input);
 }
 
</script>
