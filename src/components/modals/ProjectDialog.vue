<script lang="ts" setup>
 import XDialog from "@/components/XDialog.vue";

 const emit = defineEmits(["return"]);

 const input = {
   name: "",
   description: ""
 }

 function handleSubmitClick() {
   emit("return", input);
 }
 
</script>

<template src="./ProjectDialog.html"></template>
<style src="./ProjectDialog.css" scoped></style>
