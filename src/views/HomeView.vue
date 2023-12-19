<script lang="ts" setup>
 import { projectStore } from "../stores/project";

 const store = projectStore();
 const projectList = store.projectList;

 store.fetchProjectList();
 
</script>

<template src="./HomeView.html"></template>



