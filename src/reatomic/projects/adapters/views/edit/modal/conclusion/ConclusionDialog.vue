<template src="./ConclusionDialog.html"></template>
<style src="./ConclusionDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class ConclusionDialog extends Vue {
    public input = {
        description: "",
        url: "",
    }

    @Emit("onSubmit")
    public handleSubmitClick() {
        return this.input;
    }
}
</script>