<template src="./XSidebarSwitch.html"></template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const COLLAPSE_CLASS = "sidebar-collapse";

@Component
export default class XSidebarSwitch extends Vue {

    public handleSidebarToggle() {
        const el = document.body;
    
        if (el.classList.contains(COLLAPSE_CLASS)) {
            el.classList.remove(COLLAPSE_CLASS);
        } else {
            el.classList.add(COLLAPSE_CLASS);
        }
    }
}
</script>