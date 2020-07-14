<template src="./DataSourceDialog.html"></template>
<style src="./DataSourceDialog.css" scoped></style>
<script lang="ts">

import { Vue, Component } from "vue-property-decorator";
import XDialog from "@/commons/components/x-dialog/XDialog.vue";

@Component({
    components: {
        XDialog,
    }
})
export default class DataSourceDialog extends Vue {

}
</script>