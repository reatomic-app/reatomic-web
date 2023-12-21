<script lang="ts" setup>
 import XDialog from "../XDialog.vue";
 import type { DataSourceInput } from "../../domain";
 import type { Card } from "@/domain";

 const emit = defineEmits(["return"]);

 const input: DataSourceInput = {
   type: "",
   description: "",
   date: new Date(),
   url: "",
   title: ""
 };

 function handleCreate() {
   const card: Card = {
     cardType: "data-source",
     title: input.title,
     description: input.description,
     date: input.date,
     url: input.url
   };
   emit("return", card);
 }
</script>

<template src="./CreateDataSource.html"></template>
<style scoped src="./CreateDataSource.css"></style>
