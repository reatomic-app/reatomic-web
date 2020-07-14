<template src="./ConclusionDialog.html"></template>
<style src="./ConclusionDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class ConclusionDialog extends Vue {

}
</script>