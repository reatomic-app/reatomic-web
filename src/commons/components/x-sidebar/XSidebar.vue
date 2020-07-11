<template src="./XSidebar.html"></template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import XSidebarEntry from "@/commons/components/x-sidebar/XSidebarEntry.vue";

@Component({
    components: {
        XSidebarEntry,
    }
})
export default class XSidebar extends Vue {}
</script>