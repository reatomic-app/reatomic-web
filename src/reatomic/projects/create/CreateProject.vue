<template src="./CreateProject.html"></template>
<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        "create-dialog": XDialog,
    }
})
export default class CreateProject extends Vue {

    public handleOpenDialog() {
        this.$modal.show("create-project-dialog");
    }

    public handleCreate() {
        console.log("create on Create Project!");
    }

    public handleCancel() {
        console.log("cancel on Create Project!");
    }
}
</script>