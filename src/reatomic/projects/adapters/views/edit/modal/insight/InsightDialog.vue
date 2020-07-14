<template src="./InsightDialog.html"></template>
<style src="./InsightDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class InsightDialog extends Vue {

}
</script>