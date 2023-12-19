<script lang="ts" setup>
 const emit = defineEmits(["onCreate", "onCancel"]);

 const props = defineProps({
   name: String,
   title: String,
   cancelCaption: String,
   acceptCaption: String,
   width: Number,
   height: Number
 });

 function handleClickCreate() {
   emit("onCreate");
 }
 
 function handleClickCancel() {
   emit("onCancel", false);
 }
 
 function handleClickClose() {
   emit("onCancel", false);
 }
</script>

<template src="./XDialog.html"></template>
<style src="./XDialog.css" scoped></style>
