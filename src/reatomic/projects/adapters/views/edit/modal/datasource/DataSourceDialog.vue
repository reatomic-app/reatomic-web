<template src="./DataSourceDialog.html"></template>
<style src="./DataSourceDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";
import { DataSourceInput } from '../../../../../domain';

@Component({
    components: {
        XDialog,
    }
})
export default class DataSourceDialog extends Vue {
    public input: DataSourceInput = DataSourceDialog.reset();

    @Emit("onSubmit")
    public handleSubmitClick() {
      const toReturn = {...this.input}
      this.input = DataSourceDialog.reset();
      return toReturn;
    }

    public static reset(): DataSourceInput {
      return {
        type: "",
        description: "",
        date: new Date(),
        url: "",
      }
    }
}
</script>
