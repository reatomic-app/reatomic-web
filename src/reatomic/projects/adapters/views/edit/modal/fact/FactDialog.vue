<template src="./FactDialog.html"></template>
<style src="./FactDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class FactDialog extends Vue {

}
</script>