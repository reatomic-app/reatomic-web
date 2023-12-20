<script lang="ts" setup>
 // import { Vue, Component } from 'vue-property-decorator';
 // import XSidebar from "@/commons/components/x-sidebar/XSidebar.vue";
 // import XSidebarSwitch from "@/commons/components/x-sidebar/XSidebarSwitch.vue";
 import { watch, computed } from "vue";
 import { projectStore } from "../stores/project";
 import PlusIcon from "./icons/plus-icon.vue";
 import OverviewIcon from "./icons/overview-icon.vue";

 const store = projectStore();
 const current = store.current;
 const datasources = computed(() => {
   console.log(store.datasources);
   return store.datasources;
 });

 //const datasources = store.current?.data?.cards?.filter( (c) => c.cardType === "data-source");
 //console.log(store.current?.data?.cards, datasources);

</script>

<template src="./MainLayout.html"></template>
<style scoped src="./MainLayout.css"></style>
