<template src="./Dashboard.html"></template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import XSmallbox from "@/commons/components/x-smallbox/XSmallbox.vue";
import XTable from "@/commons/components/x-table/XTable.vue";

@Component({
    components: {
        XSmallbox,
        XTable,
    }
})
export default class Dashboard extends Vue {}
</script>