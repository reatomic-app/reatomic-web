<template src="./ContextMenu.html"></template>
<style src="./ContextMenu.css" scoped></style>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class ContextMenu extends Vue {
    private showContextMenu = false;

    public toggleContextMenu() {
      this.showContextMenu = !this.showContextMenu;
    }

    @Emit("onDataSource")
    public handleDataSource() {
        this.toggleContextMenu();
        return;
    }

    @Emit("onFact")
    public handleFact() {
        this.toggleContextMenu();
        return;
    }

    @Emit("onInsight")
    public handleInsight() {
        this.toggleContextMenu();
        return;
    }

    @Emit("onConclusion")
    public handleConclusion() {
        this.toggleContextMenu();
        return;
    }
}
</script>
