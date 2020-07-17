<template src="./edit/EditProject.html"></template>
<style src="./edit/EditProject.css"></style>
<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import ContextMenu from "./edit/context-menu/ContextMenu.vue";
import DataSourceDialog from "./edit/modal/datasource/DataSourceDialog.vue";
import ConclusionDialog from "./edit/modal/conclusion/ConclusionDialog.vue";
import FactDialog from "./edit/modal/fact/FactDialog.vue";
import InsightDialog from "./edit/modal/insight/InsightDialog.vue";
import { FactInput, DataSourceInput, InsightInput, ConclusionInput } from '../../domain';
import projectManagerStore from "@/reatomic/projects/application/services/ProjectManagerStore";
import G6Graph from "@/commons/components/g6/G6Graph.vue";

@Component({
  components: {
    ContextMenu,
    DataSourceDialog,
    ConclusionDialog,
    InsightDialog,
    FactDialog,
    G6Graph,
  }
})
export default class EditProject extends Vue {

    @Prop(String)
    public id!: string;

    public get cards() {
      return projectManagerStore.graphData.cards;
    }

    public handleDataSource() {
      this.$modal.show("create-datasource-dialog");
    }

    public handleDataSourceSubmit(input: DataSourceInput) {
      projectManagerStore.addDataSource(input);
    }

    public handleFact() {
      this.$modal.show("create-fact-dialog");
    }

    public handleFactSubmit(input: FactInput) {
      projectManagerStore.addFact(input);
    }

    public handleInsight() {
      this.$modal.show("create-insight-dialog");
    }

    public handleInsightSubmit(input: InsightInput) {
      projectManagerStore.addInsight(input);
    }

    public handleConclusion() {
      this.$modal.show("create-conclusion-dialog");
    }

    public handleConclusionSubmit(input: ConclusionInput) {
      projectManagerStore.addConclusion(input);
    }
}
</script>
