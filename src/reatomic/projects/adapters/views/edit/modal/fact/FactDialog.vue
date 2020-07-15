<template src="./FactDialog.html"></template>
<style src="./FactDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class FactDialog extends Vue {
    public input = {
        description: "",
        url: "",
        selectedType: [] as string[],
    }

    public handleSelectedType(evt: MouseEvent) {
        const input = evt.target as HTMLInputElement;
        const value = input.value;

        this.input.selectedType = input.checked ? [value] : [];
    }

    @Emit("onSubmit")
    public handleSubmitClick() {
        const toReturn = {
          type: this.input.selectedType.find((val: string) => val !== undefined),
            description: this.input.description,
            url: this.input.url,
        }
        this.input = {
          selectedType: [],
          description: "",
          url: ""
        };
        return toReturn;
    }
}
</script>
