<script lang="ts" setup>
 import { projectStore } from "../stores/project";

 const props = defineProps({
   id: String
 });

 const store = projectStore();

 if (props.id) {
   store.fetchProjectDetail(props.id);
 }

 const current = store.current;
</script>

<template src="./ProjectView.html"></template>
