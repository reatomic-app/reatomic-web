<script lang="ts" setup>
 import { openModal } from "jenesius-vue-modal";
 import router from "@/router";
 import type { Project } from "@/domain";
 import { projectStore } from "@/stores/project";
 import ProjectDialog from "@/components/modals/ProjectDialog.vue";

 const store = projectStore();
 const projectList = store.projectList;

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

<template src="./HomeView.html"></template>
<style scoped src="./HomeView.css"></style>
