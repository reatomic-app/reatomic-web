<template src="./XSidebarEntry.html"></template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode } from 'vue';

@Component
export default class XSidebarEntry extends Vue {
    private isSelected = false;
    private isOpen = false;

    @Prop(String)
    public i18n!: string;

    @Prop(String)
    public icon!: string;

    @Prop(Boolean)
    public selected!: boolean;

    @Prop(String)
    public to!: string;

    public get hasChildren(): boolean {
        const children: VNode[] | undefined = this.$slots["default"];

        return children ? true : false;
    }

    public mounted() {
        this.isSelected = this.selected;
    }

    public handleSelectedToggle() {
        this.isSelected = !this.isSelected;
        this.isOpen = this.hasChildren && !this.isOpen;

        this.$router.push({name: this.to});
    }
}
</script>