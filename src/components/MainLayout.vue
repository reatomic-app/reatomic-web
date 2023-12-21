<script lang="ts" setup>
 import type { Project } from "@/domain";
 import { watch, computed, onMounted } from "vue";
 import { projectStore } from "../stores/project";
 import PlusIcon from "./icons/plus-icon.vue";
 import OverviewIcon from "./icons/overview-icon.vue";
 import { openModal } from "jenesius-vue-modal";
 import ProjectDialog from "../components/modals/ProjectDialog.vue";
 import router from "../router";

 const store = projectStore();
 onMounted(() => {
   store.fetchProjectList();
 });
 
 const current = store.current;
 const projectList = store.projectList;

 const datasources = computed(() => {
   return store.datasources;
 });

 async function showProject() {
   const modal = await openModal(ProjectDialog);
   modal.on('return', async (value: Project) => {
     modal.close();
     const result = await store.createProject(value);
     if (result) {
       router.push(`/project/${result.id}`);
     }
   });
 }
</script>

<template src="./MainLayout.html"></template>
<style scoped src="./MainLayout.css"></style>
