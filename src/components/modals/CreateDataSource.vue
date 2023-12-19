<script lang="ts" setup>
 import XDialog from "../XDialog.vue";
 import type { DataSourceInput } from "../../domain";

 const emit = defineEmits(["return"]);

 const input: DataSourceInput = {
   type: "",
   description: "",
   date: new Date(),
   url: "",
 };

 function handleCreate() {
   emit("return", input);
 }
</script>

<template src="./CreateDataSource.html"></template>
<style scoped src="./CreateDataSource.css"></style>
