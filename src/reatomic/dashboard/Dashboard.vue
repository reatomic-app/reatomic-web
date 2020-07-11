<template src="./Dashboard.html"></template>
<style src="./Dashboard.css"></style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateProject from "@/reatomic/projects/create/CreateProject.vue";

@Component({
    components: {
        CreateProject,
    }
})
export default class Dashboard extends Vue {


    public handleOpenCreateDialog() {
        this.$modal.show("create-project");
    }
}
</script>