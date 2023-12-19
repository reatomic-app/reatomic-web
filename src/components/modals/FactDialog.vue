<template src="./FactDialog.html"></template>
<style src="./FactDialog.css" scoped></style>

<script lang="ts" setup>
 import XDialog from "../XDialog.vue";

 const emit = defineEmits(["return"]);

 const input = {
   description: "",
   url: "",
   selectedType: [] as string[],
 }

 function handleSelectedType(evt: MouseEvent) {
   const target = evt.target as HTMLInputElement;
   const value = target.value;
   input.selectedType = target.checked ? [value] : [];
 }

 function handleSubmitClick() {
   const toReturn = {
     type: input.selectedType.find((val: string) => val !== undefined),
     description: input.description,
     url: input.url,
   }
   emit("return", toReturn);
 }
</script>
