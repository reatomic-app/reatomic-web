<template src="./DataSourceDialog.html"></template>
<style src="./DataSourceDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class DataSourceDialog extends Vue {
    public input = {
        type: "",
        description: "",
        date: new Date(),
        url: "",
    };

    @Emit("onSubmit")
    public handleSubmitClick() {
        const toReturn = {...this.input,}
        this.input = {
          type: "",
          date: new Date(),
          description: "",
          url: ""
        };
        return toReturn;
    }
}
</script>
